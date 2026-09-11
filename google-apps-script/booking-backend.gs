/**
 * VIP Yachts — Booking + Admin backend (Google Apps Script Web App)
 * =========================================================
 *
 * WHAT THIS IS
 * This is the server-side script that runs on Google's servers, behind the
 * SHEET_WEBHOOK_URL used in js/script.js. It's not deployed automatically —
 * it lives in a Google Apps Script project attached to your bookings Google
 * Sheet, and has to be pasted in and deployed by hand (one-time setup).
 *
 * It does three things, routed by an `action` field on every request:
 *   - action=logBooking   -> appends a booking as a new row (existing behavior)
 *   - action=login        -> checks the admin username/password, returns a
 *                            session token if correct
 *   - action=getBookings  -> returns all booking rows as JSON, but only if a
 *                            valid session token is sent
 *
 * The admin username/password live ONLY in this script's Script Properties —
 * never in any file that ships to the browser. That's what makes the login
 * real: nobody can read the password by viewing the site's source.
 *
 * ---------------------------------------------------------------
 * ONE-TIME SETUP
 * ---------------------------------------------------------------
 * 1. Open the Google Sheet that's currently receiving your bookings.
 * 2. Extensions -> Apps Script. This opens the existing project behind
 *    SHEET_WEBHOOK_URL.
 * 3. Select all the existing code and replace it with this entire file.
 * 4. Set your admin login: in the Apps Script editor, click the gear icon
 *    (Project Settings) on the left, scroll to "Script Properties", and
 *    add two properties:
 *       ADMIN_USERNAME   = whatever you want to log in with
 *       ADMIN_PASSWORD   = a strong password (pick something not used
 *                          anywhere else — this is the only thing standing
 *                          between the public and your bookings data)
 * 5. Deploy -> Manage deployments -> click the pencil/edit icon on the
 *    existing deployment -> Version: "New version" -> Deploy.
 *    (Using "New version" on the EXISTING deployment keeps the same URL,
 *    so js/script.js doesn't need to change. Do NOT create a brand new
 *    deployment — that would generate a different URL.)
 * 6. You're done — no front-end changes needed, the site already points
 *    at this URL.
 *
 * NOTE: while you're in Manage deployments, confirm "Who has access" is
 * still set to "Anyone" (not restricted to your organization or to
 * specific people). The admin login and dashboard both need to read the
 * response directly, which only works if the deployment is publicly
 * reachable this way — the real security is the password check inside
 * this script, not the deployment's access setting.
 *
 * SHEET LAYOUT
 * This script treats row 1 of the active sheet as headers and matches
 * fields by header name (not by fixed column position), so it won't break
 * if you've already got columns in a particular order. Any booking field
 * that doesn't have a matching header yet gets its own new column
 * automatically the first time it's logged.
 * =========================================================
 */

// Matches the SHARED_TOKEN constant referenced in js/script.js — a light
// deterrent against random bots spamming the sheet via a leaked/guessed
// URL. This is separate from the real admin login below; it does not
// grant access to read anything, only to add a booking row.
var LOG_BOOKING_TOKEN = 'vy-booking-2026';

// How long an admin login stays valid before requiring a fresh login.
var SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Basic brute-force throttle: after this many wrong passwords in a row,
// logins are blocked for LOCKOUT_DURATION_MS. Apps Script can't reliably
// see the caller's IP, so this is a simple global throttle rather than
// a per-IP one — enough to stop casual password guessing, not a
// determined attacker. Use a strong, unique password regardless.
var MAX_FAILED_ATTEMPTS = 5;
var LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function doGet(e) {
  return jsonResponse({ ok: true, message: 'VIP Yachts booking backend is running.' });
}

function doPost(e) {
  var action = (e.parameter.action || 'logBooking').toString();
  try {
    if (action === 'logBooking') return handleLogBooking(e);
    if (action === 'login') return handleLogin(e);
    if (action === 'getBookings') return handleGetBookings(e);
    return jsonResponse({ ok: false, error: 'unknown_action' });
  } catch (err) {
    return jsonResponse({ ok: false, error: 'server_error', message: String(err) });
  }
}

/* =========================================================
   BOOKING LOGGING (existing behavior, kept working as-is)
   ========================================================= */
function handleLogBooking(e) {
  if (e.parameter.token !== LOG_BOOKING_TOKEN) {
    return jsonResponse({ ok: false, error: 'invalid_token' });
  }

  var sheet = getSheet();
  var headers = getHeaders(sheet);

  // Always record when the booking came in, and log every field the
  // client sent except our internal routing/auth fields.
  var fields = Object.assign({}, e.parameter);
  delete fields.action;
  delete fields.token;
  fields.timestamp = new Date().toISOString();

  var row = headers.map(function (h) { return fields[h] !== undefined ? fields[h] : ''; });

  // Any field the client sent that doesn't have a column yet gets one,
  // appended to the right, so new booking fields never silently get lost.
  var newKeys = Object.keys(fields).filter(function (k) { return headers.indexOf(k) === -1; });
  newKeys.forEach(function (k) {
    sheet.getRange(1, sheet.getLastColumn() + 1).setValue(k);
    row.push(fields[k]);
  });

  sheet.appendRow(row);
  return jsonResponse({ ok: true });
}

/* =========================================================
   ADMIN LOGIN
   ========================================================= */
function handleLogin(e) {
  var props = PropertiesService.getScriptProperties();

  var lockoutUntil = Number(props.getProperty('LOCKOUT_UNTIL') || 0);
  if (Date.now() < lockoutUntil) {
    return jsonResponse({ ok: false, error: 'locked_out', retryAfterMs: lockoutUntil - Date.now() });
  }

  var adminUser = props.getProperty('ADMIN_USERNAME');
  var adminPass = props.getProperty('ADMIN_PASSWORD');
  if (!adminUser || !adminPass) {
    return jsonResponse({ ok: false, error: 'admin_not_configured' });
  }

  var username = (e.parameter.username || '').toString();
  var password = (e.parameter.password || '').toString();

  if (username !== adminUser || password !== adminPass) {
    var failedAttempts = Number(props.getProperty('FAILED_ATTEMPTS') || 0) + 1;
    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
      props.setProperty('LOCKOUT_UNTIL', String(Date.now() + LOCKOUT_DURATION_MS));
      props.setProperty('FAILED_ATTEMPTS', '0');
      return jsonResponse({ ok: false, error: 'locked_out', retryAfterMs: LOCKOUT_DURATION_MS });
    }
    props.setProperty('FAILED_ATTEMPTS', String(failedAttempts));
    return jsonResponse({ ok: false, error: 'invalid_credentials' });
  }

  props.setProperty('FAILED_ATTEMPTS', '0');

  var token = Utilities.getUuid();
  var sessions = getSessions(props);
  sessions[token] = Date.now() + SESSION_DURATION_MS;
  pruneAndSaveSessions(props, sessions);

  return jsonResponse({ ok: true, token: token, expiresAt: sessions[token] });
}

/* =========================================================
   REAL BOOKINGS DATA (requires a valid session token)
   ========================================================= */
function handleGetBookings(e) {
  var props = PropertiesService.getScriptProperties();
  var sessions = getSessions(props);
  var token = (e.parameter.token || '').toString();
  var expiry = sessions[token];

  if (!expiry || Date.now() > expiry) {
    return jsonResponse({ ok: false, error: 'invalid_session' });
  }

  var sheet = getSheet();
  var headers = getHeaders(sheet);
  var lastRow = sheet.getLastRow();
  var bookings = [];

  if (lastRow > 1) {
    var values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
    bookings = values.map(function (row) {
      var obj = {};
      headers.forEach(function (h, i) { obj[h] = row[i]; });
      return obj;
    });
    // Most recent first.
    bookings.reverse();
  }

  return jsonResponse({ ok: true, bookings: bookings });
}

/* =========================================================
   HELPERS
   ========================================================= */
function getSheet() {
  // Assumes bookings are logged to the FIRST tab of the spreadsheet. If
  // they actually live in a specific named tab instead, replace the line
  // below with: return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('YourTabName');
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

function getHeaders(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) return [];
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0].filter(function (h) { return h !== ''; });
}

function getSessions(props) {
  try {
    return JSON.parse(props.getProperty('ACTIVE_SESSIONS') || '{}');
  } catch (e) {
    return {};
  }
}

function pruneAndSaveSessions(props, sessions) {
  var now = Date.now();
  var pruned = {};
  Object.keys(sessions).forEach(function (token) {
    if (sessions[token] > now) pruned[token] = sessions[token];
  });
  props.setProperty('ACTIVE_SESSIONS', JSON.stringify(pruned));
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

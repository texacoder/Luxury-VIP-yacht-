/* =========================================================
   ADMIN DASHBOARD MODULE
   Real login + real bookings data, backed by the Apps Script Web App
   at data.SHEET_WEBHOOK_URL (see google-apps-script/booking-backend.gs
   for the server-side code and one-time setup instructions).

   The admin username/password never live in this file or anywhere else
   that ships to the browser — they're checked server-side by the Apps
   Script, which only hands back a session token on success. This file
   just stores that token (in localStorage) and sends it along with each
   request for real data.
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  var SESSION_KEY = 'vipyachts_admin_session';

  window.VIPYachtsPages.admin = function () {
    var data = window.VIPYachts;
    var qs = window.VIPYachtsUtil.qs;

    var loadingScreen = qs('#admin-loading');
    var loginScreen = qs('#admin-login-screen');
    var adminShell = qs('#admin-shell');
    var loginForm = qs('#admin-login-form');
    var usernameInput = qs('#admin-username');
    var passwordInput = qs('#admin-password');
    var loginError = qs('#admin-login-error');
    var loginSubmitBtn = qs('#admin-login-submit');
    var logoutBtn = qs('#admin-logout-btn');
    var topbarUsername = qs('#admin-topbar-username');
    var dataError = qs('#admin-data-error');

    /* ---------- Session storage ---------- */
    function getStoredSession() {
      try {
        var raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        var session = JSON.parse(raw);
        if (!session.token || !session.expiresAt || Date.now() > session.expiresAt) {
          localStorage.removeItem(SESSION_KEY);
          return null;
        }
        return session;
      } catch (e) {
        return null;
      }
    }
    function saveSession(token, expiresAt, username) {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ token: token, expiresAt: expiresAt, username: username }));
      } catch (e) { /* localStorage unavailable — session just won't persist across reloads */ }
    }
    function clearSession() {
      try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
    }

    /* ---------- Backend calls ---------- */
    // Not sent with mode:'no-cors' like the booking logger — login and
    // getBookings both need to read the response, and Apps Script Web
    // App responses are readable cross-origin by default as long as the
    // request stays a "simple" request (form-encoded body, no custom
    // headers), which is what URLSearchParams gives us here.
    function apiRequest(action, params) {
      var url = data.SHEET_WEBHOOK_URL;
      if (!url) return Promise.reject(new Error('not_configured'));
      var body = new URLSearchParams(Object.assign({ action: action }, params));
      return fetch(url, { method: 'POST', body: body }).then(function (res) {
        return res.json();
      });
    }

    /* ---------- View switching ---------- */
    function showLogin() {
      loadingScreen.hidden = true;
      loginScreen.hidden = false;
      adminShell.hidden = true;
    }
    function showDashboard() {
      loadingScreen.hidden = true;
      loginScreen.hidden = true;
      adminShell.hidden = false;
    }

    /* ---------- Login ---------- */
    function setLoginError(message) {
      if (message) {
        loginError.textContent = message;
        loginError.hidden = false;
      } else {
        loginError.textContent = '';
        loginError.hidden = true;
      }
    }

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var username = usernameInput.value.trim();
      var password = passwordInput.value;
      if (!username || !password) {
        setLoginError('Enter both a username and password.');
        return;
      }

      setLoginError('');
      loginSubmitBtn.disabled = true;
      loginSubmitBtn.textContent = 'Logging in…';

      apiRequest('login', { username: username, password: password })
        .then(function (res) {
          if (res.ok) {
            saveSession(res.token, res.expiresAt, username);
            passwordInput.value = '';
            enterDashboard(username);
            return;
          }
          if (res.error === 'invalid_credentials') {
            setLoginError('Incorrect username or password.');
          } else if (res.error === 'locked_out') {
            var mins = Math.ceil((res.retryAfterMs || 0) / 60000);
            setLoginError('Too many failed attempts. Try again in about ' + mins + ' minute' + (mins === 1 ? '' : 's') + '.');
          } else if (res.error === 'admin_not_configured') {
            setLoginError('Admin login isn’t set up on the backend yet. Add ADMIN_USERNAME and ADMIN_PASSWORD in the Apps Script’s Script Properties — see google-apps-script/booking-backend.gs.');
          } else {
            setLoginError('Something went wrong logging in. Please try again.');
          }
        })
        .catch(function () {
          setLoginError('Couldn’t reach the admin backend. Make sure the updated Apps Script from google-apps-script/booking-backend.gs has been deployed.');
        })
        .then(function () {
          loginSubmitBtn.disabled = false;
          loginSubmitBtn.textContent = 'Log In';
        });
    });

    logoutBtn.addEventListener('click', function () {
      clearSession();
      usernameInput.value = '';
      passwordInput.value = '';
      // Re-check with the backend rather than assuming a login screen is
      // needed — if admin credentials haven't been configured yet, this
      // just lands back on the open dashboard instead of a pointless
      // login form with nothing to log into.
      loadDashboard('', { hadToken: false });
    });

    /* ---------- Dashboard data ---------- */
    function setDataError(message) {
      if (message) {
        dataError.textContent = message;
        dataError.hidden = false;
      } else {
        dataError.textContent = '';
        dataError.hidden = true;
      }
    }

    function renderDashboard(bookings) {
      qs('#stat-total-yachts').textContent = data.YACHTS.length;
      qs('#stat-total-bookings').textContent = bookings.length;

      var revenue = bookings.reduce(function (sum, b) {
        var n = Number(b.total);
        return sum + (isNaN(n) ? 0 : n);
      }, 0);
      qs('#stat-revenue').textContent = data.formatAED(revenue);

      var uniqueCustomers = {};
      bookings.forEach(function (b) {
        var key = (b.email || b.phone || '').toString().trim().toLowerCase();
        if (key) uniqueCustomers[key] = true;
      });
      qs('#stat-unique-customers').textContent = Object.keys(uniqueCustomers).length;

      var body = qs('#admin-bookings-body');
      var empty = qs('#admin-bookings-empty');
      var recent = bookings.slice(0, 20); // already newest-first from the backend

      if (!recent.length) {
        body.innerHTML = '';
        empty.hidden = false;
        return;
      }
      empty.hidden = true;

      body.innerHTML = recent.map(function (b) {
        var totalNum = Number(b.total);
        var totalTxt = isNaN(totalNum) ? (b.total || '—') : data.formatAED(totalNum);
        var received = b.timestamp ? formatTimestamp(b.timestamp) : '—';
        return (
          '<tr>' +
            '<td>' + escapeHtml(b.reference || '—') + '</td>' +
            '<td>' + escapeHtml(b.name || '—') + '</td>' +
            '<td>' + escapeHtml(b.yacht || '—') + '</td>' +
            '<td>' + escapeHtml(b.package || '—') + '</td>' +
            '<td>' + escapeHtml(b.date || '—') + '</td>' +
            '<td>' + escapeHtml(totalTxt) + '</td>' +
            '<td>' + escapeHtml(received) + '</td>' +
          '</tr>'
        );
      }).join('');
    }

    function formatTimestamp(raw) {
      var d = new Date(raw);
      if (isNaN(d.getTime())) return String(raw);
      return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    }

    function escapeHtml(value) {
      return data.escapeHtml ? data.escapeHtml(value) : String(value);
    }

    // Whether a login screen is needed at all is decided by the backend,
    // not this file — action=getBookings only replies with invalid_session
    // once ADMIN_USERNAME/ADMIN_PASSWORD have actually been set in the
    // Apps Script's Script Properties. Until then, every visitor lands
    // straight on the dashboard; the moment those properties are set, the
    // very next load (or this call, on an expired/missing token) starts
    // getting invalid_session back and the login screen takes over
    // automatically — no front-end change needed when that switch flips.
    function loadDashboard(token, opts) {
      opts = opts || {};
      setDataError('');
      apiRequest('getBookings', { token: token || '' })
        .then(function (res) {
          if (res.ok) {
            showDashboard();
            renderDashboard(res.bookings || []);
            return;
          }
          if (res.error === 'invalid_session') {
            clearSession();
            showLogin();
            // Only frame it as an "expired session" if we actually had a
            // token that got rejected — someone landing here for the
            // first time after admin login just got turned on shouldn't
            // see a confusing "expired" message for a session that never
            // existed.
            setLoginError(opts.hadToken ? 'Your session expired — please log in again.' : '');
            return;
          }
          // Some other backend error, unrelated to auth — show the
          // dashboard shell rather than blocking access behind it.
          showDashboard();
          setDataError('Couldn’t load live bookings data. Showing what’s available.');
          renderDashboard([]);
        })
        .catch(function () {
          showDashboard();
          setDataError('Couldn’t reach the admin backend. Make sure the updated Apps Script from google-apps-script/booking-backend.gs has been deployed.');
          renderDashboard([]);
        });
    }

    /* ---------- Entry ---------- */
    function enterDashboard(username) {
      topbarUsername.textContent = username || 'Admin';
      var session = getStoredSession();
      loadDashboard(session ? session.token : '', { hadToken: true });
    }

    var existingSession = getStoredSession();
    if (existingSession) topbarUsername.textContent = existingSession.username || 'Admin';
    loadDashboard(existingSession ? existingSession.token : '', { hadToken: !!existingSession });
  };
})();

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

   Sections (Dashboard / Yachts / Bookings / Customers / Reports) are all
   rendered client-side from two real data sources: the live YACHTS array
   (same one the public site uses) and the bookings fetched once from the
   backend — no extra network calls per section, no per-section backend
   endpoints needed.
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  var SESSION_KEY = 'vipyachts_admin_session';
  var SECTION_TITLES = { dashboard: 'Dashboard', yachts: 'Fleet', bookings: 'All Bookings', customers: 'Customers', reports: 'Reports' };

  window.VIPYachtsPages.admin = function () {
    var data = window.VIPYachts;
    var qs = window.VIPYachtsUtil.qs;
    var qsa = window.VIPYachtsUtil.qsa;

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
    var sectionTitle = qs('#admin-section-title');
    var dataError = qs('#admin-data-error');

    var allBookings = []; // populated once per successful load, reused by every section

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
    // Google Apps Script Web Apps can be genuinely slow to respond — a few
    // seconds is normal, especially the first request after the script has
    // been idle a while ("cold start"). REQUEST_TIMEOUT_MS is a ceiling so a
    // request that's truly stuck (not just slow) fails with a clear message
    // instead of leaving a button stuck on "Logging in..." forever.
    var REQUEST_TIMEOUT_MS = 25000;

    // Not sent with mode:'no-cors' like the booking logger — login and
    // getBookings both need to read the response, and Apps Script Web
    // App responses are readable cross-origin by default as long as the
    // request stays a "simple" request (form-encoded body, no custom
    // headers), which is what URLSearchParams gives us here.
    function apiRequest(action, params) {
      var url = data.SHEET_WEBHOOK_URL;
      if (!url) return Promise.reject(new Error('not_configured'));
      var body = new URLSearchParams(Object.assign({ action: action }, params));

      var controller = ('AbortController' in window) ? new AbortController() : null;
      var timeoutId = controller ? setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT_MS) : null;

      return fetch(url, { method: 'POST', body: body, signal: controller ? controller.signal : undefined })
        .then(function (res) {
          if (timeoutId) clearTimeout(timeoutId);
          return res.json();
        })
        .catch(function (err) {
          if (timeoutId) clearTimeout(timeoutId);
          if (err && err.name === 'AbortError') {
            var timeoutErr = new Error('timeout');
            timeoutErr.isTimeout = true;
            throw timeoutErr;
          }
          throw err;
        });
    }

    /* ---------- View switching (login <-> dashboard shell) ---------- */
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

    /* ---------- Section switching (Dashboard/Yachts/Bookings/Customers/Reports) ---------- */
    function switchSection(name) {
      if (!SECTION_TITLES[name]) name = 'dashboard';
      qsa('.admin-section').forEach(function (el) {
        el.hidden = (el.id !== 'admin-section-' + name);
      });
      qsa('.admin-nav-link', qs('#admin-nav')).forEach(function (btn) {
        btn.classList.toggle('is-active', btn.dataset.section === name);
      });
      sectionTitle.textContent = SECTION_TITLES[name];
      if (name === 'yachts') renderYachts();
      if (name === 'bookings') renderAllBookings();
      if (name === 'customers') renderCustomers();
      if (name === 'reports') renderReports();
    }

    qsa('.admin-nav-link', qs('#admin-nav')).forEach(function (btn) {
      btn.addEventListener('click', function () { switchSection(btn.dataset.section); });
    });
    qsa('[data-goto-section]').forEach(function (btn) {
      btn.addEventListener('click', function () { switchSection(btn.dataset.gotoSection); });
    });

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
      // Apps Script can genuinely take several seconds, especially right
      // after being idle — reassure rather than leave the button looking
      // frozen with no explanation.
      var slowNoticeTimer = setTimeout(function () {
        loginSubmitBtn.textContent = 'Still logging in… (this can take a few seconds)';
      }, 4000);

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
        .catch(function (err) {
          if (err && err.isTimeout) {
            setLoginError('The backend didn’t respond in time (' + Math.round(REQUEST_TIMEOUT_MS / 1000) + 's). It may just be slow to wake up — please try again.');
          } else {
            setLoginError('Couldn’t reach the admin backend. Make sure the updated Apps Script from google-apps-script/booking-backend.gs has been deployed.');
          }
        })
        .then(function () {
          clearTimeout(slowNoticeTimer);
          loginSubmitBtn.disabled = false;
          loginSubmitBtn.textContent = 'Log In';
        });
    });

    logoutBtn.addEventListener('click', function () {
      clearSession();
      usernameInput.value = '';
      passwordInput.value = '';
      // Show the login screen immediately rather than re-asking the
      // backend whether one is needed — if a login was never actually
      // required yet (no ADMIN_USERNAME/PASSWORD configured), re-checking
      // just reopens the dashboard straight away, so clicking "Log Out"
      // visibly did nothing. Logging out should always visibly log out.
      showLogin();
      setLoginError('');
    });

    /* ---------- Shared helpers ---------- */
    function setDataError(message) {
      if (message) {
        dataError.textContent = message;
        dataError.hidden = false;
      } else {
        dataError.textContent = '';
        dataError.hidden = true;
      }
    }
    function formatTimestamp(raw) {
      var d = new Date(raw);
      if (isNaN(d.getTime())) return String(raw);
      return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    }
    function escapeHtml(value) {
      return data.escapeHtml ? data.escapeHtml(value) : String(value);
    }
    function bookingTotalNumber(b) {
      var n = Number(b.total);
      return isNaN(n) ? 0 : n;
    }

    /* ============================================================
       DASHBOARD
       ============================================================ */
    function renderDashboard(bookings) {
      qs('#stat-total-yachts').textContent = data.YACHTS.length;
      qs('#stat-total-bookings').textContent = bookings.length;

      var revenue = bookings.reduce(function (sum, b) { return sum + bookingTotalNumber(b); }, 0);
      qs('#stat-revenue').textContent = data.formatAED(revenue);

      qs('#stat-unique-customers').textContent = Object.keys(customerKeyMap(bookings)).length;

      var body = qs('#admin-bookings-body');
      var empty = qs('#admin-bookings-empty');
      var recent = bookings.slice(0, 8); // dashboard is a preview; full list lives in the Bookings section

      if (!recent.length) {
        body.innerHTML = '';
        empty.hidden = false;
        return;
      }
      empty.hidden = true;
      body.innerHTML = recent.map(bookingRowHtml).join('');
    }

    function bookingRowHtml(b, includePhone) {
      var totalNum = Number(b.total);
      var totalTxt = isNaN(totalNum) ? (b.total || '—') : data.formatAED(totalNum);
      var received = b.timestamp ? formatTimestamp(b.timestamp) : '—';
      return (
        '<tr>' +
          '<td>' + escapeHtml(b.reference || '—') + '</td>' +
          '<td>' + escapeHtml(b.name || '—') + '</td>' +
          (includePhone ? '<td>' + escapeHtml(b.phone || '—') + '</td>' : '') +
          '<td>' + escapeHtml(b.yacht || '—') + '</td>' +
          '<td>' + escapeHtml(b.package || '—') + '</td>' +
          '<td>' + escapeHtml(b.date || '—') + '</td>' +
          '<td>' + escapeHtml(totalTxt) + '</td>' +
          '<td>' + escapeHtml(received) + '</td>' +
        '</tr>'
      );
    }

    function customerKeyMap(bookings) {
      var map = {};
      bookings.forEach(function (b) {
        var key = (b.email || b.phone || '').toString().trim().toLowerCase();
        if (key) map[key] = true;
      });
      return map;
    }

    /* ============================================================
       YACHTS — from the live YACHTS array, no network call
       ============================================================ */
    var yachtState = { tier: 'all', search: '' };

    function renderYachts() {
      var base = data.BASE;
      var filtered = data.YACHTS.filter(function (y) {
        var tierMatch = yachtState.tier === 'all' || y.tier === yachtState.tier;
        var searchMatch = !yachtState.search || y.name.toLowerCase().indexOf(yachtState.search) !== -1;
        return tierMatch && searchMatch;
      });

      qs('#admin-yacht-count').textContent = filtered.length + (filtered.length === 1 ? ' yacht' : ' yachts');

      qs('#admin-yacht-grid').innerHTML = filtered.map(function (y) {
        // Reuses the same fallback logic the public fleet page uses — a
        // missing image path shows "Images will be uploaded soon", and a
        // path that 404s (a suggested-but-not-yet-added filename) falls
        // back to the yacht's name — rather than a blank broken-image box.
        var media = data.yachtCardMediaHtml(y);
        return (
          '<article class="admin-yacht-card">' +
            '<div class="admin-yacht-card-media">' +
              media +
              '<span class="badge badge-gold admin-yacht-card-tier">' + escapeHtml(y.tierLabel) + '</span>' +
            '</div>' +
            '<div class="admin-yacht-card-body">' +
              '<h3>' + escapeHtml(y.name) + '</h3>' +
              '<span class="admin-yacht-card-meta">' + data.formatSpec(y.guests, ' guests') + ' · ' + data.formatSpec(y.cabins, ' cabins') + ' · ' + data.formatSpec(y.length, ' ft') + '</span>' +
              '<span class="admin-yacht-card-price">' + data.formatYachtPrice(y.pricePerDay) + '</span>' +
              '<a class="admin-yacht-card-link" href="' + base + 'pages/yacht-detail.html?id=' + y.id + '" target="_blank" rel="noopener">View on site →</a>' +
            '</div>' +
          '</article>'
        );
      }).join('');
    }

    qsa('.filter-chip', qs('#admin-yacht-tier-filter')).forEach(function (chip) {
      chip.addEventListener('click', function () {
        qsa('.filter-chip', qs('#admin-yacht-tier-filter')).forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        yachtState.tier = chip.dataset.tier;
        renderYachts();
      });
    });
    qs('#admin-yacht-search').addEventListener('input', function (e) {
      yachtState.search = e.target.value.trim().toLowerCase();
      renderYachts();
    });

    /* ============================================================
       ALL BOOKINGS
       ============================================================ */
    var bookingsSearch = '';

    function renderAllBookings() {
      var filtered = !bookingsSearch ? allBookings : allBookings.filter(function (b) {
        var haystack = [b.reference, b.name, b.yacht, b.email, b.phone].join(' ').toLowerCase();
        return haystack.indexOf(bookingsSearch) !== -1;
      });

      qs('#admin-all-bookings-count').textContent = filtered.length + (filtered.length === 1 ? ' booking' : ' bookings') + (bookingsSearch ? ' matching “' + bookingsSearch + '”' : '');

      var body = qs('#admin-all-bookings-body');
      var empty = qs('#admin-all-bookings-empty');
      if (!filtered.length) {
        body.innerHTML = '';
        empty.hidden = false;
        empty.textContent = allBookings.length ? 'No bookings match your search.' : 'No bookings logged yet.';
        return;
      }
      empty.hidden = true;
      body.innerHTML = filtered.map(function (b) { return bookingRowHtml(b, true); }).join('');
    }

    qs('#admin-bookings-search').addEventListener('input', function (e) {
      bookingsSearch = e.target.value.trim().toLowerCase();
      renderAllBookings();
    });

    /* ============================================================
       CUSTOMERS — derived from real booking records
       ============================================================ */
    var customersSearch = '';

    function buildCustomerList() {
      var map = {};
      allBookings.forEach(function (b) {
        var key = (b.email || b.phone || '').toString().trim().toLowerCase();
        if (!key) return;
        if (!map[key]) {
          map[key] = { name: b.name || '—', email: b.email || '', phone: b.phone || '', count: 0, spend: 0, lastDate: null, lastTimestamp: 0 };
        }
        var c = map[key];
        c.count += 1;
        c.spend += bookingTotalNumber(b);
        // Prefer the most-recently-named version in case a customer's name was typed differently across bookings.
        if (b.name) c.name = b.name;
        var ts = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        if (ts >= c.lastTimestamp) { c.lastTimestamp = ts; c.lastDate = b.date || formatTimestamp(b.timestamp); }
      });
      return Object.keys(map).map(function (k) { return map[k]; });
    }

    function renderCustomers() {
      var customers = buildCustomerList().sort(function (a, b) { return b.spend - a.spend; });
      var filtered = !customersSearch ? customers : customers.filter(function (c) {
        return (c.name + ' ' + c.email + ' ' + c.phone).toLowerCase().indexOf(customersSearch) !== -1;
      });

      qs('#admin-customers-count').textContent = filtered.length + (filtered.length === 1 ? ' customer' : ' customers');

      var body = qs('#admin-customers-body');
      var empty = qs('#admin-customers-empty');
      if (!filtered.length) {
        body.innerHTML = '';
        empty.hidden = false;
        empty.textContent = customers.length ? 'No customers match your search.' : 'No customers yet.';
        return;
      }
      empty.hidden = true;
      body.innerHTML = filtered.map(function (c) {
        return (
          '<tr>' +
            '<td>' + escapeHtml(c.name) + '</td>' +
            '<td>' + escapeHtml(c.email || '—') + '</td>' +
            '<td>' + escapeHtml(c.phone || '—') + '</td>' +
            '<td>' + c.count + '</td>' +
            '<td>' + escapeHtml(data.formatAED(c.spend)) + '</td>' +
            '<td>' + escapeHtml(c.lastDate || '—') + '</td>' +
          '</tr>'
        );
      }).join('');
    }

    qs('#admin-customers-search').addEventListener('input', function (e) {
      customersSearch = e.target.value.trim().toLowerCase();
      renderCustomers();
    });

    /* ============================================================
       REPORTS — aggregates over the same real booking records
       ============================================================ */
    function renderBarGroup(containerId, emptyId, entries, formatValue) {
      var container = qs('#' + containerId);
      var empty = qs('#' + emptyId);
      if (!entries.length) {
        container.innerHTML = '';
        empty.hidden = false;
        return;
      }
      empty.hidden = true;
      var max = Math.max.apply(null, entries.map(function (e) { return e.value; }));
      container.innerHTML = entries.map(function (e) {
        var pct = max > 0 ? Math.round((e.value / max) * 100) : 0;
        return (
          '<div class="admin-report-bar-row">' +
            '<span class="admin-report-bar-label" title="' + escapeHtml(e.label) + '">' + escapeHtml(e.label) + '</span>' +
            '<span class="admin-report-bar-track"><span class="admin-report-bar-fill" style="width:' + pct + '%"></span></span>' +
            '<span class="admin-report-bar-value">' + escapeHtml(formatValue(e)) + '</span>' +
          '</div>'
        );
      }).join('');
    }

    function groupSum(bookings, keyFn) {
      var map = {};
      bookings.forEach(function (b) {
        var key = keyFn(b);
        if (!key) return;
        if (!map[key]) map[key] = { count: 0, revenue: 0 };
        map[key].count += 1;
        map[key].revenue += bookingTotalNumber(b);
      });
      return map;
    }

    function renderReports() {
      // Revenue by month (grouped by charter date, not the date the booking was logged).
      var byMonth = {};
      allBookings.forEach(function (b) {
        if (!b.date) return;
        var d = new Date(b.date);
        if (isNaN(d.getTime())) return;
        var key = d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
        byMonth[key] = (byMonth[key] || 0) + bookingTotalNumber(b);
      });
      var monthEntries = Object.keys(byMonth)
        .map(function (k) { return { label: k, value: byMonth[k], sortKey: new Date(k).getTime() }; })
        .sort(function (a, b) { return a.sortKey - b.sortKey; });
      renderBarGroup('report-revenue-by-month', 'report-revenue-empty', monthEntries, function (e) { return data.formatAED(e.value); });

      // Bookings by yacht.
      var byYacht = groupSum(allBookings, function (b) { return b.yacht; });
      var yachtEntries = Object.keys(byYacht)
        .map(function (k) { return { label: k, value: byYacht[k].count, revenue: byYacht[k].revenue }; })
        .sort(function (a, b) { return b.value - a.value; });
      renderBarGroup('report-by-yacht', 'report-yacht-empty', yachtEntries, function (e) { return e.value + (e.value === 1 ? ' booking' : ' bookings'); });

      // Bookings by package.
      var byPackage = groupSum(allBookings, function (b) { return b.package; });
      var packageEntries = Object.keys(byPackage)
        .map(function (k) { return { label: k, value: byPackage[k].count, revenue: byPackage[k].revenue }; })
        .sort(function (a, b) { return b.value - a.value; });
      renderBarGroup('report-by-package', 'report-package-empty', packageEntries, function (e) { return e.value + (e.value === 1 ? ' booking' : ' bookings'); });

      // Top customers by spend.
      var customers = buildCustomerList().sort(function (a, b) { return b.spend - a.spend; }).slice(0, 5);
      var topBody = qs('#report-top-customers-body');
      var topEmpty = qs('#report-customers-empty');
      if (!customers.length) {
        topBody.innerHTML = '';
        topEmpty.hidden = false;
      } else {
        topEmpty.hidden = true;
        topBody.innerHTML = customers.map(function (c) {
          return '<tr><td>' + escapeHtml(c.name) + '</td><td>' + c.count + '</td><td>' + escapeHtml(data.formatAED(c.spend)) + '</td></tr>';
        }).join('');
      }
    }

    /* ============================================================
       LOAD — fetch bookings once, then render whichever section is active
       ============================================================ */
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
            allBookings = res.bookings || [];
            showDashboard();
            renderDashboard(allBookings);
            // Re-render whichever section is currently active so switching
            // tabs before this first load finished still shows real data.
            var activeBtn = qs('.admin-nav-link.is-active', qs('#admin-nav'));
            if (activeBtn && activeBtn.dataset.section !== 'dashboard') switchSection(activeBtn.dataset.section);
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
        .catch(function (err) {
          showDashboard();
          if (err && err.isTimeout) {
            setDataError('The backend didn’t respond in time (' + Math.round(REQUEST_TIMEOUT_MS / 1000) + 's). It may just be slow to wake up — try reloading in a moment.');
          } else {
            setDataError('Couldn’t reach the admin backend. Make sure the updated Apps Script from google-apps-script/booking-backend.gs has been deployed.');
          }
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

    // Reassure on a slow first load too — same reasoning as the login
    // button notice above. Checks loadingScreen.hidden rather than
    // clearing itself, since by the time this fires the page may have
    // already moved on to the login screen or dashboard.
    setTimeout(function () {
      if (!loadingScreen.hidden) {
        var loadingText = loadingScreen.querySelector('span');
        if (loadingText) loadingText.textContent = 'Still loading… the backend can be slow to wake up.';
      }
    }, 4000);

    loadDashboard(existingSession ? existingSession.token : '', { hadToken: !!existingSession });
  };
})();

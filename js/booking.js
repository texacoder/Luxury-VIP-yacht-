/* =========================================================
   BOOKING FLOW MODULE
   4 steps: Yacht -> Customize -> Payment -> Confirmation.
   State persists to sessionStorage under 'vipyachts_booking'
   so it survives navigation between pages/reloads within tab.
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  var STORAGE_KEY = 'vipyachts_booking';

  window.VIPYachtsPages.booking = function () {
    var data = window.VIPYachts;
    var util = window.VIPYachtsUtil;
    var qs = util.qs;
    var qsa = util.qsa;

    /* ---------- State ---------- */
    var state = loadState();

    function loadState() {
      try {
        var raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) { /* corrupted state — fall through to default */ }
      return {
        step: 1,
        yachtId: null,
        packageId: null,
        addonIds: [],
        details: { name: '', email: '', phone: '', date: '', time: '', guests: '', special: '' },
        reference: null,
        loggedToSheet: false
      };
    }
    function saveState() {
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
    }

    /* ---------- URL param pre-fill (from fleet cards / yacht-detail / packages / experiences) ---------- */
    var params = new URLSearchParams(window.location.search);
    var urlYacht = params.get('yacht');
    var urlPackage = params.get('package');
    var urlAddon = params.get('addon');
    if (urlYacht && data.getYachtById(urlYacht)) { state.yachtId = urlYacht; }
    if (urlPackage && data.getPackageById(urlPackage)) { state.packageId = urlPackage; }
    if (urlAddon && state.addonIds.indexOf(urlAddon) === -1) {
      var addonExists = data.ADDONS.some(function (a) { return a.id === urlAddon; });
      if (addonExists) state.addonIds.push(urlAddon);
    }
    if (urlYacht || urlPackage || urlAddon) saveState();

    // Guard against inconsistent/stale state: if a later step is stored but the
    // prerequisite selections are missing, fall back to the earliest valid step
    // rather than rendering a broken/empty payment or confirmation screen.
    if (state.step >= 2 && !state.yachtId) { state.step = 1; }
    if (state.step >= 3 && !state.packageId) { state.step = 2; }
    if (state.step >= 4 && !state.reference) { state.step = 3; }
    saveState();

    var progressSteps = qsa('.progress-step', qs('#booking-progress'));
    var stepPanels = {
      1: qs('#step-1'), 2: qs('#step-2'), 3: qs('#step-3'), 4: qs('#step-4')
    };

    /* ---------- Step navigation ---------- */
    function goToStep(n) {
      state.step = n;
      saveState();
      renderStep();
    }

    function renderStep() {
      Object.keys(stepPanels).forEach(function (key) {
        stepPanels[key].hidden = Number(key) !== state.step;
      });
      progressSteps.forEach(function (li) {
        var stepNum = Number(li.dataset.step);
        li.classList.toggle('is-active', stepNum === state.step);
        li.classList.toggle('is-complete', stepNum < state.step);
      });

      if (state.step === 1) renderStep1();
      if (state.step === 2) renderStep2();
      if (state.step === 3) renderStep3();
      if (state.step === 4) renderStep4();
    }

    /* ============================================================
       STEP 1 — YACHT SELECTION
       ============================================================ */
    var yachtGrid = qs('#booking-yacht-grid');
    var tierChips = qsa('.booking-tier-filter .filter-chip');
    var step1Next = qs('#step1-next');
    var step1Tier = 'all';

    function renderStep1() {
      var filtered = step1Tier === 'all' ? data.YACHTS : data.YACHTS.filter(function (y) { return y.tier === step1Tier; });
      yachtGrid.innerHTML = filtered.map(function (yacht) {
        var selected = state.yachtId === yacht.id;
        return (
          '<button class="booking-yacht-card' + (selected ? ' is-selected' : '') + '" data-yacht-id="' + yacht.id + '" aria-pressed="' + selected + '">' +
            '<div class="booking-yacht-media">' +
              data.yachtCardMediaHtml(yacht) +
            '</div>' +
            '<div class="booking-yacht-body">' +
              '<span class="badge badge-gold">' + yacht.tierLabel + '</span>' +
              '<h3>' + yacht.name + '</h3>' +
              '<p>' + data.formatSpec(yacht.guests, ' Guests') + ' · ' + data.formatSpec(yacht.cabins, ' Cabins') + '</p>' +
              '<span class="booking-yacht-price">' + data.formatYachtPrice(yacht.pricePerDay) + '</span>' +
            '</div>' +
          '</button>'
        );
      }).join('');

      qsa('.booking-yacht-card', yachtGrid).forEach(function (card) {
        card.addEventListener('click', function () {
          state.yachtId = card.dataset.yachtId;
          saveState();
          renderStep1();
        });
      });

      step1Next.disabled = !state.yachtId;
    }

    tierChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        tierChips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        step1Tier = chip.dataset.tier;
        renderStep1();
      });
    });

    step1Next.addEventListener('click', function () {
      if (!state.yachtId) return;
      goToStep(2);
    });

    /* ============================================================
       STEP 2 — CUSTOMIZE (package, add-ons, details, live summary)
       ============================================================ */
    var pkgGrid = qs('#booking-package-grid');
    var addonList = qs('#booking-addon-list');
    var detailsForm = qs('#booking-details-form');

    function renderStep2() {
      // Package options
      pkgGrid.innerHTML = data.PACKAGES.map(function (pkg) {
        var selected = state.packageId === pkg.id;
        var popular = pkg.popular ? '<span class="badge badge-gold package-popular-badge">Most Popular</span>' : '';
        return (
          '<button class="booking-package-card' + (selected ? ' is-selected' : '') + '" data-package-id="' + pkg.id + '">' +
            popular +
            '<h3>' + pkg.name + '</h3>' +
            '<span class="package-hours">' + pkg.hours + ' Hours</span>' +
            '<span class="package-price">' + data.formatAED(pkg.price) + '</span>' +
          '</button>'
        );
      }).join('');
      qsa('.booking-package-card', pkgGrid).forEach(function (card) {
        card.addEventListener('click', function () {
          state.packageId = card.dataset.packageId;
          saveState();
          renderStep2();
        });
      });

      // Add-ons
      addonList.innerHTML = data.ADDONS.map(function (addon) {
        var checked = state.addonIds.indexOf(addon.id) !== -1;
        return (
          '<li class="addon-select-item">' +
            '<label>' +
              '<input type="checkbox" data-addon-id="' + addon.id + '"' + (checked ? ' checked' : '') + '>' +
              '<span class="addon-select-name">' + addon.name + '</span>' +
              '<span class="addon-select-price">' + data.formatAED(addon.price) + '</span>' +
            '</label>' +
          '</li>'
        );
      }).join('');
      qsa('[data-addon-id]', addonList).forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
          var id = checkbox.dataset.addonId;
          if (checkbox.checked) {
            if (state.addonIds.indexOf(id) === -1) state.addonIds.push(id);
          } else {
            state.addonIds = state.addonIds.filter(function (a) { return a !== id; });
          }
          saveState();
          renderOrderSummary();
        });
      });

      // Details form — restore saved values
      qs('#booking-name').value = state.details.name || '';
      qs('#booking-email').value = state.details.email || '';
      qs('#booking-phone').value = state.details.phone || '';
      qs('#booking-date').value = state.details.date || '';
      qs('#booking-time').value = state.details.time || '';
      qs('#booking-guests').value = state.details.guests || '';
      qs('#booking-special').value = state.details.special || '';

      renderOrderSummary();
    }

    // Persist form fields live as the user types
    ['name', 'email', 'phone', 'date', 'time', 'guests', 'special'].forEach(function (field) {
      var el = qs('#booking-' + field);
      if (!el) return;
      el.addEventListener('input', function () {
        state.details[field] = el.value;
        saveState();
      });
    });

    function calcTotal() {
      var pkg = state.packageId ? data.getPackageById(state.packageId) : null;
      var addonTotal = state.addonIds.reduce(function (sum, id) {
        var addon = data.ADDONS.filter(function (a) { return a.id === id; })[0];
        return sum + (addon ? addon.price : 0);
      }, 0);
      var pkgPrice = pkg ? pkg.price : 0;
      return { pkgPrice: pkgPrice, addonTotal: addonTotal, total: pkgPrice + addonTotal, pkg: pkg };
    }

    function renderOrderSummary() {
      var yacht = state.yachtId ? data.getYachtById(state.yachtId) : null;
      var calc = calcTotal();
      var summaryEmpty = qs('#order-summary-empty');
      var summaryContent = qs('#order-summary-content');
      var lines = qs('#order-summary-lines');
      var totalEl = qs('#order-summary-total');

      if (!yacht && !calc.pkg) {
        summaryEmpty.hidden = false;
        summaryContent.hidden = true;
        return;
      }
      summaryEmpty.hidden = true;
      summaryContent.hidden = false;

      var linesHtml = '';
      if (yacht) linesHtml += '<div><dt>' + yacht.name + '</dt><dd>—</dd></div>';
      if (calc.pkg) linesHtml += '<div><dt>' + calc.pkg.name + ' (' + calc.pkg.hours + 'h)</dt><dd>' + data.formatAED(calc.pkgPrice) + '</dd></div>';
      state.addonIds.forEach(function (id) {
        var addon = data.ADDONS.filter(function (a) { return a.id === id; })[0];
        if (addon) linesHtml += '<div><dt>' + addon.name + '</dt><dd>' + data.formatAED(addon.price) + '</dd></div>';
      });
      lines.innerHTML = linesHtml;
      totalEl.textContent = data.formatAED(calc.total);
    }

    function validateStep2() {
      var valid = true;
      function setErr(field, msg) {
        var errEl = qs('#error-booking-' + field);
        var input = qs('#booking-' + field);
        if (msg) { errEl.textContent = msg; input.setAttribute('aria-invalid', 'true'); valid = false; }
        else { errEl.textContent = ''; input.removeAttribute('aria-invalid'); }
      }

      if (!state.packageId) valid = false;

      var name = qs('#booking-name').value.trim();
      var email = qs('#booking-email').value.trim();
      var phone = qs('#booking-phone').value.trim();
      var dateVal = qs('#booking-date').value;
      var timeVal = qs('#booking-time').value;
      var guests = qs('#booking-guests').value;

      setErr('name', name ? '' : 'Please enter your full name.');
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErr('email', !email ? 'Please enter your email.' : (!emailPattern.test(email) ? 'Please enter a valid email.' : ''));
      setErr('phone', phone ? '' : 'Please enter a phone number.');
      setErr('date', dateVal ? '' : 'Please choose a date.');
      setErr('time', timeVal ? '' : 'Please choose a time.');

      var yacht = state.yachtId ? data.getYachtById(state.yachtId) : null;
      if (!guests) { setErr('guests', 'Please enter your guest count.'); }
      // Some yachts don't have a confirmed capacity yet (yacht.guests is null) —
      // skip the max-guest check rather than comparing against null, which
      // JS coerces to 0 and would block every booking for that yacht.
      else if (yacht && yacht.guests != null && Number(guests) > yacht.guests) { setErr('guests', 'This yacht holds up to ' + yacht.guests + ' guests.'); }
      else { setErr('guests', ''); }

      return valid && !!state.packageId;
    }

    qs('#step2-back').addEventListener('click', function () { goToStep(1); });
    qs('#step2-next').addEventListener('click', function () {
      if (!state.packageId) {
        window.alert('Please select a package to continue.');
        return;
      }
      if (!validateStep2()) return;
      goToStep(3);
    });

    /* ============================================================
       STEP 3 — CONFIRM & WHATSAPP
       Booking and payment happen over WhatsApp, not on this site.
       This step assembles the order into a pre-filled WhatsApp
       message and hands off to one of two numbers (a fallback in
       case one is unreachable).
       ============================================================ */
    function buildWhatsAppMessage() {
      var yacht = state.yachtId ? data.getYachtById(state.yachtId) : null;
      var calc = calcTotal();
      var addonNames = state.addonIds.map(function (id) {
        var addon = data.ADDONS.filter(function (a) { return a.id === id; })[0];
        return addon ? addon.name : null;
      }).filter(Boolean);

      var lines = ['Hi VIP Yachts! I\'d like to book a charter.', ''];
      if (state.reference) lines.push('Booking Reference: ' + state.reference);
      if (yacht) lines.push('Yacht: ' + yacht.name);
      if (calc.pkg) lines.push('Package: ' + calc.pkg.name + ' (' + calc.pkg.hours + 'h)');
      if (addonNames.length) lines.push('Add-ons: ' + addonNames.join(', '));
      if (state.details.date) lines.push('Date: ' + state.details.date);
      if (state.details.time) lines.push('Time: ' + state.details.time);
      if (state.details.guests) lines.push('Guests: ' + state.details.guests);
      lines.push('');
      if (state.details.name) lines.push('Name: ' + state.details.name);
      if (state.details.phone) lines.push('Phone: ' + state.details.phone);
      if (state.details.email) lines.push('Email: ' + state.details.email);
      if (state.details.special) lines.push('Special Request: ' + state.details.special);
      lines.push('');
      lines.push('Estimated Total: ' + data.formatAED(calc.total));

      return lines.join('\n');
    }

    function renderStep3() {
      // Generate the reference as soon as the customer reaches this step
      // (not on click) so it's actually included in the WhatsApp message
      // they send, not just shown after the fact on the confirmation step.
      if (!state.reference) {
        state.reference = data.generateBookingReference();
        saveState();
      }

      var calc = calcTotal();
      var yacht = state.yachtId ? data.getYachtById(state.yachtId) : null;
      var pkg = calc.pkg;

      // Log once per booking, not on every re-render (e.g. clicking back
      // then forward again shouldn't create duplicate sheet rows).
      if (!state.loggedToSheet) {
        var addonNamesForLog = state.addonIds.map(function (id) {
          var addon = data.ADDONS.filter(function (a) { return a.id === id; })[0];
          return addon ? addon.name : null;
        }).filter(Boolean);
        data.logBookingToSheet({
          reference: state.reference,
          yacht: yacht ? yacht.name : '',
          package: pkg ? pkg.name : '',
          addons: addonNamesForLog.join(', '),
          date: state.details.date,
          time: state.details.time,
          guests: state.details.guests,
          name: state.details.name,
          phone: state.details.phone,
          email: state.details.email,
          special: state.details.special,
          total: calc.total
        });
        state.loggedToSheet = true;
        saveState();
      }

      var linesHtml = '';
      if (yacht && pkg) linesHtml += '<div><dt>' + yacht.name + ' — ' + pkg.name + '</dt><dd>' + data.formatAED(calc.pkgPrice) + '</dd></div>';
      if (calc.addonTotal > 0) linesHtml += '<div><dt>Add-ons</dt><dd>' + data.formatAED(calc.addonTotal) + '</dd></div>';
      qs('#payment-summary-lines').innerHTML = linesHtml;
      qs('#payment-summary-total').textContent = data.formatAED(calc.total);

      var detailsHtml = '';
      if (state.details.name) detailsHtml += '<div><dt>Name</dt><dd>' + state.details.name + '</dd></div>';
      if (state.details.phone) detailsHtml += '<div><dt>Phone</dt><dd>' + state.details.phone + '</dd></div>';
      if (state.details.date) detailsHtml += '<div><dt>Date</dt><dd>' + state.details.date + '</dd></div>';
      if (state.details.time) detailsHtml += '<div><dt>Time</dt><dd>' + state.details.time + '</dd></div>';
      if (state.details.guests) detailsHtml += '<div><dt>Guests</dt><dd>' + state.details.guests + '</dd></div>';
      qs('#whatsapp-your-details').innerHTML = detailsHtml;

      var message = buildWhatsAppMessage();
      var numbers = data.WHATSAPP_NUMBERS;
      qs('#whatsapp-btn-primary').href = data.whatsappLink(numbers[0].digits, message);
      qs('#whatsapp-btn-secondary').href = data.whatsappLink(numbers[1].digits, message);
    }

    qs('#step3-back').addEventListener('click', function () { goToStep(2); });

    function handleWhatsAppContinue() {
      // Reference is already generated in renderStep3, before this element's
      // href was built, so it's guaranteed to be in the message being sent.
      goToStep(4);
    }
    qs('#whatsapp-btn-primary').addEventListener('click', handleWhatsAppContinue);
    qs('#whatsapp-btn-secondary').addEventListener('click', handleWhatsAppContinue);

    /* ============================================================
       STEP 4 — CONFIRMATION
       ============================================================ */
    function renderStep4() {
      qs('#confirmation-reference').textContent = state.reference || '—';
      var yacht = state.yachtId ? data.getYachtById(state.yachtId) : null;
      var calc = calcTotal();

      var detailsHtml = '';
      if (yacht) detailsHtml += '<div><dt>Yacht</dt><dd>' + yacht.name + '</dd></div>';
      if (calc.pkg) detailsHtml += '<div><dt>Package</dt><dd>' + calc.pkg.name + '</dd></div>';
      if (state.details.date) detailsHtml += '<div><dt>Date</dt><dd>' + state.details.date + '</dd></div>';
      if (state.details.time) detailsHtml += '<div><dt>Time</dt><dd>' + state.details.time + '</dd></div>';
      if (state.details.guests) detailsHtml += '<div><dt>Guests</dt><dd>' + state.details.guests + '</dd></div>';
      detailsHtml += '<div><dt>Total</dt><dd>' + data.formatAED(calc.total) + '</dd></div>';
      qs('#confirmation-details').innerHTML = '<dl class="order-summary-lines">' + detailsHtml + '</dl>';

      qs('#confirmation-whatsapp-link').href = data.whatsappLink(data.WHATSAPP_NUMBERS[0].digits, buildWhatsAppMessage());
    }

    /* ---------- Initial render ---------- */
    // If there's genuinely nothing in progress and no yacht pre-selected, show empty state on step 1 only if fleet is empty (never true) —
    // but if user has no yacht AND arrived with no state at all, step 1 still renders normally (yacht picker is itself the entry point).
    renderStep();
  };
})();

/* =========================================================
   FLEET LISTING MODULE
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages.fleet = function () {
    var data = window.VIPYachts;
    var util = window.VIPYachtsUtil;
    var qs = util.qs;
    var qsa = util.qsa;

    var grid = qs('#fleet-grid');
    var emptyState = qs('#fleet-empty-state');
    var resultCount = qs('#fleet-result-count');
    var tierChips = qsa('.filter-chip');
    var guestSelect = qs('#guest-filter');
    var resetBtn = qs('#fleet-reset-btn');

    var state = { tier: 'all', minGuests: 0 };

    function render() {
      var filtered = data.YACHTS.filter(function (y) {
        var tierMatch = state.tier === 'all' || y.tier === state.tier;
        var guestMatch = y.guests >= state.minGuests;
        return tierMatch && guestMatch;
      });

      resultCount.textContent = filtered.length + (filtered.length === 1 ? ' yacht available' : ' yachts available');

      if (!filtered.length) {
        grid.innerHTML = '';
        emptyState.hidden = false;
        return;
      }
      emptyState.hidden = true;
      grid.innerHTML = filtered.map(renderCard).join('');
      qsa('[data-fav]', grid).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var pressed = btn.getAttribute('aria-pressed') === 'true';
          btn.setAttribute('aria-pressed', String(!pressed));
        });
      });
    }

    function renderCard(yacht) {
      var base = data.BASE;
      return (
        '<article class="yacht-card fade-up is-visible">' +
          '<div class="yacht-card-media">' +
            data.yachtCardMediaHtml(yacht, ' underway') +
            '<span class="badge badge-gold yacht-card-tier">' + yacht.tierLabel + '</span>' +
            '<button class="yacht-card-fav" aria-label="Save ' + yacht.name + ' to favourites" aria-pressed="false" data-fav="' + yacht.id + '">&hearts;</button>' +
          '</div>' +
          '<div class="yacht-card-body">' +
            '<h3>' + yacht.name + '</h3>' +
            '<p class="yacht-card-tagline">' + yacht.tagline + '</p>' +
            '<div class="yacht-card-meta">' +
              '<span>' + data.formatSpec(yacht.guests, ' Guests') + '</span>' +
              '<span>' + data.formatSpec(yacht.cabins, ' Cabins') + '</span>' +
              '<span>' + data.formatSpec(yacht.length, ' ft') + '</span>' +
            '</div>' +
            '<div class="yacht-card-footer">' +
              '<span class="yacht-card-price">' + data.formatYachtPrice(yacht.pricePerDay) + '</span>' +
              '<a href="' + base + 'pages/yacht-detail.html?id=' + yacht.id + '" class="btn btn-sm btn-dark">View Details</a>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }

    tierChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        tierChips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        state.tier = chip.dataset.tier;
        render();
      });
    });

    guestSelect.addEventListener('change', function () {
      state.minGuests = Number(guestSelect.value);
      render();
    });

    resetBtn.addEventListener('click', function () {
      state.tier = 'all';
      state.minGuests = 0;
      guestSelect.value = '0';
      tierChips.forEach(function (c) { c.classList.remove('is-active'); });
      tierChips[0].classList.add('is-active');
      render();
    });

    render();
  };
})();

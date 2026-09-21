/* =========================================================
   CATAMARANS LISTING MODULE
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages.catamarans = function () {
    var data = window.VIPYachts;
    var util = window.VIPYachtsUtil;
    var qs = util.qs;

    var grid = qs('#catamaran-grid');
    if (!grid) return;
    grid.innerHTML = data.CATAMARANS.map(renderCard).join('');

    function renderCard(yacht) {
      var base = data.BASE;
      return (
        '<article class="yacht-card fade-up is-visible">' +
          '<div class="yacht-card-media">' +
            data.yachtCardMediaHtml(yacht, ' underway') +
            '<span class="badge badge-gold yacht-card-tier">' + yacht.tierLabel + '</span>' +
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
              '<span class="yacht-card-price">' + data.formatYachtPrice(yacht.pricePerHour) + '</span>' +
              '<a href="' + base + 'pages/yacht-detail?id=' + yacht.id + '" class="btn btn-sm btn-dark">View Details</a>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }
  };
})();

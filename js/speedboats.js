/* =========================================================
   SPEED BOATS LISTING MODULE
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages.speedboats = function () {
    var data = window.VIPYachts;
    var util = window.VIPYachtsUtil;
    var qs = util.qs;

    var grid = qs('#speedboat-grid');
    if (!grid) return;
    grid.innerHTML = data.SPEEDBOATS.map(renderCard).join('');

    function renderCard(boat) {
      var message = 'Hi! I\'d like to know more about the ' + boat.name + ' (' + data.formatYachtPrice(boat.pricePerHour) + ').';
      var waHref = data.whatsappLink(data.WHATSAPP_NUMBERS[0].digits, message);
      return (
        '<article class="yacht-card fade-up is-visible">' +
          '<div class="yacht-card-media">' +
            data.yachtCardMediaHtml(boat, ' underway') +
          '</div>' +
          '<div class="yacht-card-body">' +
            '<h3>' + boat.name + '</h3>' +
            '<p class="yacht-card-tagline">' + boat.tagline + '</p>' +
            '<div class="yacht-card-meta">' +
              '<span>' + data.formatSpec(boat.guests, ' Guests') + '</span>' +
              '<span>' + data.formatSpec(boat.length, ' ft') + '</span>' +
            '</div>' +
            '<div class="yacht-card-footer">' +
              '<span class="yacht-card-price">' + data.formatYachtPrice(boat.pricePerHour) + '</span>' +
              '<a href="' + waHref + '" target="_blank" rel="noopener" class="btn btn-sm btn-dark">Enquire on WhatsApp</a>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }
  };
})();

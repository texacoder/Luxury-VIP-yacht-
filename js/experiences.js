/* =========================================================
   EXPERIENCES / ADD-ONS PAGE MODULE
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages.experiences = function () {
    var data = window.VIPYachts;
    var qs = window.VIPYachtsUtil.qs;
    var base = data.BASE;
    var grid = qs('#addon-grid');

    // birthday-decor and photographer have no dedicated photo asset yet — map
    // them to the generic default image instead of a filename that 404s.
    var imageMap = {
      'bbq-meal': 'images/exp-bbq.png',
      'birthday-decor': 'images/exp-default.png',
      'dj-system': 'images/exp-dj.png',
      'photographer': 'images/exp-default.png',
      'jet-ski': 'images/exp-jetski.png'
    };

    grid.innerHTML = data.ADDONS.map(function (addon) {
      var imgPath = imageMap[addon.id] || 'images/exp-default.png';
      return (
        '<article class="addon-card fade-up" id="' + addon.id + '">' +
          '<div class="addon-card-media">' +
            '<img src="' + base + imgPath + '" alt="' + addon.name + '" ' +
              'onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:\'img-fallback\',textContent:\'' + addon.name + '\'}))">' +
          '</div>' +
          '<div class="addon-card-body">' +
            '<h3>' + addon.name + '</h3>' +
            '<p>' + addon.description + '</p>' +
            '<span class="addon-price">' + data.formatAED(addon.price) + '</span>' +
            '<a href="' + base + 'pages/booking.html?addon=' + addon.id + '" class="btn btn-dark btn-block">Add to Booking</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  };
})();

/* =========================================================
   PACKAGES PAGE MODULE
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages.packages = function () {
    var data = window.VIPYachts;
    var qs = window.VIPYachtsUtil.qs;
    var base = data.BASE;
    var grid = qs('#packages-full-grid');

    grid.innerHTML = data.PACKAGES.map(function (pkg) {
      var popularBadge = pkg.popular ? '<span class="badge badge-gold package-popular-badge">Most Popular</span>' : '';
      var popularClass = pkg.popular ? ' is-popular' : '';
      return (
        '<article class="package-card fade-up' + popularClass + '">' +
          '<div class="package-card-media">' +
            '<img src="' + base + 'images/package-' + pkg.id + '.png" alt="' + pkg.name + ' charter on the water" ' +
              'onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:\'img-fallback\',textContent:\'' + pkg.name + '\'}))">' +
            popularBadge +
          '</div>' +
          '<div class="package-card-body">' +
            '<h3>' + pkg.name + '</h3>' +
            '<span class="package-hours">' + pkg.hours + ' Hours</span>' +
            '<p class="package-desc">' + pkg.description + '</p>' +
            '<span class="package-price">' + data.formatAED(pkg.price) + '</span>' +
            '<a href="' + base + 'pages/booking.html?package=' + pkg.id + '" class="btn btn-gold btn-block">Select Package</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  };
})();

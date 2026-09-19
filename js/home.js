/* =========================================================
   HOMEPAGE MODULE
   Renders the fleet preview + packages preview and detects
   whether the hero background video actually plays. Only runs
   on index.html.
   ========================================================= */
(function () {
  'use strict';

  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages.index = function () {
    var data = window.VIPYachts;
    var util = window.VIPYachtsUtil;
    var qs = util.qs;

    /* ---------- Hero video fallback detection ---------- */
    var video = qs('#hero-video');
    if (video) {
      var markNoVideo = function () {
        qs('.hero').classList.add('no-video');
      };
      // Fires when the browser can't fetch the file at all (404, network error).
      video.addEventListener('error', markNoVideo);
      // Fires when the file loads but the browser can't decode/play it
      // (e.g. an unsupported codec like HEVC/H.265 inside an .mp4 container).
      // A video stuck at readyState 0 a couple seconds after load is not playable.
      setTimeout(function () {
        if (video.readyState === 0 || video.error) {
          markNoVideo();
        }
      }, 2500);
      video.addEventListener('canplay', function () {
        qs('.hero').classList.remove('no-video');
      });
    }

    /* ---------- Fleet preview (curated pick: 2 Classic, 2 Premium) ---------- */
    var previewGrid = qs('#fleet-preview-grid');
    if (previewGrid) {
      var FEATURED_IDS = ['enterprise-48', 'notorious-2023', 'princess-x95', 'thunder-49m'];
      var preview = FEATURED_IDS.map(function (id) { return data.getYachtById(id); }).filter(Boolean);
      previewGrid.innerHTML = preview.map(renderYachtCard).join('');
    }

    /* ---------- Packages preview ---------- */
    var pkgGrid = qs('#packages-preview-grid');
    if (pkgGrid) {
      pkgGrid.innerHTML = data.PACKAGES.map(renderPackageCard).join('');
    }

    function renderYachtCard(yacht) {
      var base = data.BASE;
      return (
        '<article class="yacht-card fade-up">' +
          '<div class="yacht-card-media">' +
            data.yachtCardMediaHtml(yacht, ' underway') +
            '<span class="badge badge-gold yacht-card-tier">' + yacht.tierLabel + '</span>' +
          '</div>' +
          '<div class="yacht-card-body">' +
            '<h3>' + yacht.name + '</h3>' +
            '<p class="yacht-card-tagline">' + data.formatSpec(yacht.guests, ' Guests') + ' · ' + data.formatSpec(yacht.cabins, ' Cabins') + '</p>' +
            '<div class="yacht-card-footer">' +
              '<span class="yacht-card-price">' + data.formatYachtPrice(yacht.pricePerHour) + '</span>' +
              '<a href="' + base + 'pages/yacht-detail?id=' + yacht.id + '" class="btn btn-sm btn-dark">View Details</a>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }

    function renderPackageCard(pkg) {
      var base = data.BASE;
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
            '<a href="' + base + 'pages/booking?package=' + pkg.id + '" class="btn btn-dark btn-block">Select</a>' +
          '</div>' +
        '</article>'
      );
    }

  };
})();

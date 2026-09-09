/* =========================================================
   HOMEPAGE MODULE
   Renders the fleet preview + packages preview and wires the
   hero video play/pause control. Only runs on index.html.
   ========================================================= */
(function () {
  'use strict';

  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages.index = function () {
    var data = window.VIPYachts;
    var util = window.VIPYachtsUtil;
    var qs = util.qs;
    var qsa = util.qsa;

    /* ---------- Hero video play/pause ---------- */
    var video = qs('#hero-video');
    var toggle = qs('#hero-play-toggle');
    if (video && toggle) {
      var markNoVideo = function () {
        qs('.hero').classList.add('no-video');
        toggle.style.display = 'none';
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
      toggle.addEventListener('click', function () {
        if (video.paused) {
          video.play();
          toggle.setAttribute('aria-pressed', 'false');
          toggle.setAttribute('aria-label', 'Pause background video');
          toggle.querySelector('.hero-play-icon').textContent = '❚❚';
        } else {
          video.pause();
          toggle.setAttribute('aria-pressed', 'true');
          toggle.setAttribute('aria-label', 'Play background video');
          toggle.querySelector('.hero-play-icon').textContent = '▶';
        }
      });
    }

    /* ---------- Fleet preview (first 4 yachts, one per notable tier where possible) ---------- */
    var previewGrid = qs('#fleet-preview-grid');
    if (previewGrid) {
      var preview = data.YACHTS.slice(0, 4);
      previewGrid.innerHTML = preview.map(renderYachtCard).join('');
      wireFavButtons(previewGrid);
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
            '<img src="' + base + yacht.image + '" alt="' + yacht.name + ' underway" ' +
              'onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:\'img-fallback\',textContent:\'' + yacht.name + '\'}))">' +
            '<span class="badge badge-gold yacht-card-tier">' + yacht.tierLabel + '</span>' +
            '<button class="yacht-card-fav" aria-label="Save ' + yacht.name + ' to favourites" aria-pressed="false" data-fav="' + yacht.id + '">&hearts;</button>' +
          '</div>' +
          '<div class="yacht-card-body">' +
            '<h3>' + yacht.name + '</h3>' +
            '<p class="yacht-card-tagline">' + yacht.guests + ' Guests · ' + yacht.cabins + ' Cabins</p>' +
            '<div class="yacht-card-footer">' +
              '<span class="yacht-card-price">' + data.formatYachtPrice(yacht.pricePerDay) + '</span>' +
              '<a href="' + base + 'pages/yacht-detail.html?id=' + yacht.id + '" class="btn btn-sm btn-dark">View Details</a>' +
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
            '<span class="package-price">' + data.formatAED(pkg.price) + '</span>' +
            '<a href="' + base + 'pages/booking.html?package=' + pkg.id + '" class="btn btn-dark btn-block">Select</a>' +
          '</div>' +
        '</article>'
      );
    }

    function wireFavButtons(container) {
      qsa('[data-fav]', container).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var pressed = btn.getAttribute('aria-pressed') === 'true';
          btn.setAttribute('aria-pressed', String(!pressed));
        });
      });
    }
  };
})();

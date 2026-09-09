/* =========================================================
   YACHT DETAIL MODULE
   Reads ?id= from the URL and renders the full detail template.
   Handles invalid/missing IDs with a polished not-found state.
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages['yacht-detail'] = function () {
    var data = window.VIPYachts;
    var util = window.VIPYachtsUtil;
    var qs = util.qs;
    var qsa = util.qsa;
    var base = data.BASE;

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var yacht = id ? data.getYachtById(id) : null;

    if (!yacht) {
      qs('#yacht-not-found').hidden = false;
      qs('#yacht-detail-content').hidden = true;
      document.title = 'Yacht Not Found — VIP Yachts';
      return;
    }

    qs('#yacht-detail-content').hidden = false;
    document.title = yacht.name + ' — VIP Yachts';
    qs('#page-title').textContent = yacht.name + ' — VIP Yachts';

    /* ---------- Hero ---------- */
    var heroImg = qs('#yacht-hero-image');
    if (!yacht.image) {
      heroImg.replaceWith(Object.assign(document.createElement('div'), { className: 'img-fallback', textContent: 'Images will be uploaded soon', style: 'width:100%;height:100%;' }));
    } else {
      heroImg.src = base + yacht.image;
      heroImg.alt = yacht.name + ' underway near Dubai Marina';
      heroImg.onerror = function () {
        this.replaceWith(Object.assign(document.createElement('div'), { className: 'img-fallback', textContent: yacht.name, style: 'width:100%;height:100%;' }));
      };
    }
    qs('#breadcrumb-name').textContent = yacht.name;
    qs('#yacht-tier-badge').textContent = yacht.tierLabel;
    qs('#yacht-name').textContent = yacht.name;
    qs('#yacht-tagline').textContent = yacht.tagline;

    /* ---------- Quick spec strip ---------- */
    var specStrip = qs('#yacht-spec-strip');
    var specs = [
      { label: 'Guests', value: data.formatSpec(yacht.guests) },
      { label: 'Cabins', value: data.formatSpec(yacht.cabins) },
      { label: 'Washrooms', value: data.formatSpec(yacht.washrooms) },
      { label: 'Length', value: data.formatSpec(yacht.length, ' ft') },
      { label: 'Crew', value: data.formatSpec(yacht.crew) },
      { label: 'Top Speed', value: data.formatSpec(yacht.speedKnots, ' kn') },
      { label: 'Year', value: data.formatSpec(yacht.year) }
    ];
    specStrip.innerHTML = specs.map(function (s) {
      return '<li><span class="spec-value">' + s.value + '</span><span class="spec-label">' + s.label + '</span></li>';
    }).join('');

    /* ---------- Overview text ---------- */
    qs('#yacht-description').textContent = yacht.description;
    qs('#yacht-overview').textContent = yacht.overview;

    /* ---------- Video tour ---------- */
    var videoEl = qs('#yacht-video');
    var videoSrc = qs('#yacht-video-src');
    var videoFallback = qs('#yacht-video-fallback');
    videoEl.poster = yacht.image ? base + yacht.image : '';
    videoSrc.src = base + yacht.video;
    videoEl.load();
    videoEl.addEventListener('error', function () {
      videoEl.style.display = 'none';
      videoFallback.style.display = 'flex';
    });
    videoFallback.style.display = 'none';

    /* ---------- Gallery + Lightbox ---------- */
    var galleryImages = yacht.gallery && yacht.gallery.length ? yacht.gallery : (yacht.image ? [yacht.image] : []);
    var galleryEl = qs('#yacht-gallery');
    if (!galleryImages.length) {
      galleryEl.innerHTML = '<p>Images will be uploaded soon.</p>';
    } else {
      galleryEl.innerHTML = galleryImages.map(function (src, i) {
        return (
          '<button class="detail-gallery-item" data-index="' + i + '" aria-label="Open image ' + (i + 1) + ' of ' + galleryImages.length + '">' +
            '<img src="' + base + src + '" alt="' + yacht.name + ' interior or deck view, photo ' + (i + 1) + '" ' +
              'onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:\'img-fallback\',textContent:\'Photo ' + (i + 1) + '\'}))">' +
          '</button>'
        );
      }).join('');
    }

    var lightbox = qs('#lightbox');
    var lightboxImage = qs('#lightbox-image');
    var lightboxClose = qs('#lightbox-close');
    var lightboxPrev = qs('#lightbox-prev');
    var lightboxNext = qs('#lightbox-next');
    var currentIndex = 0;
    var lastFocused = null;

    function openLightbox(index) {
      currentIndex = index;
      lastFocused = document.activeElement;
      updateLightboxImage();
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    }
    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }
    function updateLightboxImage() {
      var src = galleryImages[currentIndex];
      lightboxImage.src = base + src;
      lightboxImage.alt = yacht.name + ' photo ' + (currentIndex + 1) + ' of ' + galleryImages.length;
    }
    function showNext() { currentIndex = (currentIndex + 1) % galleryImages.length; updateLightboxImage(); }
    function showPrev() { currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length; updateLightboxImage(); }

    qsa('.detail-gallery-item', galleryEl).forEach(function (btn) {
      btn.addEventListener('click', function () { openLightbox(Number(btn.dataset.index)); });
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });

    /* ---------- Features ---------- */
    qs('#yacht-features').innerHTML = yacht.features.map(function (f) {
      return '<li>' + f + '</li>';
    }).join('');

    /* ---------- Deck breakdown ---------- */
    qs('#yacht-decks').innerHTML = yacht.decks.map(function (d) {
      return '<li><h3>' + d.name + '</h3><p>' + d.detail + '</p></li>';
    }).join('');

    /* ---------- Sticky booking sidebar ---------- */
    qs('#yacht-sidebar-price').textContent = data.formatYachtPrice(yacht.pricePerDay);
    qs('#sidebar-guests').textContent = data.formatSpec(yacht.guests);
    qs('#sidebar-cabins').textContent = data.formatSpec(yacht.cabins);
    qs('#sidebar-crew').textContent = data.formatSpec(yacht.crew);
    qs('#sidebar-length').textContent = data.formatSpec(yacht.length, ' ft');
    qs('#yacht-book-btn').href = base + 'pages/booking.html?yacht=' + yacht.id;
  };
})();

/* =========================================================
   GALLERY PAGE MODULE
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages.gallery = function () {
    var data = window.VIPYachts;
    var util = window.VIPYachtsUtil;
    var qs = util.qs;
    var qsa = util.qsa;
    var base = data.BASE;

    var IMAGES = [
      { src: 'images/gallery-fleet-1.png', category: 'fleet', alt: 'Golden Horizon underway at sunset' },
      { src: 'images/gallery-fleet-2.png', category: 'fleet', alt: 'Sea Empress docked at Dubai Marina Yacht Club' },
      { src: 'images/gallery-fleet-3.png', category: 'fleet', alt: 'Wave Rider cruising at speed' },
      { src: 'images/gallery-interior-1.png', category: 'interiors', alt: 'Yacht salon with ivory leather seating' },
      { src: 'images/gallery-interior-2.png', category: 'interiors', alt: 'Master stateroom aboard Golden Horizon' },
      { src: 'images/gallery-interior-3.png', category: 'interiors', alt: 'Onboard dining table set for guests' },
      { src: 'images/gallery-exp-1.png', category: 'experiences', alt: 'Guests enjoying an onboard BBQ' },
      { src: 'images/gallery-exp-2.png', category: 'experiences', alt: 'Jet ski beside a yacht at anchor' },
      { src: 'images/gallery-exp-3.png', category: 'experiences', alt: 'DJ set on the aft deck at sunset' },
      { src: 'images/gallery-marina-1.png', category: 'marina', alt: 'Dubai Marina skyline from the water' },
      { src: 'images/gallery-marina-2.png', category: 'marina', alt: 'Fleet docked along the Marina walk' },
      { src: 'images/gallery-marina-3.png', category: 'marina', alt: 'Sunset view over Palm Jumeirah from a yacht' }
    ];

    var grid = qs('#gallery-grid');
    var emptyState = qs('#gallery-empty-state');
    var filters = qsa('.filter-chip', qs('#gallery-filters'));
    var currentCategory = 'all';
    var visibleImages = IMAGES.slice();

    function render() {
      visibleImages = currentCategory === 'all' ? IMAGES : IMAGES.filter(function (img) { return img.category === currentCategory; });
      if (!visibleImages.length) {
        grid.innerHTML = '';
        emptyState.hidden = false;
        return;
      }
      emptyState.hidden = true;
      grid.innerHTML = visibleImages.map(function (img, i) {
        return (
          '<button class="gallery-item" data-index="' + i + '" aria-label="Open ' + img.alt + '">' +
            '<img src="' + base + img.src + '" alt="' + img.alt + '" loading="lazy" ' +
              'onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:\'img-fallback\',textContent:\'' + img.alt + '\'}))">' +
          '</button>'
        );
      }).join('');
      qsa('.gallery-item', grid).forEach(function (btn) {
        btn.addEventListener('click', function () { openLightbox(Number(btn.dataset.index)); });
      });
    }

    filters.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filters.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        currentCategory = chip.dataset.category;
        render();
      });
    });

    /* ---------- Lightbox ---------- */
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
      updateImage();
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    }
    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }
    function updateImage() {
      var img = visibleImages[currentIndex];
      lightboxImage.src = base + img.src;
      lightboxImage.alt = img.alt;
    }
    function showNext() { currentIndex = (currentIndex + 1) % visibleImages.length; updateImage(); }
    function showPrev() { currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length; updateImage(); }

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

    render();
  };
})();

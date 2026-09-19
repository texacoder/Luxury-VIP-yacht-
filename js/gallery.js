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

    // Real photos from the fleet, organized by category. Every entry below
    // points at an actual client-supplied yacht photo (or the marina photo
    // on the About page) — no stock or placeholder imagery.
    var IMAGES = [
      { src: 'images/yacht-aarna-90-exterior-1.jpg', category: 'fleet', alt: 'Aarna exterior view 1' },
      { src: 'images/yacht-big-daddy-90-exterior-1.jpg', category: 'fleet', alt: 'Big Daddy 90 exterior view 1' },
      { src: 'images/yacht-big-daddy-90-exterior-2.jpg', category: 'fleet', alt: 'Big Daddy 90 exterior view 2' },
      { src: 'images/yacht-big-daddy-90-hero.jpg', category: 'fleet', alt: 'Big Daddy 90 underway' },
      { src: 'images/yacht-carmen-140-exterior-1.jpg', category: 'fleet', alt: 'Carmen exterior view 1' },
      { src: 'images/yacht-carmen-140-hero.jpg', category: 'fleet', alt: 'Carmen underway' },
      { src: 'images/yacht-encore-exterior.jpg', category: 'fleet', alt: 'Encore exterior view' },
      { src: 'images/yacht-encore-hero.jpg', category: 'fleet', alt: 'Encore underway' },
      { src: 'images/yacht-enterprise-48-exterior-1.jpg', category: 'fleet', alt: 'Enterprise exterior view 1' },
      { src: 'images/yacht-enterprise-48-exterior-2.jpg', category: 'fleet', alt: 'Enterprise exterior view 2' },
      { src: 'images/yacht-enterprise-48-exterior-3.jpg', category: 'fleet', alt: 'Enterprise exterior view 3' },
      { src: 'images/yacht-enterprise-48-hero.jpg', category: 'fleet', alt: 'Enterprise underway' },
      { src: 'images/yacht-fynesse-exterior.jpg', category: 'fleet', alt: 'Fynesse exterior view' },
      { src: 'images/yacht-fynesse-hero.jpg', category: 'fleet', alt: 'Fynesse underway' },
      { src: 'images/yacht-grand-82-hero.jpg', category: 'fleet', alt: 'Grand 82 underway' },
      { src: 'images/yacht-jasmine-55-exterior.jpg', category: 'fleet', alt: 'Jasmine exterior view' },
      { src: 'images/yacht-jasmine-55-hero.jpg', category: 'fleet', alt: 'Jasmine underway' },
      { src: 'images/yacht-khalili-exterior-1.jpg', category: 'fleet', alt: 'Khalili exterior view 1' },
      { src: 'images/yacht-khalili-exterior-2.jpg', category: 'fleet', alt: 'Khalili exterior view 2' },
      { src: 'images/yacht-khalili-exterior-aft.jpg', category: 'fleet', alt: 'Khalili exterior aft' },
      { src: 'images/yacht-khalili-exterior-front.jpg', category: 'fleet', alt: 'Khalili exterior front' },
      { src: 'images/yacht-majesty-101-exterior-1.jpg', category: 'fleet', alt: 'Majesty 101 exterior view 1' },
      { src: 'images/yacht-majesty-101-exterior-2.jpg', category: 'fleet', alt: 'Majesty 101 exterior view 2' },
      { src: 'images/yacht-majesty-101-hero.jpg', category: 'fleet', alt: 'Majesty 101 underway' },
      { src: 'images/yacht-majesty-59-exterior.jpg', category: 'fleet', alt: 'Majesty 59 exterior view' },
      { src: 'images/yacht-majesty-88-exterior.jpg', category: 'fleet', alt: 'Majesty 88 exterior view' },
      { src: 'images/yacht-majesty-88-hero.jpg', category: 'fleet', alt: 'Majesty 88 underway' },
      { src: 'images/yacht-matrix-exterior.jpg', category: 'fleet', alt: 'Matrix exterior view' },
      { src: 'images/yacht-matrix-hero.jpg', category: 'fleet', alt: 'Matrix underway' },
      { src: 'images/yacht-mayyas-75-exterior-2.jpg', category: 'fleet', alt: 'Mayyas exterior view 2' },
      { src: 'images/yacht-mayyas-75-exterior.jpg', category: 'fleet', alt: 'Mayyas exterior view' },
      { src: 'images/yacht-mayyas-75-hero.jpg', category: 'fleet', alt: 'Mayyas underway' },
      { src: 'images/yacht-notika-exterior.jpg', category: 'fleet', alt: 'Notika exterior view' },
      { src: 'images/yacht-notika-hero.jpg', category: 'fleet', alt: 'Notika underway' },
      { src: 'images/yacht-princess-x95-exterior-1.jpg', category: 'fleet', alt: 'Princess X95 exterior view 1' },
      { src: 'images/yacht-princess-x95-exterior-side.jpg', category: 'fleet', alt: 'Princess X95 exterior side view' },
      { src: 'images/yacht-sanlorenzo-sx88-exterior.jpg', category: 'fleet', alt: 'San Lorenzo SX88 exterior view' },
      { src: 'images/yacht-sanlorenzo-sx88-hero.jpg', category: 'fleet', alt: 'San Lorenzo SX88 underway' },
      { src: 'images/yacht-schaefer-480-exterior-1.jpg', category: 'fleet', alt: 'Schaefer 480 exterior view 1' },
      { src: 'images/yacht-schaefer-480-exterior-2.jpg', category: 'fleet', alt: 'Schaefer 480 exterior view 2' },
      { src: 'images/yacht-schaefer-480-exterior-3.jpg', category: 'fleet', alt: 'Schaefer 480 exterior view 3' },
      { src: 'images/yacht-thunder-49m-exterior-1.jpg', category: 'fleet', alt: 'Thunder exterior view 1' },
      { src: 'images/yacht-aarna-90-main-salon.jpg', category: 'interiors', alt: 'Aarna main salon' },
      { src: 'images/yacht-aarna-90-master-cabin.jpg', category: 'interiors', alt: 'Aarna master cabin' },
      { src: 'images/yacht-aarna-90-staircase.jpg', category: 'interiors', alt: 'Aarna staircase' },
      { src: 'images/yacht-big-daddy-90-helm.jpg', category: 'interiors', alt: 'Big Daddy 90 helm' },
      { src: 'images/yacht-big-daddy-90-master-cabin.jpg', category: 'interiors', alt: 'Big Daddy 90 master cabin' },
      { src: 'images/yacht-big-daddy-90-salon.jpg', category: 'interiors', alt: 'Big Daddy 90 salon' },
      { src: 'images/yacht-big-daddy-90-twin-room.jpg', category: 'interiors', alt: 'Big Daddy 90 twin room' },
      { src: 'images/yacht-carmen-140-bathroom.jpg', category: 'interiors', alt: 'Carmen bathroom' },
      { src: 'images/yacht-carmen-140-guest-cabin.jpg', category: 'interiors', alt: 'Carmen guest cabin' },
      { src: 'images/yacht-carmen-140-helm.jpg', category: 'interiors', alt: 'Carmen helm' },
      { src: 'images/yacht-carmen-140-master-cabin.jpg', category: 'interiors', alt: 'Carmen master cabin' },
      { src: 'images/yacht-carmen-140-salon.jpg', category: 'interiors', alt: 'Carmen salon' },
      { src: 'images/yacht-carmen-140-vip-cabin.jpg', category: 'interiors', alt: 'Carmen VIP cabin' },
      { src: 'images/yacht-encore-interior.jpg', category: 'interiors', alt: 'Encore interior' },
      { src: 'images/yacht-enterprise-48-helm.jpg', category: 'interiors', alt: 'Enterprise helm' },
      { src: 'images/yacht-enterprise-48-master-cabin.jpg', category: 'interiors', alt: 'Enterprise master cabin' },
      { src: 'images/yacht-enterprise-48-salon-1.jpg', category: 'interiors', alt: 'Enterprise salon 1' },
      { src: 'images/yacht-enterprise-48-salon-2.jpg', category: 'interiors', alt: 'Enterprise salon 2' },
      { src: 'images/yacht-enterprise-48-salon-3.jpg', category: 'interiors', alt: 'Enterprise salon 3' },
      { src: 'images/yacht-fynesse-interior.jpg', category: 'interiors', alt: 'Fynesse interior' },
      { src: 'images/yacht-grand-82-bathroom.jpg', category: 'interiors', alt: 'Grand 82 bathroom' },
      { src: 'images/yacht-grand-82-bedroom-1.jpg', category: 'interiors', alt: 'Grand 82 bedroom 1' },
      { src: 'images/yacht-grand-82-bedroom-2.jpg', category: 'interiors', alt: 'Grand 82 bedroom 2' },
      { src: 'images/yacht-grand-82-saloon-1.jpg', category: 'interiors', alt: 'Grand 82 saloon 1' },
      { src: 'images/yacht-grand-82-saloon-2.jpg', category: 'interiors', alt: 'Grand 82 saloon 2' },
      { src: 'images/yacht-grand-82-saloon-3.jpg', category: 'interiors', alt: 'Grand 82 saloon 3' },
      { src: 'images/yacht-grand-82-saloon-4.jpg', category: 'interiors', alt: 'Grand 82 saloon 4' },
      { src: 'images/yacht-jasmine-55-interior.jpg', category: 'interiors', alt: 'Jasmine interior' },
      { src: 'images/yacht-khalili-cabin-1.jpg', category: 'interiors', alt: 'Khalili cabin 1' },
      { src: 'images/yacht-khalili-cabin-2.jpg', category: 'interiors', alt: 'Khalili cabin 2' },
      { src: 'images/yacht-khalili-lounge-tv.jpg', category: 'interiors', alt: 'Khalili lounge TV' },
      { src: 'images/yacht-khalili-twin-cabin.jpg', category: 'interiors', alt: 'Khalili twin cabin' },
      { src: 'images/yacht-majesty-101-helm.jpg', category: 'interiors', alt: 'Majesty 101 helm' },
      { src: 'images/yacht-majesty-101-master-cabin.jpg', category: 'interiors', alt: 'Majesty 101 master cabin' },
      { src: 'images/yacht-majesty-101-salon.jpg', category: 'interiors', alt: 'Majesty 101 salon' },
      { src: 'images/yacht-majesty-59-interior.jpg', category: 'interiors', alt: 'Majesty 59 interior' },
      { src: 'images/yacht-majesty-88-interior.jpg', category: 'interiors', alt: 'Majesty 88 interior' },
      { src: 'images/yacht-matrix-interior.jpg', category: 'interiors', alt: 'Matrix interior' },
      { src: 'images/yacht-mayyas-75-interior.jpg', category: 'interiors', alt: 'Mayyas interior' },
      { src: 'images/yacht-notika-interior.jpg', category: 'interiors', alt: 'Notika interior' },
      { src: 'images/yacht-princess-x95-bathroom.jpg', category: 'interiors', alt: 'Princess X95 bathroom' },
      { src: 'images/yacht-princess-x95-interior-collage-1.jpg', category: 'interiors', alt: 'Princess X95 interior view 1' },
      { src: 'images/yacht-princess-x95-interior-collage-2.jpg', category: 'interiors', alt: 'Princess X95 interior view 2' },
      { src: 'images/yacht-princess-x95-interior-collage-3.jpg', category: 'interiors', alt: 'Princess X95 interior view 3' },
      { src: 'images/yacht-sanlorenzo-sx88-interior.jpg', category: 'interiors', alt: 'San Lorenzo SX88 interior' },
      { src: 'images/yacht-schaefer-480-dinette.jpg', category: 'interiors', alt: 'Schaefer 480 dinette' },
      { src: 'images/yacht-schaefer-480-galley.jpg', category: 'interiors', alt: 'Schaefer 480 galley' },
      { src: 'images/yacht-schaefer-480-master-cabin.jpg', category: 'interiors', alt: 'Schaefer 480 master cabin' },
      { src: 'images/yacht-schaefer-480-salon.jpg', category: 'interiors', alt: 'Schaefer 480 salon' },
      { src: 'images/yacht-schaefer-480-twin-cabin.jpg', category: 'interiors', alt: 'Schaefer 480 twin cabin' },
      { src: 'images/yacht-thunder-49m-guest-cabin-1.jpg', category: 'interiors', alt: 'Thunder guest cabin 1' },
      { src: 'images/yacht-thunder-49m-guest-cabin-2.jpg', category: 'interiors', alt: 'Thunder guest cabin 2' },
      { src: 'images/yacht-thunder-49m-master-bathroom.jpg', category: 'interiors', alt: 'Thunder master bathroom' },
      { src: 'images/yacht-thunder-49m-master-suite.jpg', category: 'interiors', alt: 'Thunder master suite' },
      { src: 'images/yacht-aarna-90-aft-dining.jpg', category: 'experiences', alt: 'Aarna aft dining' },
      { src: 'images/yacht-aarna-90-bar.jpg', category: 'experiences', alt: 'Aarna bar' },
      { src: 'images/yacht-aarna-90-dining-spread.jpg', category: 'experiences', alt: 'Aarna dining spread' },
      { src: 'images/yacht-aarna-90-dining-table.jpg', category: 'experiences', alt: 'Aarna dining table' },
      { src: 'images/yacht-aarna-90-flybridge-lounge.jpg', category: 'experiences', alt: 'Aarna flybridge lounge' },
      { src: 'images/yacht-aarna-90-foredeck.jpg', category: 'experiences', alt: 'Aarna foredeck' },
      { src: 'images/yacht-aarna-90-grill.jpg', category: 'experiences', alt: 'Aarna grill' },
      { src: 'images/yacht-aarna-90-sundeck-lounge.jpg', category: 'experiences', alt: 'Aarna sundeck lounge' },
      { src: 'images/yacht-big-daddy-90-flybridge.jpg', category: 'experiences', alt: 'Big Daddy 90 flybridge' },
      { src: 'images/yacht-big-daddy-90-lower-deck-stairs.jpg', category: 'experiences', alt: 'Big Daddy 90 lower deck stairs' },
      { src: 'images/yacht-big-daddy-90-sunbed.jpg', category: 'experiences', alt: 'Big Daddy 90 sunbed' },
      { src: 'images/yacht-carmen-140-bar.jpg', category: 'experiences', alt: 'Carmen bar' },
      { src: 'images/yacht-carmen-140-dining.jpg', category: 'experiences', alt: 'Carmen dining' },
      { src: 'images/yacht-carmen-140-flybridge.jpg', category: 'experiences', alt: 'Carmen flybridge' },
      { src: 'images/yacht-carmen-140-jacuzzi.jpg', category: 'experiences', alt: 'Carmen jacuzzi' },
      { src: 'images/yacht-carmen-140-upper-lounge.jpg', category: 'experiences', alt: 'Carmen upper lounge' },
      { src: 'images/yacht-enterprise-48-sundeck-seating.jpg', category: 'experiences', alt: 'Enterprise sundeck seating' },
      { src: 'images/yacht-grand-82-aft-table.jpg', category: 'experiences', alt: 'Grand 82 aft table' },
      { src: 'images/yacht-grand-82-back-table.jpg', category: 'experiences', alt: 'Grand 82 back table' },
      { src: 'images/yacht-grand-82-bar-counter.jpg', category: 'experiences', alt: 'Grand 82 bar counter' },
      { src: 'images/yacht-grand-82-jacuzzi.jpg', category: 'experiences', alt: 'Grand 82 jacuzzi' },
      { src: 'images/yacht-grand-82-sunbed-jacuzzi-bow.jpg', category: 'experiences', alt: 'Grand 82 sunbed jacuzzi bow' },
      { src: 'images/yacht-grand-82-sunbed.jpg', category: 'experiences', alt: 'Grand 82 sunbed' },
      { src: 'images/yacht-grand-82-upperdeck-bar.jpg', category: 'experiences', alt: 'Grand 82 upperdeck bar' },
      { src: 'images/yacht-khalili-bar.jpg', category: 'experiences', alt: 'Khalili bar' },
      { src: 'images/yacht-khalili-deck-lounge-2.jpg', category: 'experiences', alt: 'Khalili deck lounge 2' },
      { src: 'images/yacht-khalili-deck-seating.jpg', category: 'experiences', alt: 'Khalili deck seating' },
      { src: 'images/yacht-khalili-flybridge-bar.jpg', category: 'experiences', alt: 'Khalili flybridge bar' },
      { src: 'images/yacht-khalili-flybridge-dining.jpg', category: 'experiences', alt: 'Khalili flybridge dining' },
      { src: 'images/yacht-khalili-lounge-1.jpg', category: 'experiences', alt: 'Khalili lounge 1' },
      { src: 'images/yacht-khalili-lounge-2.jpg', category: 'experiences', alt: 'Khalili lounge 2' },
      { src: 'images/yacht-khalili-outdoor-dining.jpg', category: 'experiences', alt: 'Khalili outdoor dining' },
      { src: 'images/yacht-khalili-sundeck-lounge.jpg', category: 'experiences', alt: 'Khalili sundeck lounge' },
      { src: 'images/yacht-majesty-101-dining-1.jpg', category: 'experiences', alt: 'Majesty 101 dining 1' },
      { src: 'images/yacht-majesty-101-dining-2.jpg', category: 'experiences', alt: 'Majesty 101 dining 2' },
      { src: 'images/yacht-majesty-101-flybridge.jpg', category: 'experiences', alt: 'Majesty 101 flybridge' },
      { src: 'images/yacht-majesty-101-jacuzzi.jpg', category: 'experiences', alt: 'Majesty 101 jacuzzi' },
      { src: 'images/yacht-majesty-101-sunbed.jpg', category: 'experiences', alt: 'Majesty 101 sunbed' },
      { src: 'images/yacht-princess-x95-aft-cockpit.jpg', category: 'experiences', alt: 'Princess X95 aft cockpit' },
      { src: 'images/yacht-schaefer-480-aft-lounge.jpg', category: 'experiences', alt: 'Schaefer 480 aft lounge' },
      { src: 'images/yacht-schaefer-480-bow-sundeck.jpg', category: 'experiences', alt: 'Schaefer 480 bow sundeck' },
      { src: 'images/yacht-schaefer-480-flybridge-top.jpg', category: 'experiences', alt: 'Schaefer 480 flybridge top' },
      { src: 'images/yacht-schaefer-480-upper-deck.jpg', category: 'experiences', alt: 'Schaefer 480 upper deck' },
      { src: 'images/yacht-thunder-49m-aerial-pool.jpg', category: 'experiences', alt: 'Thunder aerial pool' },
      { src: 'images/yacht-thunder-49m-dining-room.jpg', category: 'experiences', alt: 'Thunder dining room' },
      { src: 'images/yacht-thunder-49m-foredeck-pool.jpg', category: 'experiences', alt: 'Thunder foredeck pool' },
      { src: 'images/yacht-thunder-49m-lounge.jpg', category: 'experiences', alt: 'Thunder lounge' },
      { src: 'images/yacht-thunder-49m-pool-deck.jpg', category: 'experiences', alt: 'Thunder pool deck' },
      { src: 'images/yacht-thunder-49m-sundeck-lounge.jpg', category: 'experiences', alt: 'Thunder sundeck lounge' },
      { src: 'images/about-marina.png', category: 'marina', alt: 'Aerial view of the marina and docked yachts' }
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

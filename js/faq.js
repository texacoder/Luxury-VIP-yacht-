/* =========================================================
   FAQ PAGE MODULE — accessible accordions
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages.faq = function () {
    var qsa = window.VIPYachtsUtil.qsa;
    var triggers = qsa('.accordion-trigger');

    triggers.forEach(function (trigger) {
      var panel = trigger.nextElementSibling;
      panel.style.maxHeight = '0px';

      trigger.addEventListener('click', function () {
        var isOpen = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!isOpen));
        trigger.closest('.accordion-item').classList.toggle('is-open', !isOpen);
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : '0px';
      });
    });
  };
})();

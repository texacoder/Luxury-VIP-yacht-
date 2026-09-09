/* =========================================================
   CONTACT PAGE MODULE — form validation + success state
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages.contact = function () {
    var qs = window.VIPYachtsUtil.qs;
    var form = qs('#contact-form');
    var success = qs('#contact-success');
    var resetBtn = qs('#contact-reset-btn');

    function setError(fieldId, message) {
      var errorEl = qs('#error-' + fieldId);
      var input = qs('#contact-' + fieldId);
      if (message) {
        errorEl.textContent = message;
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', 'error-' + fieldId);
      } else {
        errorEl.textContent = '';
        input.removeAttribute('aria-invalid');
      }
    }

    function validate() {
      var valid = true;
      var name = qs('#contact-name').value.trim();
      var email = qs('#contact-email').value.trim();
      var phone = qs('#contact-phone').value.trim();
      var subject = qs('#contact-subject').value;
      var message = qs('#contact-message').value.trim();

      if (!name) { setError('name', 'Please enter your full name.'); valid = false; } else { setError('name', ''); }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) { setError('email', 'Please enter your email address.'); valid = false; }
      else if (!emailPattern.test(email)) { setError('email', 'Please enter a valid email address.'); valid = false; }
      else { setError('email', ''); }

      if (!phone) { setError('phone', 'Please enter a phone number.'); valid = false; } else { setError('phone', ''); }

      if (!subject) { setError('subject', 'Please select a subject.'); valid = false; } else { setError('subject', ''); }

      if (!message) { setError('message', 'Please enter a message.'); valid = false; }
      else if (message.length < 10) { setError('message', 'Please provide a little more detail (at least 10 characters).'); valid = false; }
      else { setError('message', ''); }

      return valid;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstError = form.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return;
      }
      form.hidden = true;
      success.hidden = false;
      success.focus && success.setAttribute('tabindex', '-1');
    });

    resetBtn.addEventListener('click', function () {
      form.reset();
      form.hidden = false;
      success.hidden = true;
      ['name', 'email', 'phone', 'subject', 'message'].forEach(function (f) { setError(f, ''); });
      qs('#contact-name').focus();
    });
  };
})();

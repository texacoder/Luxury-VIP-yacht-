/* =========================================================
   CONTACT PAGE MODULE — form validation + WhatsApp handoff
   There's no email backend wired up yet, so this form sends
   nowhere on its own. The success state is only shown once a
   WhatsApp chat with the message actually opens — never faked.
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  var SUBJECT_LABELS = {
    booking: 'Booking Question',
    custom: 'Custom Charter Request',
    feedback: 'Feedback',
    other: 'Other'
  };

  window.VIPYachtsPages.contact = function () {
    var data = window.VIPYachts;
    var qs = window.VIPYachtsUtil.qs;
    var form = qs('#contact-form');
    var success = qs('#contact-success');
    var resetBtn = qs('#contact-reset-btn');
    var submitError = qs('#contact-submit-error');

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

      submitError.hidden = true;
      submitError.innerHTML = '';

      var name = qs('#contact-name').value.trim();
      var email = qs('#contact-email').value.trim();
      var phone = qs('#contact-phone').value.trim();
      var subject = qs('#contact-subject').value;
      var message = qs('#contact-message').value.trim();

      var waMessage = [
        'Hi VIP Yachts! I have a question.',
        '',
        'Subject: ' + (SUBJECT_LABELS[subject] || subject),
        'Name: ' + name,
        'Email: ' + email,
        'Phone: ' + phone,
        '',
        message
      ].join('\n');
      var url = data.whatsappLink(data.WHATSAPP_NUMBERS[0].digits, waMessage);

      // window.open() always returns null when 'noopener' is passed as a
      // window feature — by spec, not as a signal of the popup being
      // blocked — so that can't be used to detect a blocked popup. Open
      // without it, then sever window.opener manually on the returned
      // reference for the same security effect while still getting a
      // real reference to check.
      var opened = window.open(url, '_blank');
      if (opened) opened.opener = null;

      if (opened) {
        form.hidden = true;
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus();
      } else {
        submitError.hidden = false;
        submitError.innerHTML = 'Your browser blocked the popup. <a href="' + url + '" target="_blank" rel="noopener">Tap here to open WhatsApp</a> and send your message directly.';
      }
    });

    resetBtn.addEventListener('click', function () {
      form.reset();
      form.hidden = false;
      success.hidden = true;
      submitError.hidden = true;
      ['name', 'email', 'phone', 'subject', 'message'].forEach(function (f) { setError(f, ''); });
      qs('#contact-name').focus();
    });
  };
})();

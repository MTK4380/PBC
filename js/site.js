(function () {
  function getWhatsAppNumber() {
    return (window.PBC_CONFIG && window.PBC_CONFIG.contact && window.PBC_CONFIG.contact.whatsapp) || '923365163615';
  }

  function injectWhatsAppButton() {
    if (document.querySelector('.whatsapp-float')) return;
    var number = getWhatsAppNumber();
    var message = encodeURIComponent('Hello Pneumatic Business Consultants, I want to ask about tyres.');
    var link = document.createElement('a');
    link.className = 'whatsapp-float';
    link.href = 'https://wa.me/' + number + '?text=' + message;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Chat with us on WhatsApp');
    link.innerHTML =
      '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
      '<path d="M16.01 3.2c-7.05 0-12.78 5.73-12.78 12.78 0 2.25.59 4.45 1.72 6.39L3.12 29l6.78-1.78a12.72 12.72 0 006.11 1.55h.01c7.05 0 12.78-5.73 12.78-12.78S23.06 3.2 16.01 3.2zm0 23.4h-.01c-1.92 0-3.8-.52-5.45-1.51l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.55 10.55 0 01-1.61-5.6c0-5.88 4.79-10.66 10.67-10.66 2.85 0 5.52 1.11 7.53 3.13a10.59 10.59 0 013.12 7.53c0 5.88-4.78 10.66-10.66 10.66zm5.84-7.98c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.51-.16-.72.16-.21.32-.83 1.05-1.02 1.27-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37z"/>' +
      '</svg>' +
      '<span>WhatsApp</span>';
    document.body.appendChild(link);
  }

  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    var page = document.body.dataset.page;
    if (page) {
      var active = nav.querySelector('[data-nav="' + page + '"]');
      if (active) {
        active.classList.add('is-active');
        active.setAttribute('aria-current', 'page');
      }
    }

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  function initQuoteForm() {
    var quoteForm = document.getElementById('quote-form');
    if (!quoteForm) return;
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(quoteForm);
      var lines = [
        'Name: ' + data.get('name'),
        'Company: ' + data.get('company'),
        'Phone: ' + data.get('phone'),
        'Tyre category: ' + data.get('category'),
        'Quantity: ' + data.get('quantity'),
        '',
        'Message:',
        data.get('message')
      ];
      if (window.PBC_Quote) {
        window.PBC_Quote.requestCustomQuote(lines);
        return;
      }
      var body = encodeURIComponent(lines.join('\n'));
      window.open('https://wa.me/' + getWhatsAppNumber() + '?text=' + body, '_blank', 'noopener,noreferrer');
    });
  }

  function init() {
    injectWhatsAppButton();
    initNav();
    initQuoteForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

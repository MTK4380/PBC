(function () {
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

  var quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(quoteForm);
      var lines = [
        'Name: ' + data.get('name'),
        'Company: ' + data.get('company'),
        'Phone: ' + data.get('phone'),
        'Email: ' + data.get('email'),
        'Tyre category: ' + data.get('category'),
        'Quantity: ' + data.get('quantity'),
        '',
        'Message:',
        data.get('message')
      ];
      var subject = encodeURIComponent('Quote request — Pneumatic Business Consultants');
      var body = encodeURIComponent(lines.join('\n'));
      window.location.href = 'mailto:info@pneumaticconsultants.com?subject=' + subject + '&body=' + body;
    });
  }
})();

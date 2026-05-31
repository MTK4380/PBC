(function () {
  var DEFAULT_WHATSAPP = '923365163615';
  var DEFAULT_EMAIL = 'pbconsultants2017@gmail.com';

  function configContact() {
    return (window.PBC_CONFIG && window.PBC_CONFIG.contact) || {};
  }

  function whatsappNumber() {
    return String(configContact().whatsapp || DEFAULT_WHATSAPP).replace(/\D/g, '');
  }

  function emailAddress() {
    return configContact().email || DEFAULT_EMAIL;
  }

  function formatPrice(amount) {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  }

  function openWhatsApp(message) {
    var url = 'https://wa.me/' + whatsappNumber() + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function openEmail(subject, body) {
    window.location.href = 'mailto:' + emailAddress() + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  function sendQuote(subject, lines) {
    var body = lines.filter(function (line) { return line !== null && line !== undefined; }).join('\n');
    openWhatsApp(body);
    window.setTimeout(function () {
      openEmail(subject, body);
    }, 150);
  }

  function productLines(product, qty) {
    var quantity = Math.max(1, parseInt(qty, 10) || 1);
    var unit = product.price || 0;
    var total = unit * quantity;
    return [
      'Tyre quotation request',
      '',
      'Product: ' + (product.catalogName || product.design || 'Tyre'),
      'Size: ' + (product.size || ''),
      'Brand: ' + (product.brand || ''),
      'Category: ' + (product.catalogCategory || product.category || ''),
      'Ply: ' + (product.ply || ''),
      'Quantity: ' + quantity,
      'Unit price: ' + formatPrice(unit),
      'Estimated total: ' + formatPrice(total),
      '',
      'Please confirm availability, final quote, and delivery details.'
    ];
  }

  window.PBC_Quote = {
    formatPrice: formatPrice,
    sendQuote: sendQuote,
    requestProductQuote: function (product, qty) {
      sendQuote('Tyre quote request — ' + (product.catalogName || product.design || product.size || 'PBC'), productLines(product, qty));
    },
    requestCustomQuote: function (lines) {
      sendQuote('Quote request — Pneumatic Business Consultants', lines);
    }
  };
})();

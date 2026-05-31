(function () {
  var DEFAULT_WHATSAPP = '923365163615';

  function configContact() {
    return (window.PBC_CONFIG && window.PBC_CONFIG.contact) || {};
  }

  function whatsappNumber() {
    return String(configContact().whatsapp || DEFAULT_WHATSAPP).replace(/\D/g, '');
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

  function sendQuote(lines) {
    var body = lines.filter(function (line) { return line !== null && line !== undefined; }).join('\n');
    openWhatsApp(body);
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
      sendQuote(productLines(product, qty));
    },
    requestCustomQuote: function (lines) {
      sendQuote(lines);
    }
  };
})();

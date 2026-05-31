(function () {
  var DEFAULT_WHATSAPP = '923365163615';
  var STORAGE_KEY = 'pbc-quotation-items';

  function configContact() {
    return (window.PBC_CONFIG && window.PBC_CONFIG.contact) || {};
  }

  function whatsappNumber() {
    return String(configContact().whatsapp || DEFAULT_WHATSAPP).replace(/\D/g, '');
  }

  function readItems() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function writeItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateBadges();
    window.dispatchEvent(new CustomEvent('pbc-quotation-updated'));
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

  function productTitle(product) {
    return product.catalogName || product.design || product.size || 'Tyre';
  }

  function normalizeLine(product, qty) {
    var quantity = Math.max(1, parseInt(qty, 10) || 1);
    return {
      id: product.id,
      brand: product.brand || '',
      category: product.category || '',
      catalogCategory: product.catalogCategory || product.category || '',
      size: product.size || '',
      design: product.design || '',
      catalogName: product.catalogName || product.design || '',
      ply: product.ply || '',
      price: product.price || 0,
      vehicle: product.vehicle || '',
      image: product.image || '',
      qty: quantity
    };
  }

  function quotationLines(items) {
    var selected = items || readItems();
    var total = selected.reduce(function (sum, line) {
      return sum + (line.price || 0) * (line.qty || 1);
    }, 0);
    var lines = ['Tyre quotation request'];
    if (selected.length) {
      lines.push('', 'Selected tyres:');
      selected.forEach(function (line, index) {
        lines.push(
          (index + 1) + '. ' + productTitle(line) + ' ' + line.size +
          ' | ' + line.brand +
          ' | Ply ' + line.ply +
          ' | Qty ' + line.qty +
          ' | Unit ' + formatPrice(line.price) +
          ' | Total ' + formatPrice((line.price || 0) * (line.qty || 1))
        );
      });
      lines.push('', 'Estimated quotation total: ' + formatPrice(total));
    }
    lines.push('', 'Please confirm availability, final quotation, and delivery details.');
    return lines;
  }

  function updateBadges() {
    var count = readItems().reduce(function (sum, line) { return sum + (line.qty || 0); }, 0);
    document.querySelectorAll('.quote-badge').forEach(function (badge) {
      badge.textContent = count;
      badge.hidden = count === 0;
    });
  }

  window.PBC_Quote = {
    formatPrice: formatPrice,
    getItems: readItems,
    getCount: function () {
      return readItems().reduce(function (sum, line) { return sum + (line.qty || 0); }, 0);
    },
    getTotal: function () {
      return readItems().reduce(function (sum, line) { return sum + (line.price || 0) * (line.qty || 1); }, 0);
    },
    getMessage: function () {
      return quotationLines(readItems()).join('\n');
    },
    addProduct: function (product, qty) {
      var items = readItems();
      var line = normalizeLine(product, qty);
      var existing = items.find(function (item) { return item.id === line.id; });
      if (existing) {
        existing.qty += line.qty;
      } else {
        items.push(line);
      }
      writeItems(items);
      return line;
    },
    setQty: function (id, qty) {
      var next = Math.max(1, parseInt(qty, 10) || 1);
      var items = readItems().map(function (line) {
        if (line.id === id) line.qty = next;
        return line;
      });
      writeItems(items);
    },
    remove: function (id) {
      writeItems(readItems().filter(function (line) { return line.id !== id; }));
    },
    clear: function () {
      writeItems([]);
    },
    sendQuote: function (lines) {
      openWhatsApp((lines || quotationLines(readItems())).join('\n'));
    },
    sendSavedQuote: function (extraLines) {
      var lines = quotationLines(readItems());
      if (extraLines && extraLines.length) {
        lines.push('', 'Customer details:');
        extraLines.forEach(function (line) { lines.push(line); });
      }
      openWhatsApp(lines.join('\n'));
    },
    requestCustomQuote: function (lines) {
      openWhatsApp(lines.join('\n'));
    },
    quotationLines: quotationLines,
    updateBadges: updateBadges
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateBadges);
  } else {
    updateBadges();
  }
})();

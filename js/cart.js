(function () {
  var STORAGE_KEY = "pbc-cart";

  function read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function write(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateBadge();
    window.dispatchEvent(new CustomEvent("pbc-cart-updated"));
  }

  function formatPrice(amount) {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0
    }).format(amount);
  }

  window.PBC_Cart = {
    formatPrice: formatPrice,

    getItems: function () {
      return read();
    },

    getCount: function () {
      return read().reduce(function (sum, line) {
        return sum + line.qty;
      }, 0);
    },

    getSubtotal: function () {
      return read().reduce(function (sum, line) {
        return sum + line.qty * line.price;
      }, 0);
    },

    add: function (product, qty) {
      var amount = Math.max(1, parseInt(qty, 10) || 1);
      var items = read();
      var existing = items.find(function (line) {
        return line.id === product.id;
      });

      if (existing) {
        existing.qty += amount;
      } else {
        items.push({
          id: product.id,
          brand: product.brand,
          category: product.category,
          size: product.size,
          design: product.design,
          ply: product.ply,
          price: product.price,
          vehicle: product.vehicle,
          qty: amount
        });
      }
      write(items);
    },

    setQty: function (id, qty) {
      var items = read();
      var next = Math.max(1, parseInt(qty, 10) || 1);
      items.forEach(function (line) {
        if (line.id === id) line.qty = next;
      });
      write(items);
    },

    remove: function (id) {
      write(read().filter(function (line) {
        return line.id !== id;
      }));
    },

    clear: function () {
      write([]);
    }
  };

  function updateBadge() {
    var count = window.PBC_Cart.getCount();
    document.querySelectorAll(".cart-badge").forEach(function (badge) {
      badge.textContent = count;
      badge.hidden = count === 0;
    });
  }

  window.PBC_Cart.updateBadge = updateBadge;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateBadge);
  } else {
    updateBadge();
  }
})();

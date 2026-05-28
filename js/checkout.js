(function () {
  var summary = document.getElementById("checkout-summary");
  var form = document.getElementById("checkout-form");
  var paymentSection = document.getElementById("payment-methods");
  if (!summary || !form || !window.PBC_Cart) return;

  var cfg = window.PBC_CONFIG || {};

  function renderSummary() {
    var items = window.PBC_Cart.getItems();
    if (!items.length) {
      summary.innerHTML = "<p>Your cart is empty. <a href=\"shop.html\">Continue shopping</a></p>";
      form.hidden = true;
      return;
    }
    form.hidden = false;
    var rows = items.map(function (line) {
      return "<tr><td>" + line.qty + "× " + line.size + " " + line.design + "<br><small>" + line.brand + "</small></td><td>" + window.PBC_Cart.formatPrice(line.price * line.qty) + "</td></tr>";
    }).join("");
    var subtotal = window.PBC_Cart.getSubtotal();
    var delivery = 0;
    summary.innerHTML =
      "<table class=\"price-table checkout-table\"><thead><tr><th>Item</th><th>Total</th></tr></thead><tbody>" + rows + "</tbody></table>" +
      "<p class=\"checkout-totals\"><span>Subtotal</span><strong>" + window.PBC_Cart.formatPrice(subtotal) + "</strong></p>" +
      "<p class=\"checkout-totals\"><span>Delivery</span><strong>" + (delivery ? window.PBC_Cart.formatPrice(delivery) : "Calculated on confirm") + "</strong></p>" +
      "<p class=\"checkout-totals checkout-totals--grand\"><span>Total</span><strong>" + window.PBC_Cart.formatPrice(subtotal + delivery) + "</strong></p>";
  }

  function renderPaymentMethods() {
    if (!paymentSection) return;
    var html = "";
    if (cfg.codEnabled) {
      html += "<label class=\"payment-option\"><input type=\"radio\" name=\"payment\" value=\"cod\" checked> Cash on delivery (COD)</label>";
    }
    if (cfg.bankTransfer && cfg.bankTransfer.enabled) {
      html += "<label class=\"payment-option\"><input type=\"radio\" name=\"payment\" value=\"bank\"> Bank transfer</label>" +
        "<div class=\"payment-detail\" id=\"bank-details\"><p><strong>" + cfg.bankTransfer.bankName + "</strong><br>" + cfg.bankTransfer.accountTitle + "<br>Acc: " + cfg.bankTransfer.accountNumber + "<br>IBAN: " + cfg.bankTransfer.iban + "</p></div>";
    }
    if (cfg.jazzCash && cfg.jazzCash.enabled) {
      html += "<label class=\"payment-option\"><input type=\"radio\" name=\"payment\" value=\"jazzcash\"> JazzCash</label>" +
        "<div class=\"payment-detail\" id=\"jazzcash-details\" hidden><p>Send to <strong>" + cfg.jazzCash.merchantNumber + "</strong>. " + cfg.jazzCash.note + "</p></div>";
    }
    if (cfg.paypal && cfg.paypal.enabled && cfg.paypal.clientId && cfg.paypal.clientId.indexOf("YOUR_") !== 0) {
      html += "<label class=\"payment-option\"><input type=\"radio\" name=\"payment\" value=\"paypal\"> PayPal / Card</label><div id=\"paypal-button-container\"></div>";
    }
    paymentSection.innerHTML = html;

    paymentSection.querySelectorAll("input[name=\"payment\"]").forEach(function (radio) {
      radio.addEventListener("change", function () {
        var bank = document.getElementById("bank-details");
        var jazz = document.getElementById("jazzcash-details");
        if (bank) bank.hidden = radio.value !== "bank";
        if (jazz) jazz.hidden = radio.value !== "jazzcash";
      });
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var items = window.PBC_Cart.getItems();
    if (!items.length) return;

    var fd = new FormData(form);
    var payment = fd.get("payment") || "cod";
    var order = {
      customer: {
        name: fd.get("name"),
        phone: fd.get("phone"),
        email: fd.get("email"),
        address: fd.get("address"),
        city: fd.get("city")
      },
      payment: payment,
      transactionId: fd.get("transactionId") || "",
      items: items,
      subtotal: window.PBC_Cart.getSubtotal(),
      status: payment === "cod" ? "pending_cod" : "pending_payment"
    };

    if (window.PBC_Store) {
      window.PBC_Store.createOrder(order);
    }

    sessionStorage.setItem("pbc-last-order", JSON.stringify(order));
    window.PBC_Cart.clear();
    window.location.href = "order-confirmation.html";
  });

  renderSummary();
  renderPaymentMethods();
  window.addEventListener("pbc-cart-updated", renderSummary);
})();

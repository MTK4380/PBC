(function () {
  var root = document.getElementById("cart-root");
  if (!root || !window.PBC_Cart) return;

  function render() {
    var items = window.PBC_Cart.getItems();

    if (!items.length) {
      root.innerHTML =
        "<p class=\"cart-empty\">Your cart is empty. <a href=\"car-tyres.html\">Car tyres</a> · <a href=\"truck-tyres.html\">Truck tyres</a></p>";
      return;
    }

    var rows = items.map(function (line) {
      return (
        "<tr data-id=\"" + line.id + "\">" +
        "<td data-label=\"Tyre\"><strong>" + line.size + "</strong><br>" + line.design + "<br><span class=\"cart-line-meta\">" + line.brand + " · Ply " + line.ply + "</span></td>" +
        "<td data-label=\"Price\">" + window.PBC_Cart.formatPrice(line.price) + "</td>" +
        "<td data-label=\"Qty\"><input type=\"number\" class=\"cart-line-qty\" min=\"1\" value=\"" + line.qty + "\" data-id=\"" + line.id + "\" aria-label=\"Quantity\"></td>" +
        "<td data-label=\"Line total\">" + window.PBC_Cart.formatPrice(line.price * line.qty) + "</td>" +
        "<td data-label=\"\"><button type=\"button\" class=\"cart-remove\" data-id=\"" + line.id + "\" aria-label=\"Remove item\">Remove</button></td>" +
        "</tr>"
      );
    }).join("");

    root.innerHTML =
      "<div class=\"price-table-wrap\">" +
      "<table class=\"price-table cart-table\">" +
      "<thead><tr><th>Tyre</th><th>Unit price</th><th>Qty</th><th>Total</th><th></th></tr></thead>" +
      "<tbody>" + rows + "</tbody>" +
      "</table></div>" +
      "<div class=\"cart-summary\">" +
      "<p class=\"cart-subtotal\"><strong>Subtotal:</strong> " + window.PBC_Cart.formatPrice(window.PBC_Cart.getSubtotal()) + "</p>" +
      "<p class=\"cart-note\">Consumer list prices · Final invoice may vary for tender or bulk orders.</p>" +
      "<div class=\"page-actions\">" +
      "<button type=\"button\" class=\"btn btn--on-light btn-secondary\" id=\"cart-clear\">Clear cart</button>" +
      "<a href=\"shop.html\" class=\"btn btn--on-light btn-secondary\">Continue shopping</a>" +
      "<a href=\"checkout.html\" class=\"btn btn-primary\">Proceed to checkout</a>" +
      "<button type=\"button\" class=\"btn btn--on-light btn-secondary\" id=\"cart-checkout\">Email quote request</button>" +
      "</div></div>";

    root.querySelectorAll(".cart-line-qty").forEach(function (input) {
      input.addEventListener("change", function () {
        window.PBC_Cart.setQty(input.getAttribute("data-id"), input.value);
        render();
      });
    });

    root.querySelectorAll(".cart-remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.PBC_Cart.remove(btn.getAttribute("data-id"));
        render();
      });
    });

    var clearBtn = document.getElementById("cart-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        window.PBC_Cart.clear();
        render();
      });
    }

    var checkoutBtn = document.getElementById("cart-checkout");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", function () {
        var lines = items.map(function (line) {
          return "- " + line.qty + "x " + line.size + " " + line.design + " (" + line.brand + ", Ply " + line.ply + ") @ " + window.PBC_Cart.formatPrice(line.price);
        });
        lines.push("", "Subtotal: " + window.PBC_Cart.formatPrice(window.PBC_Cart.getSubtotal()));
        var body = encodeURIComponent("Cart items:\n\n" + lines.join("\n") + "\n\nPlease provide delivery details and contact information.");
        var subject = encodeURIComponent("Cart quote request — Pneumatic Business Consultants");
        window.location.href = "mailto:pbconsultants2017@gmail.com?subject=" + subject + "&body=" + body;
      });
    }
  }

  render();
  window.addEventListener("pbc-cart-updated", render);
})();

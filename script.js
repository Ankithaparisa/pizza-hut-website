document.addEventListener("DOMContentLoaded", () => {
  const cart = {};
  const cartItemsEl = document.querySelector(".cart-items");
  const totalItemsEl = document.getElementById("total-items");
  const totalPriceEl = document.getElementById("total-price");

  // Update cart display
  function updateCartDisplay() {
    cartItemsEl.innerHTML = "";
    let totalItems = 0;
    let totalPrice = 0;

    Object.values(cart).forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.textContent = `${item.name} x ${item.quantity} = Rs.${item.quantity * item.price}`;
      cartItemsEl.appendChild(itemEl);

      totalItems += item.quantity;
      totalPrice += item.quantity * item.price;
    });

    totalItemsEl.textContent = totalItems;
    totalPriceEl.textContent = totalPrice;
  }

  // Quantity buttons and add to cart
  document.querySelectorAll(".pizza-card").forEach(card => {
    const id = card.getAttribute("data-id");
    const name = card.querySelector("h3").textContent;
    const price = parseInt(card.getAttribute("data-price"));
    const quantityEl = card.querySelector(".quantity");

    let quantity = 0;

    card.querySelector(".increase").addEventListener("click", () => {
      quantity++;
      quantityEl.textContent = quantity;
    });

    card.querySelector(".decrease").addEventListener("click", () => {
      if (quantity > 0) {
        quantity--;
        quantityEl.textContent = quantity;
      }
    });

    card.querySelector(".add-to-cart").addEventListener("click", () => {
      if (quantity === 0) return;

      if (cart[id]) {
        cart[id].quantity += quantity;
      } else {
        cart[id] = { name, price, quantity };
      }

      quantity = 0;
      quantityEl.textContent = quantity;
      updateCartDisplay();
    });
  });
});

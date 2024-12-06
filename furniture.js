let cart = [];
let total = 0;

function addToCart(button) {
  const product = button.parentElement;
  const id = product.getAttribute("data-id");
  const name = product.getAttribute("data-name");
  const price = parseInt(product.getAttribute("data-price"));

  // Check if the item is already in the cart
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity if already in cart
  } else {
    // Add new item with quantity 1
    cart.push({ id, name, price, quantity: 1 });
  }
  updateCartCount();
  alert("Product added");
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

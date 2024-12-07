const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

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
function openCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // Clear the cart content
  total = 0;

  cart.forEach((item, index) => {
    // Create list item for each product
    const li = document.createElement("li");
    // Product details
    const name = document.createElement("div");
    name.textContent = `${item.name}`;

    const price = document.createElement("div");
    price.textContent = `Tk ${item.price.toFixed(2)}`;

    // Quantity controls
    const quantityContainer = document.createElement("div");
    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.onclick = () => updateQuantity(index, -1);

    const quantityDisplay = document.createElement("span");
    quantityDisplay.textContent = ` ${item.quantity} `;
    quantityDisplay.style.margin = "0 5px";

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.onclick = () => updateQuantity(index, 1);

    quantityContainer.appendChild(decreaseBtn);
    quantityContainer.appendChild(quantityDisplay);
    quantityContainer.appendChild(increaseBtn);

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.style.marginLeft = "10px";
    removeButton.style.backgroundColor = "red";
    removeButton.style.padding = "10px 20px"; // Adds padding (10px top/bottom, 20px left/right)
    removeButton.style.color = "white"; // Changes text color to white
    removeButton.style.border = "none"; // Changes text color to white
    removeButton.style.cursor = "pointer"; // Changes text color to white
    removeButton.onclick = () => removeFromCart(index);

    // Append to list item
    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(quantityContainer);
    li.appendChild(removeButton);
    cartItemsContainer.appendChild(li);

    // Update total price
    total += item.price * item.quantity;
  });

  // Update total price display
  document.getElementById("total-price").textContent = total.toFixed(2);

  // Show the modal
  document.getElementById("cart-modal").style.display = "flex";
}

function updateQuantity(index, change) {
  const item = cart[index];
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      // Remove item if quantity goes to 0
      cart.splice(index, 1);
    }
  }
  openCart(); // Re-render the cart
}

function removeFromCart(index) {
  cart.splice(index, 1); // Remove the item
  openCart(); // Re-render the cart
}
const closeCart = () => {
  // close the modal

  document.getElementById("cart-modal").style.display = "none";
};

const buyProduct = () => {
  const confirmPurchase = confirm("Do you want to proceed to checkout?");
  if (confirmPurchase) {
    window.location.href = "login.html";
  }
  openCart();
};

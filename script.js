document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".product button");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const menuToggler = document.getElementById("menu-toggler");
    const navbar = document.getElementById("navbar");
    const cartModal = document.getElementById("cart-modal");
    const cartLink = document.getElementById("cart-link");
    const closeCart = document.querySelector(".close-cart");
    let cart = [];
    let total = 0;

    // Toggle Navbar Menu
    menuToggler.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    // Open Cart Modal
    cartLink.addEventListener("click", (e) => {
        e.preventDefault();
        cartModal.style.display = "flex";
    });

    // Close Cart Modal
    closeCart.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    // Add to Cart Functionality
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const product = button.parentElement;
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);

            // Add item to cart
            cart.push({ name, price });
            total += price;

            // Update cart count and total
            cartCount.textContent = cart.length;
            cartTotal.textContent = total.toFixed(2);

            // Display cart items
            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = `${item.name} - Ksh${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(itemDiv);
        });
    }
});
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the response to the console
        if (data.success) {
            alert('Form submitted successfully!');
            window.location.href = 'https://yourwebsite.com/thank-you.html';
        } else {
            alert('Form submission failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Form submitted successfully.');
    });
});
// JavaScript for Cart Functionality

// Select DOM elements
const cartLink = document.getElementById('cart-link');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize cart as an empty array
let cart = [];

// Function to update the cart UI
function updateCartUI() {
    // Clear the cart items container
    cartItemsContainer.innerHTML = '';

    // Reset total price
    let total = 0;

    // Loop through the cart and display each item
    cart.forEach((item) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <span>${item.name} (Ksh${item.price})</span>
            <button class="remove-item" data-name="${item.name}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);

        // Add item price to total
        total += item.price;
    });

    // Update the total price
    cartTotal.textContent = total.toFixed(2);

    // Update the cart count
    cartCount.textContent = cart.length;
}

// Function to add an item to the cart
function addToCart(name, price) {
    // Check if the item already exists in the cart
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        // If it exists, do not add duplicates (optional: increase quantity)
        alert(`${name} is already in your cart.`);
    } else {
        // Add the new item to the cart
        cart.push({ name, price });
        alert(`${name} added to cart.`);
    }

    // Update the cart UI
    updateCartUI();
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.product button').forEach((button) => {
    button.addEventListener('click', (e) => {
        // Find the closest parent product element
        const product = e.target.closest('.product');

        // Retrieve the product name and price from data attributes
        const name = product.dataset.name;
        const price = parseFloat(product.dataset.price);

        // Ensure both name and price exist before proceeding
        if (name && price) {
            addToCart(name, price);
        } else {
            alert('Error: Product details are missing.');
        }
    });
});

// Event listener to open the cart modal
cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'block';
});

// Event listener to close the cart modal
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Event listener to remove items from the cart
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const name = e.target.dataset.name;

        // Remove the item from the cart
        cart = cart.filter((item) => item.name !== name);

        // Update the cart UI
        updateCartUI();
    }
});

// Event listener for checkout button
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        alert('Thank you for your purchase!');
        cart = []; // Clear the cart
        updateCartUI();
        cartModal.style.display = 'none'; // Close the modal
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const menuToggler = document.querySelector(".menu-toggler");
    const navbar = document.querySelector(".navbar");

    menuToggler.addEventListener("click", function () {
        navbar.classList.toggle("active"); // Toggle the 'active' class on the navbar
    });
});


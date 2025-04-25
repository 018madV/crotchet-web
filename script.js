document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const buttons = document.querySelectorAll(".product button");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const menuToggler = document.getElementById("menu-toggler");
    const navbar = document.getElementById("navbar");
    const cartModal = document.getElementById("cart-modal");
    const cartLink = document.getElementById("cart-link");
    const closeCart = document.querySelector(".close-cart");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Cart State
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

            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                alert(`${name} is already in your cart.`);
                return;
            }

            // Add item to cart
            cart.push({ name, price });
            total += price;

            // Update UI
            updateCartUI();
            alert(`${name} added to cart.`);
        });
    });

    // Update Cart Display
    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        total = 0;

        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");

            // Create remove button
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-item");
            removeButton.dataset.name = item.name;

            // Append item details and remove button
            itemDiv.innerHTML = `${item.name} - Ksh${item.price.toFixed(2)}`;
            itemDiv.appendChild(removeButton);
            cartItemsContainer.appendChild(itemDiv);

            // Update total
            total += item.price;
        });

        // Update total and count
        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
    }

    // Remove Item from Cart
    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            const name = e.target.dataset.name;
            cart = cart.filter(item => item.name !== name);
            updateCartUI();
        }
    });

    // Checkout Button
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
        } else {
            alert("Thank you for your purchase!");
            cart = [];
            updateCartUI();
            cartModal.style.display = "none";
        }
    });

    // Form Submission Handling
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Form submitted successfully!");
                    window.location.href = "https://yourwebsite.com/thank-you.html";
                } else {
                    alert("Form submission failed. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    });
});

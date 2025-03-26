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

    // Toggle Navbar Menu and Icon
    menuToggler.addEventListener("click", () => {
        navbar.classList.toggle("active");

        // Toggle between hamburger icon and close icon
        const icon = menuToggler.querySelector("i");
        if (icon.classList.contains("fa-bars")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times"); // Change to "X" icon
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars"); // Change back to hamburger icon
        }
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

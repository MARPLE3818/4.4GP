/*
    Author: Marvionna Pledger-Bowens
    Date: 8/23/2026
    Purpose: 4.4GP
*/

/* =========================================
     GLOBAL VARIABLES
========================================= */

// STEP 2

// Plant Data
const plants = [

    {
        id: 1,
        name: "Monstera Deliciosa",
        description: "Large tropical leaves perfect for bright interiors.",
        price: 34.99,
        image: "images/monsteradeliciosa.png",
        alt: "Monstera Deliciosa",
        sun: "☀️"
    },

    {
        id: 2,
        name: "Snake Plant",
        description: "Low-maintenance plant with upright leaves.",
        price: 14.99,
        image: "images/snakeplant.png",
        alt: "Snake Plant",
        sun: "🌙"
    },

    {
        id: 3,
        name: "Bird of Paradise",
        description: "Bold tropical foliage with dramatic appearance.",
        price: 49.99,
        image: "images/paradiseplant.png",
        alt: "Paradise Plant",
        sun: "🌤"
    },

    {
        id: 4,
        name: "Peace Lily",
        description: "Elegant indoor plant with beautiful white blooms.",
        price: 29.99,
        image: "images/peacelily.png",
        alt: "Peace Lily",
        sun: "🌤"
    },

    {
        id: 5,
        name: "Sunflower",
        description: "Bright as a sunday morning. Beautifully made.",
        price: 43.99,
        image: "images/sunflower.png",
        alt: "Beautiful Sunflower",
        sun: "🌤"
    },

    {
        id: 6,
        name: "Red Rose",
        description: "Deep Red with the passion for love.",
        price: 32.50,
        image: "images/red-rose.png",
        alt: "Ruby Rose",
        sun: "🌤"
    },

    {
        id: 7,
        name: "Elephant Plant",
        description: "Beautiful decor for your outdoors space, with wide leaves that desire a daily mist.",
        price: 50.00,
        image: "images/elephant.png",
        alt: "Wide Leaf Elephant Plant",
        sun: "🌤"
    }
];

// DOM References

// STEP 3
const plantGrid = document.getElementById("plant-grid");
const cartPanel = document.getElementById("cart-panel");
const cartToggle = document.getElementById("cart-toggle");
const collapseCart = document.getElementById("collapse-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

/* =========================================
   SESSION STORAGE
========================================= */
// Retrieve cart data from session storage
// If no cart exists yet, create an empty array instead.

// STEP 4
let cart = JSON.parse(sessionStorage.getItem("plantCart")) || [];

/* =========================================
   RENDER PLANTS
========================================= */

// STEP 5
function renderPlants() {
   
    plantGrid.innerHTML = "";

   
    plants.forEach((plant) => {
        
        
        const card = document.createElement("article");
        card.classList.add("plant-card");

        card.innerHTML = `
            <div class="image-container">
                <img src="${plant.image}" alt="${plant.alt}"/>

                <div class="sun-level" aria-label="Sunlight level">
                    ${plant.sun}
                </div>
            </div>

            <div class="card-content">
                <h3>${plant.name}</h3>
                <p>${plant.description}</p>
                <p class="price">$${plant.price.toFixed(2)}</p>

                <button class="add-btn" data-id="${plant.id}">
                    Add to Cart
                </button>
            </div>
        `;

        
        plantGrid.appendChild(card);
    });
}

/* =========================================
   SAVE CART
========================================= */

// STEP 6
function saveCart() {

    sessionStorage.setItem("plantCart", JSON.stringify(cart));
}

/* =========================================
   ADD TO CART
========================================= */

// STEP 7
function addToCart(id) {
    
    const plant = plants.find((item) => item.id === id);

    
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        
        existingItem.quantity++;
    } else {
        
        cart.push({...plant,quantity: 1});
    }


    saveCart();
    renderCart();
    animateCartButton();
}

/* =========================================
  UPDATE QUANTITY
========================================= */

// STEP 8
function updateQuantity(id, change) {
  
    const item = cart.find((product) => product.id === id);

    
    if (!item) return;

    item.quantity += change;

    
    if (item.quantity <= 0) {
        cart = cart.filter((product) => product.id !== id);
    }

    
    saveCart();
    renderCart();
}

/* =========================================
   RENDER CART
========================================= */

// STEP 9
function renderCart() {
  
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total: $0.00";
        return;
    }

   
    cartItems.innerHTML = "";
    let total = 0;

   
    cart.forEach((item) => {

        
        total += item.price * item.quantity;

       
        const cartItem = document.createElement("article");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <h3>${item.name}</h3>

            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>

            <div class="quantity-controls">
                <button class="quantity-btn decrease-btn" data-id="${item.id}">
                    -
                </button>

                <span>${item.quantity}</span>

                <button class="quantity-btn increase-btn" data-id="${item.id}">
                    +
                </button>
            </div>
        `;

     
        cartItems.appendChild(cartItem);
    });

   
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

/* =========================================
   TOGGLE CART
========================================= */
function toggleCart() {

   
    cartPanel.classList.toggle("open");

    if (cartPanel.classList.contains("open")) {
        collapseCart.innerHTML = "❯";
    } else {
        collapseCart.innerHTML = "❮";
    }
}


cartToggle.addEventListener("click", () => { toggleCart(); });


collapseCart.addEventListener("click", () => { toggleCart(); });


/* =========================================
   CLICK EVENTS
========================================= */

// STEP 10
document.addEventListener("click", (event) => {

   
    if (event.target.classList.contains("add-btn")) {
        const id = Number(event.target.dataset.id);
        addToCart(id);
    }

    // 
    if (event.target.classList.contains("increase-btn")) {
        const id = Number(event.target.dataset.id);
        updateQuantity(id, 1);
    }

    //
    if (event.target.classList.contains("decrease-btn")) {
        const id = Number(event.target.dataset.id);
        updateQuantity(id, -1);
    }
});

/* =========================================
   CHECKOUT
========================================= */

// STEP 11
checkoutBtn.addEventListener("click", () => {
    
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
    });

    alert(`Confirm Purchase\n\nTotal: $${total.toFixed(2)}`);
});

/* =========================================
   CART BUTTON ANIMATION
========================================= */
function animateCartButton() {
    cartToggle.classList.add("bounce");
    setTimeout(() => { cartToggle.classList.remove("bounce"); }, 500);
}

/* =========================================
   INITIALIZE
========================================= */

// Set initial arrow direction and load product & cart data
collapseCart.innerHTML = "❮";
renderPlants();
renderCart();
/* clicking search icon*/
let search = document.querySelector('.search-box');
document.querySelector('#search-icon').onclick =()=>{
    search.classList.toggle('active');
    navbar.classList.remove('active')
}

/* Hot Pizza Meals*/
const buttons = document.querySelectorAll('.price-order button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    alert('Your order has been added to the cart!');
  });
});

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  navbar.classList.toggle('active');
  search.classList.remove('active')
};

window.onscroll =()=>{
  navbar.classList.remove('active');
  search.classList.remove('active')
}

const cart = [];
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const cartIcon = document.getElementById('cart-icon');
const closeCartButton = document.getElementById('close-cart');

// Add to Cart Functionality for Pizza Meals and Products
function addToCart(name, price) {
    // Check if item already exists in the cart
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        // If item exists, increase quantity
        existingItem.quantity += 1;
    } else {
        // If item is new, add to cart
        cart.push({ name, price, quantity: 1 });
    }

    // Update cart badge and show alert
    updateCartBadge();
    alert(`${name} added to cart!`);
}

// Update Product Section Add to Cart Buttons
document.querySelectorAll('.products .box').forEach(box => {
    const name = box.querySelector('h3').textContent;
    const priceText = box.querySelector('.content span').textContent;
    const price = parseFloat(priceText.replace('rs.', '').replace('/=', ''));

    const addToCartButton = document.createElement('a');
    addToCartButton.href = '#';
    addToCartButton.textContent = 'Add to cart';
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.addEventListener('click', (e) => {
        e.preventDefault();
        addToCart(name, price);
    });

    box.querySelector('.content').appendChild(addToCartButton);
});

// Update Pizza Meals Section Buttons
document.querySelectorAll('.pizza-meals .price-order button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.pizza-card');
        const name = card.querySelector('h3').textContent;
        const priceText = card.querySelector('.price-order span').textContent;
        const price = parseFloat(priceText.replace('$', ''));
        
        addToCart(name, price);
    });
});

// Update Cart Badge
function updateCartBadge() {
    const cartBadge = document.createElement('span');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Remove existing badge if present
    const existingBadge = cartIcon.querySelector('span');
    if (existingBadge) existingBadge.remove();

    // Add updated badge
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            background: red;
            color: white;
            border-radius: 50%;
            padding: 2px 5px;
            font-size: 12px;
        `;
        cartIcon.appendChild(cartBadge);
    }
}

// View Cart Functionality
cartIcon.addEventListener('click', () => {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - Rs. ${item.price * item.quantity}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = `Total: Rs. ${total.toFixed(2)}`;
    cartModal.classList.remove('hidden');
});

// Close Cart Modal
closeCartButton.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});
// Checkout Functionality
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = checkoutModal.querySelector('.close-checkout');
const checkoutForm = document.getElementById('checkout-form');

checkoutBtn.addEventListener('click', () => {
    checkoutModal.classList.remove('hidden');
});

closeCheckoutBtn.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');
});

checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        paymentMethod: document.getElementById('payment-method').value,
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }))
    };

    // Send form data to server (PHP or AJAX)
    sendOrderToServer(formData);

    // Clear cart and close modal
    cart.length = 0;
    updateCartBadge();
    checkoutModal.classList.add('hidden');
});

function sendOrderToServer(formData) {
    // Implement server-side logic to receive and process the order
    // This can be done using PHP or AJAX
    console.log('Sending order to server:', formData);
    // Add your server-side code here
}
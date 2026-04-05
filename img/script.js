document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'progain_cart_items';
  let cart = [];

  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartItemsList = document.getElementById('cartItems');
  const cartTotalDisplay = document.getElementById('cartTotal');
  const cartBadge = document.querySelector('.count');
  const addToCartButtons = document.querySelectorAll('.add-btn');


  function updateCartUI() {
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
      cartItemsList.innerHTML = '<li class="cart-item empty">Your cart is empty.</li>';
    } else {
      cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="item-details">
            <span class="name">${item.name}</span>
            <span class="price">₹${item.price.toFixed(2)}</span>
            <div class="item-actions">
              <div class="qty-controls">
                <button class="qty-btn" data-action="minus" data-id="${item.id}">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
              </div>
              <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
          </div>
        `;
        cartItemsList.appendChild(li);
      });
    }

    const totalCash = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartTotalDisplay.textContent = `₹${totalCash.toFixed(2)}`;
    cartBadge.textContent = totalQty;
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function loadCart() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        cart = parsed.items || [];
      } catch (err) {
        cart = [];
      }
    }
  }


  function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.remove('hidden');
  }

  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.add('hidden');
  }


  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const name = card.querySelector('h3').textContent;
      const priceStr = card.querySelector('.price').textContent;
      const img = card.querySelector('.product-img img').src;
      const price = parseFloat(priceStr.replace(/[^\d.]/g, ''));

      const existingItem = cart.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: Date.now() + Math.random().toString(16).slice(2),
          name: name,
          price: price,
          image: img,
          quantity: 1
        });
      }

      saveCart();
      updateCartUI();
      openCart();

      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> ADDED';
      btn.style.backgroundColor = '#28a745';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = ''; 
        btn.disabled = false;
      }, 1000);
    });
  });

  cartItemsList.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    const item = cart.find(i => i.id === id);

    if (e.target.dataset.action === 'plus') {
      item.quantity++;
    } else if (e.target.dataset.action === 'minus') {
      if (item.quantity > 1) item.quantity--;
    } else if (e.target.classList.contains('remove-item')) {
      cart = cart.filter(i => i.id !== id);
    }

    saveCart();
    updateCartUI();
  });

  document.getElementById('cartIcon').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  loadCart();
  updateCartUI();
});
function togglePoemsMenu() {
    document.querySelector(".poems-combo").classList.toggle("open");
}

document.addEventListener("click", function(event) {
    const menu = document.querySelector(".poems-combo");

    if (!menu.contains(event.target)) {
        menu.classList.remove("open");
    }
});


document.addEventListener("DOMContentLoaded", () => {

    // عناصر سبد خرید
    const cartModal = document.getElementById("cartModal");
    const cartLink = document.getElementById("cartLink");
    const closeCart = document.getElementById("closeCart");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");
    const checkoutBtn = document.getElementById("checkoutBtn");

    // دریافت سبد خرید ذخیره‌شده
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    // ذخیره سبد خرید
    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    // نمایش تعداد محصولات
    function updateCartCount() {
        if (!cartCount) return;

        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count.toLocaleString("fa-IR");
    }

    // نمایش محصولات سبد خرید
    function renderCart() {
        if (!cartItems || !cartTotal) return;

        cartItems.innerHTML = "";

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <p class="empty-cart">
                    سبد خرید شما خالی است.
                </p>
            `;
        }

        let total = 0;

        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";

            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <h3>${escapeHTML(item.name)}</h3>
                    <p>
                        ${item.price.toLocaleString("fa-IR")} تومان
                    </p>
                    <p>
                        تعداد: ${item.quantity.toLocaleString("fa-IR")}
                    </p>
                </div>

                <button
                    class="remove-item"
                    data-id="${escapeHTML(item.id)}"
                    type="button">
                    حذف
                </button>
            `;

            cartItems.appendChild(itemElement);
        });

        cartTotal.textContent =
            total.toLocaleString("fa-IR") + " تومان";

        updateCartCount();
    }

    // جلوگیری از ورود HTML ناخواسته
    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[char]);
    }

    // باز کردن سبد خرید
    if (cartLink && cartModal) {
        cartLink.addEventListener("click", (event) => {
            event.preventDefault();
            cartModal.classList.add("active");
            renderCart();
        });
    }

    // بستن سبد خرید
    if (closeCart && cartModal) {
        closeCart.addEventListener("click", () => {
            cartModal.classList.remove("active");
        });
    }

    // بستن با کلیک روی فضای بیرونی
    if (cartModal) {
        cartModal.addEventListener("click", (event) => {
            if (event.target === cartModal) {
                cartModal.classList.remove("active");
            }
        });
    }

    // افزودن محصول به سبد خرید
    document.querySelectorAll(".add-to-cart").forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            if (!id || !name || !Number.isFinite(price) || price < 0) {
                return;
            }

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            saveCart();
            renderCart();

        });

    });

    // حذف محصول
    if (cartItems) {
        cartItems.addEventListener("click", (event) => {

            const button = event.target.closest(".remove-item");

            if (!button) return;

            const id = button.dataset.id;

            cart = cart.filter(item => item.id !== id);

            saveCart();
            renderCart();

        });
    }

    // دکمه تکمیل سفارش
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {

            if (cart.length === 0) {
                alert("سبد خرید شما خالی است.");
                return;
            }

            alert("مرحله تکمیل اطلاعات سفارش هنوز پیاده‌سازی نشده است.");

        });
    }

    // نمایش اولیه
    renderCart();

});

const hamburguer = document.querySelector(".hamburguer-div");
const hamburguerSpan = document.querySelector(".hamburguer-div span");
const menu = document.querySelector(".menu");

if (hamburguer) {
    hamburguer.addEventListener("click", () => {
        if (menu) menu.classList.toggle("show");
        if (hamburguerSpan) {
            hamburguerSpan.textContent =
                hamburguerSpan.textContent !== "X" ? "X" : "☰";
        }
    });
}

const menuBtns = document.querySelectorAll(".menu-btn");
if (menuBtns.length) {
    menuBtns.forEach((item) => {
        item.addEventListener("click", (e) => {
            menuBtns.forEach((btn) => btn.classList.remove("active"));
            e.currentTarget.classList.add("active");
        });
    });
}

function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.map((item) => ({
        name: item.name || "Produto",
        price: Number(item.price) || 0,
        image: item.image || "",
        qty: Number(item.qty) || 1,
    }));
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cartSpan = document.querySelector("#cartSpan");
    const cart = getCart();
    if (cartSpan) {
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        cartSpan.textContent = totalQty;
    }
}

document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
        const article = btn.closest(".article-menu");
        if (!article) return;

        const nameEl = article.querySelector(".product-name");
        const priceEl = article.querySelector(".price");
        const imgEl = article.querySelector("img");

        const name = nameEl ? nameEl.textContent.trim() : "Produto";
        const priceText = priceEl ? priceEl.textContent : "";
        const match = priceText.match(/[\d.,]+/);
        let priceNum = 0;

        if (match) priceNum = parseFloat(match[0].replace(",", "."));
        if (isNaN(priceNum)) return console.error("Invalid price:", priceText);

        const image = imgEl ? imgEl.src : "";

        let cart = getCart();
        const existing = cart.find((item) => item.name === name);
        if (existing) existing.qty += 1;
        else cart.push({ name, price: priceNum, image, qty: 1 });

        saveCart(cart);
        updateCartCount();

        const modal = document.getElementById("cart-modal");
        if (modal) modal.style.display = "flex";
    });
});

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "continue-btn") {
        const modal = document.getElementById("cart-modal");
        if (modal) modal.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    const deliveryFee = 10;

    if (!cartItemsContainer || !subtotalEl || !totalEl) return;

    let cart = getCart();
    saveCart(cart);

    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (!cart.length) {
            cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
            subtotalEl.textContent = "$ 0.00";
            totalEl.textContent = "$ 0.00";
            return;
        }

        let subtotal = 0;

        cart.forEach((item, index) => {
            const price = Number(item.price);
            const qty = Number(item.qty);
            subtotal += price * qty;

            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                <div class="item-details">
                    <h2>${item.name}</h2>
                    <span class="price">$ ${price.toFixed(2)}</span>
                </div>
                <div class="item-qty">
                    <button class="minus">-</button>
                    <span>${qty}</span>
                    <button class="plus">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(div);

            div.querySelector(".plus")?.addEventListener("click", () => {
                cart[index].qty += 1;
                saveCart(cart);
                renderCart();
                updateCartCount();
            });

            div.querySelector(".minus")?.addEventListener("click", () => {
                if (cart[index].qty > 1) cart[index].qty -= 1;
                else cart.splice(index, 1);
                saveCart(cart);
                renderCart();
                updateCartCount();
            });
        });

        subtotalEl.textContent = `$ ${subtotal.toFixed(2)}`;
        totalEl.textContent = `$ ${(subtotal + deliveryFee).toFixed(2)}`;
    }

    renderCart();
});

// --- BLOG SYSTEM ---

const blogArticle = document.querySelectorAll(".blog-article");
const toast = document.getElementById("toast");

blogArticle.forEach((item) => {
    item.addEventListener("click", () => {
        toast.classList.add("show");
    });
});

const toastButton = document.querySelector(".close-btn");

toastButton.addEventListener("click", () => {
    toast.classList.remove("show");
});

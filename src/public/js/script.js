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
        let cart = getCart();
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

    const clearCartBtn = document.querySelector(".clear-cart");

    clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");

        renderCart();
        updateCartCount();
    });
});

if (document.querySelector(".checkout-btn")) {
    document
        .querySelector(".checkout-btn")
        .addEventListener("click", async () => {
            const total = document
                .querySelector("#total")
                .textContent.replace("$", "")
                .trim();
            const totalNum = Number(total);

            const res = await fetch("/checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    totalNum,
                    orderId: `pedido_${Date.now()}`,
                }),
            });

            const data = await res.json();

            window.location.href = data.init_point;
        });
}

// --- BLOG SYSTEM ---

const blogArticle = document.querySelectorAll(".blog-article");
const toast = document.getElementById("toast");

blogArticle.forEach((item) => {
    item.addEventListener("click", () => {
        toast.classList.add("show");
    });
});

const toastButton = document.querySelector(".close-btn");

if (toastButton) {
    toastButton.addEventListener("click", () => {
        toast.classList.remove("show");
    });
}

const toastMessage = document.querySelector("#toast-message");

if (toastMessage) {
    toastMessage.innerHTML = `

                <h1 class='toast-title'>
                    The secret tips & tricks to prepare a perfect burger & pizza
                    for our customers
                </h1>

                <div class='img-div'>
                <img src='assets/images/ramen-big.png'>
                </div>

                <div>
                <h2>What do you need to prepare a home-made burger?</h2>

                Creating the perfect burger and pizza is an art, combining
                ingredients, techniques, and passion to craft dishes that truly
                delight the palate. Today, we'll unveil some closely guarded
                secrets and insider tips for mastering these beloved staples of
                the culinary world.
                <ul>
                    <li>
                        Quality Beef: The heart of a perfect burger is top-notch
                        beef. Opt for fresh, high-quality ground beef with a fat
                        content of about 20% for the juiciest, most flavorful
                        results.
                    </li>
                    <li>
                        Seasoning: Simplicity is key here. A generous pinch of
                        salt and black pepper just before cooking will enhance
                        the beef's natural flavors without overshadowing them.
                    </li>
                    <li>
                        Don’t Overwork the Meat: When forming your patties, be
                        gentle. Overworking the meat can lead to dense, tough
                        burgers. You want a patty that's firm enough to hold
                        together, but not compressed.
                    </li>
                    <li>
                        Cooking: High heat is crucial. Whether you're grilling
                        or pan-searing, make sure your cooking surface is hot
                        enough to form a nice crust on the patty, sealing in
                        those delicious juices.
                    </li>
                    <li>
                        Resting: Allow your cooked burgers to rest for a few
                        minutes before serving. This lets the juices
                        redistribute throughout the patty, ensuring a moist and
                        flavorful bite.
                    </li>
                </ul>
                </div>

                <div>
                <h2>What are the right ingredients to make it delicious?</h2>

                <p>
                    Creating the perfect burger and pizza is an art, combining
                    ingredients, techniques, and passion to craft dishes that
                    truly delight the palate. Today, we'll unveil some closely
                    guarded secrets and insider tips for mastering these beloved
                    staples of the culinary world.
                </p>
                <ul>
                    <li>
                        Quality Beef: The heart of a perfect burger is top-notch
                        beef. Opt for fresh, high-quality ground beef with a fat
                        content of about 20% for the juiciest, most flavorful
                        results.
                    </li>
                    <li>
                        Seasoning: Simplicity is key here. A generous pinch of
                        salt and black pepper just before cooking will enhance
                        the beef's natural flavors without overshadowing them.
                    </li>
                    <li>
                        Don’t Overwork the Meat: When forming your patties, be
                        gentle. Overworking the meat can lead to dense, tough
                        burgers. You want a patty that's firm enough to hold
                        together, but not compressed.
                    </li>
                    <li>
                        Cooking: High heat is crucial. Whether you're grilling
                        or pan-searing, make sure your cooking surface is hot
                        enough to form a nice crust on the patty, sealing in
                        those delicious juices.
                    </li>
                    <li>
                        Resting: Allow your cooked burgers to rest for a few
                        minutes before serving. This lets the juices
                        redistribute throughout the patty, ensuring a moist and
                        flavorful bite.
                    </li>
                </ul>
                </div>


            
            <div>
                <h2>What are the right ingredients to make it delicious?</h2>

                <p>
                    Proin faucibus nec mauris a sodales, sed elementum mi
                    tincidunt. Sed eget viverra egestas nisi in consequat. Fusce
                    sodales augue a accumsa Cras sollicitudin, le ligula,
                    porttitor eu, consequat vitae, eleifend ac, enim. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit lobortis
                    arcu enim urna adipiscing praesent velit viverra sit semper
                    lorem eu cursus ve of all hendrerit elementum morbi
                    curabitur etiam nibh justo, lorem aliquet donec sed sit mi
                    dignissim at ante massa mattis magna sit amet purus gravida
                    quis blandit turpis.
                </p>
                </div>
                `;
}

const WHATSAPP = "593985611881";

let cart = JSON.parse(
    localStorage.getItem("chifaAngelitoCart") || "[]"
);

function money(value) {
    return "$" + Number(value).toFixed(2);
}

function saveCart() {
    localStorage.setItem(
        "chifaAngelitoCart",
        JSON.stringify(cart)
    );

    renderCart();
}

function addToCart(id, name, select) {

    const option = select.options[select.selectedIndex];

    const variant = option.value;
    const price = Number(option.dataset.price);

    const existing = cart.find(
        item => item.id === id && item.variant === variant
    );

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            id: id,
            name: name,
            variant: variant,
            price: price,
            quantity: 1
        });
    }

    saveCart();

    openCart();

    showToast("¡Agregado al carrito!");
}

function changeQty(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
}

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
}

function getTotal() {

    return cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );
}

function renderCart() {

    const container = document.getElementById("cart-items");
    const empty = document.getElementById("empty-cart");

    const count = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    document.getElementById("cart-count").textContent = count;

    document.getElementById("cart-total").textContent =
        money(getTotal());

    if (cart.length === 0) {

        container.innerHTML = "";

        empty.style.display = "block";

        return;
    }

    empty.style.display = "none";

    container.innerHTML = cart.map((item, index) => `

        <div class="cart-item">

            <div class="item-top">

                <div>

                    <div class="item-name">
                        ${escapeHtml(item.name)}
                    </div>

                    <div class="item-variant">
                        ${escapeHtml(item.variant)}
                        ·
                        ${money(item.price)}
                    </div>

                </div>

                <strong>
                    ${money(item.price * item.quantity)}
                </strong>

            </div>

            <div class="item-controls">

                <div class="qty-controls">

                    <button onclick="changeQty(${index}, -1)">
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button onclick="changeQty(${index}, 1)">
                        +
                    </button>

                </div>

                <button
                    class="remove"
                    onclick="removeItem(${index})">
                    Eliminar
                </button>

            </div>

        </div>

    `).join("");
}


function sendWhatsApp() {

    if (cart.length === 0) {

        showToast("Agrega al menos un producto.");

        return;
    }

    // MENSAJE PARA WHATSAPP

    let message =
        "🍜 *PEDIDO - CHIFA ANGELITO*\n\n";

    cart.forEach(item => {

        message +=
            `🍜 ${item.quantity}x ${item.name}\n` +
            `   Tamaño: ${item.variant}\n` +
            `   Precio: ${money(item.price * item.quantity)}\n\n`;

    });

    message +=
        `💰 *TOTAL: ${money(getTotal())}*\n\n`;

    message +=
        "Hola, quisiera realizar este pedido. " +
        "¿Me ayudan a coordinarlo?";


    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}


function openCart() {

    document
        .getElementById("cart")
        .classList.add("open");
}


function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("open");
}


function showToast(text) {

    const toast =
        document.getElementById("toast");

    toast.textContent = text;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);
}


function escapeHtml(text) {

    return text.replace(
        /[&<>"']/g,
        character => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"

        }[character])
    );
}


document.addEventListener(
    "DOMContentLoaded",
    renderCart
);
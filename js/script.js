let products = [
    {
        id: 1,
        name: "Iphone 15 Pro Max",
        image: "img/iphone-15-pro-max.jpg",
        desription: "Хороший телефон для роботи та ігор",
        type: "phone",
        price: 40899
    },
    {
        id: 2,
        name: 'Ноутбук Apple Macbook Pro A1990',
        image: 'img/laptop-apple-macbook-pro-a1990.webp',
        desription: 'Продуктивний ноутбук для професіоналів та творчих людей',
        type: 'laptop',
        price: 22899
    },
    {
        id: 3,
        name: 'Мишка Logitech G Pro X Superlight 2 Lightspeed',
        image: 'img/logitech-g-pro-x-superlight.png',
        desription: 'Комфортна й легка ігрова мишка з високою точністю',
        type: 'accessories',
        price: 4999
    },
    {
        id: 4,
        name: 'Навушники Logitech G PRO X Gaming Headset Black',
        image: 'img/Logitech-G-PRO-X-Gaming-Headset-Black.png',
        desription: 'Розкішні ігрові навушники з кришталево чистим звуком',
        type: 'accessories',
        price: 4445
    },
    {
        id: 5,
        name: 'Клавіатура HATOR Gravity X TKL White',
        image: 'img/HATOR Gravity X TKL White.png',
        desription: 'Механічна ігрова клавіатура з RGB підсвіткою',
        type: 'accessories',
        price: 2099
    },
    {
        id: 6,
        name: 'Смартфон Samsung Galaxy S25 FE',
        image: 'img/Samsung Galaxy S25 FE.png',
        desription: 'Потужний смартфон з відмінною камерою та дисплеєм',
        type: 'phone',
        price: 29699
    },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

let productsContainer = document.querySelector(".products-div")
let btnGroup = document.querySelector(".btn-group")

function renderProducts(items) {
    productsContainer.innerHTML = ""
    if (items.length == 0) {
        productsContainer.innerHTML = '<p>Товарів немає</p>'
        return;
    }
    items.forEach(function (item) {
        let productHTML = `
    <article class="product" data-id="${item.id}">
        <img src="${item.image}" alt="Тут має бути картинка..." class="product-img">
        <h3 class="product-title">${item.name}</h3>
        <p class="product-description">${item.desription}</p>
        <p class="product-price"><strong>${item.price} грн</strong></p>
        <button type="button" class="btn btn-primary add-to-cart-btn">До кошику</button>
    </article>
    `
    productsContainer.innerHTML += productHTML
    })

}

function applyFilters(categoryType){
    if (categoryType == "all") {
        renderProducts(products)
    } else {
        let filteredProducts = products.filter(product => product.type == categoryType)
        renderProducts(filteredProducts);
    }
}

function addToCart(productId) {
    let cartProduct = cart.find(p => p.id == productId);
    if (cartProduct) {
        cartProduct.quantity += 1;
    } else {
        let product = products.find(p => p.id == productId);
        cart.push({...product, quantity: 1});
    }        
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Товар додано:" + product.name)
}

function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = ' ' + totalQuantity;
}

let productsMap = {
    "Всі": "all",
    "Телефони": "phone",
    "Комп'ютери": "laptop",
    "Аксесуари": "accessories"
}

function setupFilterButtons() {
    for (let button of btnGroup.children) {
        button.addEventListener("click", function(){
            let category = productsMap[button.innerHTML]
            applyFilters(category)
        })
    }
}

productsContainer.addEventListener("click", function(event){
    if (event.target.classList.contains('add-to-cart-btn')) {
        let productCart = event.target.closest(".product");
        let productId = parseInt(productCart.dataset.id)
        addToCart(productId)
    }
})
renderProducts(products)
setupFilterButtons()
updateCartCount()

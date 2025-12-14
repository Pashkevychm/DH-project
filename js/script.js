let products = [
    {
        id: 1,
        name: "Iphone",
        image: "img",
        desription: "Опис",
        type: "phone",
        price: 1000
    },
    {
        id: 2,
        name: 'Ноутбук Apple Macbook Pro A1990',
        image: 'img/laptop-apple-macbook-pro-a1990.webp',
        desription: 'Опис',
        type: 'laptop',
        price: 22899
    },
    {
        id: 3,
        name: 'Ноутбук Apple Macbook Pro A1990',
        image: 'img/laptop-apple-macbook-pro-a1990.webp',
        desription: 'Опис',
        type: 'laptop',
        price: 22899
    },
    {
        id: 4,
        name: 'Ноутбук Apple Macbook Pro A1990',
        image: 'img/laptop-apple-macbook-pro-a1990.webp',
        desription: 'Опис',
        type: 'laptop',
        price: 22899
    },
    {
        id: 5,
        name: 'Ноутбук Apple Macbook Pro A1990',
        image: 'img/laptop-apple-macbook-pro-a1990.webp',
        desription: 'Опис',
        type: 'laptop',
        price: 22899
    },
    {
        id: 6,
        name: 'Ноутбук Apple Macbook Pro A1990',
        image: 'img/laptop-apple-macbook-pro-a1990.webp',
        desription: 'Опис',
        type: 'laptop',
        price: 22899
    },
    {
        id: 7,
        name: 'Ноутбук Apple Macbook Pro A1990',
        image: 'img/laptop-apple-macbook-pro-a1990.webp',
        desription: 'Опис',
        type: 'laptop',
        price: 22899
    },
    {
        id: 8,
        name: 'Ноутбук Apple Macbook Pro A1990',
        image: 'img/laptop-apple-macbook-pro-a1990.webp',
        desription: 'Опис',
        type: 'laptop',
        price: 22899
    },
];

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
    alert("Товар додано:" + product.name)
}

let productsMap = {
    "Всі": "all",
    "Телефони": "phone",
    "Комп'ютери": "laptop"
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


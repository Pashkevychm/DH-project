let products = [
    {
        id: 1,
        name: "Iphone",
        image: "img",
        desription: "Опис",
        type: "phone",
        price: x
    },
    {
        id: 2,
        name: 'нокя3310',
        image: 'img',
        desription: 'Опис',
        type: 'laptop',
        price: x
    }
];

let cart = [];

let productsContainer = document.querySelector(".products-div")
let btnGroup = document.querySelector(".btn-group")

function renderProducts(items) {
    productsContainer.innerHTML = ""
    if (items.length == 0) {
        productsContainer.innerHTML = '<p>Товарів нєма</p>'
        return;
    }
    items.forEach(function (item) {
        let productHTML = `
    <article class="product" data-id="${item.id}">
        <img src="${item.image}" alt="Тут має бути картинка..." class="product-img">
        <h3 class="product-title">${item.name}</h3>
        <p class="product-description">${item.desription}</p>
        <p class="product-price"><strong>${item.price} грн</strong></p>
        <button type="button" class="btn btn-primary">До кошику</button>
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
    let product = products.find(p => p.id == product.id);
    if (product) {
        cart.push(product);
        alert("Товар додано" + product.name)
        //cookies or localStorage
    }
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

renderProducts(products)
setupFilterButtons()
// variable 

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-btn");
const clearCartBtn = document.querySelector(".clear-btn");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItem = document.querySelector(".cart-item");
const cartTotal = document.querySelector(".cart-total");
const cartContent = 
document.querySelector(".cart-content");
const productDOM = 
document.querySelector(".products-center");

// cart
let cart = [];

// getting products
class Products {
    async getProduct() {
        try{
            let result = await fetch("products.json");
            let data = await result.json();

            let products = data.items;
            products = products.map(item => {
                const {title,price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title,price,id,image}
            })
            return products
        } catch(error) {
            console.log(error);
        }
    }

}

// display product 
class UI {
      displayProducts(products) {
       let result = '';
       products.forEach(product => {
        result += `
         <!-- start single product -->
    <article class="product">
        <div class="img-container">
            <img src=${product.image} alt="product" class="product-img">
            <button class="bag-btn" data-id= ${product.id}>
                <i class="fas fa-shopping-cart"></i>
                add to bag         
            </button>
        </div>
        <h3>${product.title}</h3>
        <h4>₹ ${product.price}</h4>
    </article>
    <!-- end of single product -->`
       }); 
        productDOM.innerHTML = result;
    }
   
}

// local storage
class Storage {

}

document.addEventListener("DOMContentLoaded", ()=> {
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProduct().then(products => {
        ui.displayProducts(products);
    })

})








let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id){

const product = products.find(p=>p.id===id);

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

alert(product.name+" added to cart.");

}

function displayProducts(){

const productList=document.getElementById("productList");

if(!productList) return;

productList.innerHTML="";

products.forEach(product=>{

productList.innerHTML+=`

<div class="card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>${product.category}</p>

<h4>¥${product.price}</h4>

<button onclick="addToCart(${product.id})">

Add To Cart

</button>

</div>

`;

});

}

displayProducts();
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");
let shopDestaque = document.getElementById("produtos-destaque");
let shopNovos = document.getElementById("produtos-novos");
let basket = JSON.parse(localStorage.getItem("data")) || [];

if (bar) {
   bar.addEventListener("click", () => {
      nav.classList.add("activeNav");
   });
}

if (close) {
   close.addEventListener("click", () => {
      nav.classList.remove("activeNav");
   });
}

let populateDestaque = () => {
   return (shopDestaque.innerHTML = databaseProdutosDestaque
      .map((item) => {
         let { id, marca, nome, preco, img } = item;
         let search = basket.find((x) => x.id === id) || [];
         return `
        <div id=product-id-${id}  class="pro">
        <img src="${img}" alt="${nome}" />
        <div class="description">
           <span>${marca}</span>
           <h5>${nome}</h5>
           <div class="star">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
           </div>
           <div class="buy">
              <h4>R$ ${preco}</h4>
              <div class="cart-added">
                    <h6 id=${id} class="quantity">
                    ${search.quantidade === undefined ? 0 : search.quantidade}
                    </h6>
                    <i class="fas fa-cart-plus" onclick="addToCart(${id})"></i>
                </div>
             </div>
        </div>
        </div>
      `;
      })
      .join(""));
};
populateDestaque();

let populateNovos = () => {
   return (shopNovos.innerHTML = databaseProdutosNovos
      .map((item) => {
         let { id, marca, nome, preco, img } = item;
         let search = basket.find((x) => x.id === id) || [];
         return `
         <div id=product-id-${id}  class="pro">
         <img src="${img}" alt="${nome}" />
         <div class="description">
            <span>${marca}</span>
            <h5>${nome}</h5>
            <div class="star">
               <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
            </div>
            <div class="buy">
               <h4>R$ ${preco}</h4>
               <div class="cart-added">
                     <h6 id=${id} class="quantity">
                     ${search.quantidade === undefined ? 0 : search.quantidade}
                     </h6>
                     <i class="fas fa-cart-plus" onclick="addToCart(${id})"></i>
                 </div>
              </div>
         </div>
         </div>
       `;
      })
      .join(""));
};
populateNovos();

let addToCart = (id) => {
   let selectedItem = id;
   let search = basket.find((x) => x.id === selectedItem.id);
   if (search === undefined) {
      basket.push({
         id: selectedItem.id,
         quantidade: 1,
      });
   } else {
      search.quantidade += 1;
   }
   update(selectedItem.id);

   localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
   let search = basket.find((x) => x.id === id);
   if (search === undefined) {
      console.log(id);
      document.getElementById(id).innerHTML = 0;
   } //Check if basket is empty
   else {
      document.getElementById(id).innerText = search.quantidade;
      calculation();
      showBadge();
   }
};

let calculation = () => {
   let cartIcon = document.getElementById("cartAmount");
   let mobileCartIcon = document.getElementById("mobileCartAmount");
   cartIcon.innerHTML = basket
      .map((x) => x.quantidade)
      .reduce((sum, item) => sum + item, 0);
   mobileCartIcon.innerHTML = basket
      .map((x) => x.quantidade)
      .reduce((sum, item) => sum + item, 0);
};

function showBadge() {
   let cartIcon = document.getElementById("cartAmount");
   let mobileCartIcon = document.getElementById("mobileCartAmount");

   if (cartIcon.innerHTML === "0") {
      cartIcon.classList.remove("shown");
   } else {
      cartIcon.classList.add("shown");
   }
   if (mobileCartIcon.innerHTML === "0") {
      mobileCartIcon.classList.remove("shown");
   } else {
      mobileCartIcon.classList.add("shown");
   }
}
let stateCheck = setInterval(() => {
   if (document.readyState === "complete") {
      clearInterval(stateCheck);
      showBadge();
   }
}, 500);

calculation();
showBadge();
//Section for single product page to change image
/*
var mainImg = document.getElementById('mainImage');
var smallImg = document.getElementsByClassName('small-img');
var path = 'assets/images/product/f';
smallImg[0].onclick = () => {
    mainImg.src = smallImg[0].src;
}
smallImg[1].onclick = () => {
    mainImg.src = smallImg[1].src;
}
smallImg[2].onclick = () => {
    mainImg.src = smallImg[2].src;
}
smallImg[3].onclick = () => {
    mainImg.src = smallImg[3].src;
}

function incrementValue() {
    var value = parseInt(document.getElementById('quantidade').value, 10);
    value = isNaN(value) ? 0 : value;
    if (value < 100) {
        value++;
        document.getElementById('quantidade').value = value;
    }
}

function decrementValue() {
    var value = parseInt(document.getElementById('quantidade').value, 10);
    value = isNaN(value) ? 0 : value;
    if (value > 0) {
        value--;
        document.getElementById('quantidade').value = value;
    }
}
*/

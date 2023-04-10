let basket = JSON.parse(localStorage.getItem("data")) || [];
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");
let table = document.getElementById("table");
let resume = document.getElementById("tableFooter");
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

let populateCart = () => {
   if (basket.length !== 0) {
      return (table.innerHTML = basket
         .map((x) => {
            let { id, quantidade } = x;
            let search = databaseProdutos.find((data) => data.id === id) || [];
            return `
      <tr>
      <td>
            <i onclick="remove(${search.id})" class="far fa-times-circle"> </i>
      </td>
      <td>
         <img
            src=${search.img}
            alt=${search.nome}
            id="image"
         />
      </td>
      <td><h4>${search.nome}</h4></td>
      <td>
         <div class=escolheQuantidade>
               <i onclick="decrement(${id})" class="fa fa-minus-circle"></i>
               <div id=${id}>${
               x.quantidade === undefined ? 0 : x.quantidade
            }</div>
               <i onclick="increment(${id})" class="fa fa-plus-circle"></i>
         </div>
      </td>
      <td class="preco"><h4>${search.preco}</h4></td>
      <td class="quantitade"><h4>${(quantidade * search.preco).toFixed(
         2
      )}</h4></td>
   </tr>
  
      `;
         })
         .join(""));
   } else {
      table.innerHTML = ``;

      resume.innerHTML = `
         <h2>Seu carrinho està vazio</h2>
         <a href="index.html"><button class="btn-home">Volte à loja</button></a>
         `;
   }
};

populateCart();

let increment = (id) => {
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
   populateCart();
   TotalAmount();
   localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
   let selectedItem = id;
   let search = basket.find((x) => x.id === selectedItem.id);

   if (search === undefined) return; //Check if basket is empty
   else if (search.quantidade === 0) return; //Check if  selected item is zero
   else {
      search.quantidade -= 1;
   }
   update(selectedItem.id);
   basket = basket.filter((x) => x.quantidade !== 0);
   populateCart();
   TotalAmount();
   localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
   let search = basket.find((x) => x.id === id);
   if (search === undefined) {
      document.getElementById(id).innerHTML = 0;
   } //Check if basket is empty
   else {
      document.getElementById(id).innerHTML = search.quantidade;
      calculation(); //sum the quantity of each item and update the cartAmount
      showBadge(); //Check if cart is empty. If it is no badge is shown
   }
};

let remove = (id) => {
   let selectedItem = id;

   basket = basket.filter((x) => x.id !== selectedItem.id);
   console.log(basket);

   localStorage.setItem("data", JSON.stringify(basket));
   populateCart();
   TotalAmount();
   calculation();
   showBadge();
};

let TotalAmount = () => {
   if (basket.length !== 0) {
      let amount = basket
         .map((x) => {
            let { id, quantidade } = x;
            let search = databaseProdutos.find((data) => data.id === id) || [];
            return quantidade * search.preco;
         })
         .reduce((x, y) => x + y, 0);
      /* console.log(amount) */
      resume.innerHTML = `
      <tr>
         <td></td>
         <td></td>
         <td></td>
         <td></td>
         <td class="totalFooter">TOTAL: R$</td>
         <td class="totalFooter">${amount.toFixed(2)}</td>
       </tr>
       `;
   } else return;
};

TotalAmount();

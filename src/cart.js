let basket = JSON.parse(localStorage.getItem("data")) || [];
let table = document.getElementById("table");

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

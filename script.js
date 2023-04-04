const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close'); 

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('activeNav');
     })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('activeNav');
    })
}

//Section for single product page to change image 

var mainImg = document.getElementById('mainImage');
var smallImg= document.getElementsByClassName('small-img');
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
    if(value < 100) {
      value++;
      document.getElementById('quantidade').value = value;
    }
  }

  function decrementValue() {
    var value = parseInt(document.getElementById('quantidade').value, 10);
    value = isNaN(value) ? 0 : value;
    if(value > 0) {
      value--;
      document.getElementById('quantidade').value = value;
    }
  }



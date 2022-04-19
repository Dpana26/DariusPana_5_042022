let cart = []
let cartArticle = document.getElementById('cart__items');

function getCart() {
    if(localStorage.getItem('cartData4')!=null){
      cart = JSON.parse(localStorage.getItem('cartData4'));
// affichage panier
      showCartInfo()
    }else {
        console.log('panier vide');
    }
}
getCart();



 function showCartInfo() {
        for(let i=0; i< cart.length; i++){
            getFullInfo(cart[i]);
            }      
  }

  function getFullInfo(cartItem) {
    fetch(`http://localhost:3000/api/products/${cartItem.id}`)
    .then(function(res) {
    if (res.ok) {
      return res.json(); 
    }
    })
  .then(function(productInfo) {
       cartArticle.innerHTML +=  `<article class="cart__item" data-id="${cartItem.id}" data-color="${cartItem.color}">
                <div class="cart__item__img">
                  <img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productInfo.name}</h2>
                    <p>${cartItem.color}</p>
                    <p>${productInfo.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p  class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;

  })
  .catch(function(err) {
    // Une erreur est survenue
  })
}

let deleteBt = document.getElementsByClassName("cart__item__content__settings__delete");

for(let i; i<deleteBt.length; i++){
  console.log(deleteBt[i].closest("cart__item"));


}

function deleteProduct() {
  console.log('delete ');
}

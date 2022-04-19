let str = window.location.href; // recuperer l'adresse url
let url = new URL(str); // creation d'un objet URL avec le str en parametre
let id = "";
let couch;

let search_params = new URLSearchParams(url.search); // creation d'un objet URLSearchParams
if(search_params.has("id")){ // verifier si le parametre id existe dans les search_params
     id = search_params.get("id") // si OUI, recuperer la valeur du parametre "id"
}
fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(res) {
    if (res.ok) {
      return res.json(); 
    }
    })
  .then(function(value) {
       couch=value;
      console.log(couch.colors)
      console.log(couch);
      getCoucheDetails();
  })
  .catch(function(err) {
    // Une erreur est survenue
  })


function getCoucheDetails() {
  let image = document.getElementsByClassName("item__img");
  let title = document.getElementById("title");
  let price = document.getElementById("price");
  let description = document.getElementById("description");
  let colors = document.getElementById("colors");

  for(let i=0; i<image.length; i++){
     image[i].innerHTML = `<img src=${couch.imageUrl} alt=${couch.altTxt}>`;
  }
  title.innerHTML = couch.name;
  price.innerHTML= couch.price;
  description.innerHTML = couch.description; 

  for (let i=0; i<couch.colors.length; i++){
  colors.innerHTML+=  `<option value="${couch.colors[i]}">${couch.colors[i]}</option>`;
}
;}
getCoucheDetails(id);

function addToCart(){
  let quantity = +document.getElementById("quantity").value;
  let color = document.getElementById("colors").value;
  let chosenItem = {id, quantity,color}; // l'element choisi

  let localStorageCart = localStorage.getItem('cartData5'); // chercher le key 'cartData' dans localStorage
  
  if(localStorageCart!=null){ // verifier si l'element 'cartData' existe
    let parsedStoragedCart = JSON.parse(localStorageCart); // transformer le panier en format JSON
    parsedStoragedCart = checkIfProductExistsAndAddIt(chosenItem, parsedStoragedCart);
    localStorage.setItem('cartData5', JSON.stringify(parsedStoragedCart)); // l-am setat in localstodage
  } else {
    let newCart = [];
    newCart.push(chosenItem); // am adaugat in cos array
    localStorage.setItem('cartData5', JSON.stringify(newCart)); // l-am setat in localstodage
  }
  
}

function checkIfProductExistsAndAddIt(chosenItem, cart) {
    let productExists = false;

    for(let i=0; i<cart.length; i++){
        if((chosenItem.id === cart[i].id)&&(chosenItem.color === cart[i].color)){
          cart[i].quantity = cart[i].quantity + chosenItem.quantity;
          productExists=true;
        }
      }
       if(!productExists){
          cart.push(chosenItem);
        }

      return cart;
  }


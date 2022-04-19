  let couches = [];

    let couchesSection = document.getElementById('items');
  function getCouches() {
    fetch('http://localhost:3000/api/products')
    .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    })
  .then(function(value) {
    couches=value;
    showCouches();
  })
  .catch(function(err) {
    // Une erreur est survenue
  });}
getCouches();

  function showCouches() {
          for(let i=0; i< couches.length; i++){
          couchesSection.innerHTML +=  `<a href=./product.html?id=${couches[i]._id} ><article><img src=${couches[i].imageUrl} alt=${couches[i].altTxt}><h3 class='productName'>${couches[i].name}</h3><p class='productDescription'>${couches[i].description}</p></article></a>` ; 
      }
      
  }

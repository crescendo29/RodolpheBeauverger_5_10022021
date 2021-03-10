//Récupération des caractéristiques du produit et des options proposées

const productId = new URL(window.location.href).searchParams.get("id");
async function getProductFeature() {
  const data = await fetchApi(`http://localhost:3000/api/furniture/${productId}`);
  generateProductFeature(data);
  addProduct(data);
}

getProductFeature();

//Création de la fiche produit et des options dans le HTML

function generateProductFeature(data) {
  const productImage = document.getElementById("product-image");
  const productName = document.getElementById("product-name");
  const productPrice = document.getElementById("product-price");
  const productDescription = document.getElementById("product-description");
  const productOption = document.getElementById("product-option");
  const color = data.varnish;

  productImage.src = data.imageUrl;
  productName.textContent = data.name;
  productPrice.textContent = `${data.price / 100}.00 €`;
  productDescription.textContent = data.description;

  color.forEach((element, key) => {
    productOption[key] = new Option(element, key);
  });
}

//Ajout du produit dans le panier

function addProduct(data) {
  const addProduct = document.getElementById("add-to-cart");
  const product = { id: data._id, features: { quantity: 1, img: data.imageUrl, name: data.name, price: data.price / 100 } };
  addProduct.addEventListener("click", (e) => {
    e.preventDefault();

    //Récupération du panier ou création d'un panier vide

    const productInLocalStorage = JSON.parse(localStorage.getItem("inCart") || "[]");

    //On vérifie si le produit est déjà dans le panier ==> si oui on incrémente la quantité si non on l'ajoute

    const found = productInLocalStorage.find((element) => element.id === data._id);
    if (found) {
      found.features.quantity++;
    } else {
      productInLocalStorage.push(product);
    }
    localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
    alert("Ce produit a été ajouté à votre panier.");
  });
}

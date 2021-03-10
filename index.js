//Récupération de la liste et des caractéristiques des article proposés à la vente

async function getProducts() {
  const data = await fetchApi("http://localhost:3000/api/furniture");
  generateProduct(data);
}

getProducts();

//Création des cartes correspondant à la liste d'articles

function generateProduct(data) {
  data.forEach((product) => {
    const gallery = document.getElementById("products-list");
    const productElt = document.createElement("a");
    const productImg = document.createElement("figure");
    const productName = document.createElement("h2");
    const productPrice = document.createElement("span");
    const productDescription = document.createElement("figcaption");

    //le click sur une carte renverra sur la page du produit avec son ID

    productElt.id = "product";
    productElt.href = `./product.html?id=${product._id}`;
    gallery.appendChild(productElt);

    productImg.id = "product-image";
    productImg.innerHTML = `<img src=${product.imageUrl}>`;
    productElt.appendChild(productImg);

    productName.id = "product-name";
    productName.textContent = product.name;
    productElt.appendChild(productName);

    productPrice.id = "product-price";
    productPrice.textContent = `${product.price / 100}.00 €`;
    productElt.appendChild(productPrice);

    productDescription.id = "product-description";
    productDescription.textContent = product.description;
    productElt.appendChild(productDescription);
  });
}

//Récupération de la liste et des caractéristiques des article proposés à la vente

async function getProducts() {
  const data = await fetchApi("http://localhost:3000/api/furniture");
  generateProducts(data);
}

getProducts();

//Création des cartes correspondant à la liste d'articles

function generateProducts(data) {
  data.forEach((element) => {
    const price = formatCurrency(element.price / 100);

    //Permet de créer de nouvelles copies du template des lignes d'article

    const productTemplate = document.getElementById("product-template");
    const clone = document.importNode(productTemplate.content, true);

    clone.querySelector(".product-image").src = element.imageUrl;
    clone.querySelector(".product-name").textContent = element.name;
    clone.querySelector(".product-name").href = `./product.html?id=${element._id}`;
    clone.querySelector(".product-price").textContent = price;
    clone.querySelector(".product-description").textContent = element.description;
    document.getElementById("products-list").appendChild(clone);
  });
}

const productInLocalStorage = JSON.parse(localStorage.getItem("inCart"));
const inCart = document.getElementById("in-cart");

//Création des éléments du panier et insertion dans le HTML

function displayProducts() {
  productInLocalStorage.forEach((element) => {
    //Permet de créer de nouvelles copies du template des lignes d'article

    const templateProductRow = document.getElementById("product-row");
    const clone = document.importNode(templateProductRow.content, true);

    //S'il y a des produits dans le panier

    clone.querySelector(".product-image").src = element.features.img;
    clone.querySelector(".product-name").textContent = element.features.name;
    clone.querySelector(
      ".product-quantity"
    ).innerHTML = `<label for="${element.id}"></label><input type="number"  id="${element.id}" name="${element.id}" min="0" value= ${element.features.quantity} onclick="setQuantity()" />`;
    clone.querySelector(".product-price").textContent = element.features.price;
    clone.querySelector(".product-total-price").textContent = element.features.price * element.features.quantity;
    clone.querySelector(".delete").id = `${element.id}`;
    document.getElementById("in-cart").appendChild(clone);
  });
}

//si le panier est vide ou s'il a été vidé...sinon on affiche les lignes de produit
if (!productInLocalStorage || productInLocalStorage.length === 0) {
  inCart.innerHTML = `<td>Le panier est vide</td>`;
} else {
  displayProducts();
}

//Permet de modifier la quantité de produit voulu

function setQuantity() {
  productInLocalStorage.forEach((element) => {
    const quantity = document.getElementById(`${element.id}`);
    element.features.quantity = quantity.value;
    localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
    window.location.reload();
  });
}

//Permet de supprimer une ligne de produit

function deleteProduct() {
  const productsToDelete = document.querySelectorAll(".delete");
  for (const productToDelete of productsToDelete) {
    productToDelete.addEventListener("click", function (event) {
      const productToDeleteId = event.target.id;
      const result = productInLocalStorage.filter((product) => product.id !== productToDeleteId);
      localStorage.setItem("inCart", JSON.stringify(result));
      window.location.reload();
    });
  }
}

deleteProduct();

//Envoi de la commande

//Récupération des informations de la commande

const firstName = document.getElementById("firstname").value;
const lastName = document.getElementById("lastname").value;
const address = document.getElementById("address").value;
const email = document.getElementById("email").value;
const city = document.getElementById("city").value;

const products = productInLocalStorage.map((element) => element.id);

const order = {
  contact: {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  },
  products: products,
};
console.log(JSON.stringify(order));

//Envoi de la commande

const sendOrder = async function (data) {
  let response = await fetch(`http://localhost:3000/api/furniture/order`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

function validate() {
  const clickElement = document.getElementById("validate");
  clickElement.addEventListener("click", (e) => {
    e.preventDefault();
    sendOrder(order);
  });
}

const productInLocalStorage = JSON.parse(localStorage.getItem("inCart"));
const inCart = document.getElementById("in-cart");

//si le panier est vide ou s'il a été vidé...sinon on affiche les lignes de produit
if (!productInLocalStorage || productInLocalStorage.length === 0) {
  inCart.innerHTML = `<td>Le panier est vide</td>`;
} else {
  displayProducts();
}

//Création des éléments du panier et insertion dans le HTML

function displayProducts() {
  let total = 0;
  productInLocalStorage.forEach((element) => {
    //Permet de calculer le montant total de la commande en récupérant le prix de l'élément et la quantité

    total += element.features.price * element.features.quantity;
    localStorage.setItem("total", JSON.stringify(total));
    document.querySelector(".total-global").textContent = formatCurrency(total);

    //Permet de créer de nouvelles copies du template des lignes d'article

    const templateProductRow = document.getElementById("product-row");
    const clone = document.importNode(templateProductRow.content, true);

    clone.querySelector(".product-image").src = element.features.img;
    clone.querySelector(".product-name").textContent = element.features.name;
    clone.querySelector(
      ".product-quantity"
    ).innerHTML = `<label for="${element.id}"></label><input type="number"  id="${element.id}" name="${element.id}" min="0" value= ${element.features.quantity} onclick="setQuantity()" />`;
    clone.querySelector(".product-price").textContent = formatCurrency(element.features.price);
    clone.querySelector(".product-total-price").textContent = formatCurrency(element.features.price * element.features.quantity);
    clone.querySelector(".delete").id = `${element.id}`;
    document.getElementById("in-cart").appendChild(clone);
  });
}

//Permet de modifier la quantité de produit voulu et de mettre à jour le localStorage

function setQuantity() {
  productInLocalStorage.forEach((element) => {
    const quantity = document.getElementById(`${element.id}`);
    element.features.quantity = quantity.value;
    localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
    window.location.reload();
  });
}

//Permet de supprimer une ligne de produit et de mettre à jour le localStorage

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

//Récupération des informations de la commande

function sendOrder() {
  const totale = document.querySelector(".total-global");
  console.log(totale);

  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const city = document.getElementById("city").value;

  const products = productInLocalStorage.map((element) => element.id);

  //On vérifie la validité des données du formulaire

  if (
    firstName != "" &&
    /^[a-zA-ZÀ-ÿ'\-]+$/.test(firstName) &&
    lastName != "" &&
    /^[a-zA-ZÀ-ÿ'\-]+$/.test(lastName) &&
    address != "" &&
    city != "" &&
    /^[a-zA-ZÀ-ÿ'\-]+$/.test(city) &&
    email != "" &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  ) {
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
    const send = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    fetch(`http://localhost:3000/api/furniture/order`, send)
      .then((response) => response.json())
      .then((json) => {
        localStorage.removeItem("inCart");
        window.location.href = `${window.location.origin}/frontend/pages/confirmation.html?orderId=${json.orderId}`;
      })
      .catch(() => {
        console.log(error);
      });
  } else {
    alert("Veuillez renseigner tous les champs du formulaire");
  }
}

const clickElement = document.getElementById("validate");
clickElement.addEventListener("click", (e) => {
  e.preventDefault();
  sendOrder();
});

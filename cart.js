const productInLocalStorage = JSON.parse(localStorage.getItem("inCart"));
const inCart = document.getElementById("in-cart");

function displayProducts() {
  productInLocalStorage.forEach((element) => {
    const templateProductRow = document.getElementById("product-row");
    const clone = document.importNode(templateProductRow.content, true);

    if (productInLocalStorage) {
      clone.querySelector(".product-image").src = element.features.img;
      clone.querySelector(".product-name").textContent = element.features.name;
      clone.querySelector(
        ".product-quantity"
      ).innerHTML = `<label for="${element.id}"></label><input type="number"  id="${element.id}" name="${element.id}" min="0" value= ${element.features.quantity} onclick="setQuantity()" />`;
      clone.querySelector(".product-price").textContent = element.features.price;
      clone.querySelector(".product-total-price").textContent = element.features.price * element.features.quantity;
      clone.querySelector(".delete").id = `${element.id}`;
      document.getElementById("in-cart").appendChild(clone);
    } else {
      inCart.innerHTML = `<td>Le panier est vide</td>`;
      console.log(blue);
    }
  });
}

/* if (productInLocalStorage) {
  displayProducts();
  console.log(productInLocalStorage);
} else {
  inCart.innerHTML = `<td>Le panier est vide</td>`;
} */

if (!productInLocalStorage || productInLocalStorage.length === 0) {
  inCart.innerHTML = `<td>Le panier est vide</td>`;
} else {
  displayProducts();
}
function setQuantity() {
  productInLocalStorage.forEach((element) => {
    const quantity = document.getElementById(`${element.id}`);
    element.features.quantity = quantity.value;
    localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
    window.location.reload();
  });
}

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

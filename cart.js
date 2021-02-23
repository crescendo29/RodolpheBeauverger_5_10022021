const productInLocalStorage = JSON.parse(localStorage.getItem("product"));
const inCart = document.getElementById("in-cart");

function generateProductInCart() {
  if (productInLocalStorage === null) {
    inCart.innerHTML = `<td>Le panier est vide</td>`;
  } else {
    productInLocalStorage.forEach((element) => {
      console.log(element.image);
      console.log(element.name);
      console.log(element.price);
      console.log(element.quantity);
    });
  }
}
generateProductInCart();
/* function generateProduct(data) {
  data.forEach((product) => {
    const inCart = document.getElementById("in-cart");
    const newLine = document.createElement("tr");
    const newCell = document.createElement("td");

    newLine.id = "product";
    inCart.appendChild(newLine);

    newCell.id = "product-image";
    newCell.innerHTML = `<img src=${product.imageUrl}>`;
    newLine.appendChild(newCell);

    newCell.id = "product-quantity";
    newCell.textContent = "nouveau texte";
    newLine.appendChild(newCell); */

/*  newCell.id = "product-price";
    newCell.textContent = data.price;
    newLine.appendChild(newCell); */

/* newCell.id = "product-total";
    newCell.textContent =;
    newLine.appendChild(newCell); */
/*  });
}
 */

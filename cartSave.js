async function getProducts() {
  const data = await fetchApi("http://localhost:3000/api/furniture");
  displayProducts(data);
}

getProducts();

const productInLocalStorage = JSON.parse(localStorage.getItem("product"));
const inCart = document.getElementById("in-cart");

function generateProductInCart() {
  if (productInLocalStorage === null) {
    inCart.innerHTML = `<td>Le panier est vide</td>`;
  } else {
    const productQuantity = productInLocalStorage.reduce(function (sums, product) {
      sums[product.id] = (sums[product.id] || 0) + 1;
      return sums;
    }, {});
    console.log(productQuantity);
  }
}

generateProductInCart();

function displayProducts(data) {
  data.forEach((product) => {
    const templateProductRow = document.getElementById("product-row");
    const clone = document.importNode(templateProductRow.content, true);

    clone.getElementById("product-image").src = product.imageUrl;
    clone.getElementById("product-name").textContent = product.name;
    /* clone.getElementById("product-quantity").textContent = productQuantity; */
    clone.getElementById("product-price").textContent = product.price;
    /* clone.getElementById("product-total-price").textContent = data.price *= productQuantity;  */

    document.getElementById("in-cart").appendChild(clone);
  });
}

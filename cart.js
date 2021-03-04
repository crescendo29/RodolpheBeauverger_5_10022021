/* async function getProducts() {
  const data = await fetchApi("http://localhost:3000/api/furniture");
  displayProducts(data);
}

getProducts();
 */
//const productInLocalStorage = JSON.parse(localStorage.getItem("product"));
/* var productQuantity = productInLocalStorage.reduce(function (sums, product) {
  sums[product.id] = (sums[product.id] || 0) + 1;
  return sums;
}, {}); */
/* const inCart = Object.keys(productQuantity);
const qtyInCart = Object.values(productQuantity);
console.log(productQuantity);
console.log(productInLocalStorage); */
/* for (const element of product) {
  console.log(element.key);
} */

/* function displayProducts() {
  productInLocalStorage.forEach((element) => {
    const templateProductRow = document.getElementById("product-row");
    const clone = document.importNode(templateProductRow.content, true);
    if (element.id) {
      console.log(element.id);
      console.log("yeah!");
    } else {
      console.log("faut le creer");
    }
    clone.getElementById("product-image").src = product.imageUrl;
    clone.getElementById("product-id").id = element;
    clone.getElementById("product-quantity").textContent = qty;
    clone.getElementById("product-price").textContent = product.price;
    clone.getElementById("product-total-price").textContent = data.price *= productQuantity;

    document.getElementById("in-cart").appendChild(clone);
  });
}
displayProducts();
 */

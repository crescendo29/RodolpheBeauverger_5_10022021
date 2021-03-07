const productId = new URL(window.location.href).searchParams.get("id");
async function getProductFeature() {
  const data = await fetchApi(`http://localhost:3000/api/furniture/${productId}`);
  generateProductFeature(data);
  addProduct(data);
}

getProductFeature();

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
function addProduct(data) {
  const addProduct = document.getElementById("add-to-cart");
  const product = { id: data._id, features: { quantity: 1, img: data.imageUrl, name: data.name, price: data.price / 100 } };
  addProduct.addEventListener("click", (e) => {
    e.preventDefault();
    const productInLocalStorage = JSON.parse(localStorage.getItem("inCart") || "[]");
    const found = productInLocalStorage.find((element) => element.id === data._id);
    if (found) {
      found.features.quantity++;
      localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
    } else {
      productInLocalStorage.push(product);
      localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
    }
  });
}

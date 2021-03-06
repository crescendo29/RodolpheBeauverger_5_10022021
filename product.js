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
    let productInLocalStorage = JSON.parse(localStorage.getItem("inCart"));
    if (productInLocalStorage) {
      for (let i = 0; i < productInLocalStorage.length; i++) {
        const element = productInLocalStorage[i];
        console.log(element);
        console.log(element.id);
        if (element.id === data._id) {
          console.log("yeah");
          element.features.quantity++;
          localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
        } else {
          productInLocalStorage.push(product);
          localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
          console.log("pas dedans");
        }
      }
      localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
    } else {
      productInLocalStorage = [];
      productInLocalStorage.push(product);
      localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
    }
  });
}

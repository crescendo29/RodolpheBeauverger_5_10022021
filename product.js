async function fetchApi(url) {
  try {
    let response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      console.error("retour du serveur : ", response.status);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getProductFeature() {
  const productId = new URL(window.location.href).searchParams.get("id");
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
  addProduct.addEventListener("click", (e) => {
    e.preventDefault();
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

    if (productInLocalStorage) {
      productInLocalStorage.push(product);
      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    } else {
      productInLocalStorage = [];
      productInLocalStorage.push(product);
      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    }
  });

  let product = {
    name: data.name,
    id: data._id,
    image: data.imageUrl,
    price: data.price / 100,
    quantity: 1,
  };
}

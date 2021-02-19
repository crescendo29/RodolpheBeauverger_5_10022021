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

async function getProducts() {
  const productId = await new URL(window.location.href).searchParams.get("id");
  const data = await fetchApi(`http://localhost:3000/api/furniture/${productId}`);
  generateProduct(data);
}

getProducts();

function generateProduct(data) {
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

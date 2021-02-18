const gallery = document.getElementById("products-list");

async function fetchApi(url) {
  try {
    let response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      console.error(
        "retour du serveur : ",
        response.status
      );
    }
  } catch (err) {
    console.log(err);
  }
}
async function getProducts() {
  const data = await fetchApi(
    "http://localhost:3000/api/furniture"
  );
  generateProduct(data);
}

getProducts();

function generateProduct(data) {
  data.forEach((product) => {
    const productList = document.createElement("a");
    productList.classList.add("product");
    productList.id = product._id;
    gallery.appendChild(productList);
  });
}

/* const productList = document.createElement("figure")
productList.classList.add("productImage");
productList.innerHTML = `<img src=${product.imageUrl}>`;
gallery.appendXhild(productList) */

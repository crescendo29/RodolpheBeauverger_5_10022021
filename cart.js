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
  const data = await fetchApi("http://localhost:3000/api/furniture");
  generateProduct(data);
}

getProducts();

function generateProduct(data) {
  data.forEach((product) => {
    const inCart = document.getElementById("in-cart");
    const newLine = document.createElement("tr");
    const newCell = document.createElement("td");

    newLine.id = "product";
    inCart.appendChild(newLine);

    newCell.id = "product-image";
    newCell.innerHTML = `<img src=${product.imageUrl}>`;
    newLine.appendChild(newCell);

    /* newCell.id = "product-quantity";
    newCell.textContent = ;
    newLine.appendChild(newCell); */

    /*  newCell.id = "product-price";
    newCell.textContent = data.price;
    newLine.appendChild(newCell); */

    /* newCell.id = "product-total";
    newCell.textContent =;
    newLine.appendChild(newCell); */
  });
}

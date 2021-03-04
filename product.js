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
/* let productInLocalStorage = JSON.parse(localStorage.getItem("inCart"));
for (const element of productInLocalStorage) {
  console.log(element.features.price);
} */

function addProduct(data) {
  const addProduct = document.getElementById("add-to-cart");
  //const product = [data._id, [data.name, data._id, data.imageUrl, data.price / 100]];
  const product = { id: data._id, features: { quantity: 1, img: data.imageUrl, name: data.name, price: data.price / 100 } };
  addProduct.addEventListener("click", (e) => {
    e.preventDefault();
    let productInLocalStorage = JSON.parse(localStorage.getItem("inCart") || "[]");

    /* for (const element of productInLocalStorage) {
      console.log(element.id);
      if (element.id === productId) {
        console.log("existe");
        element.features.quantity++;
        localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
      } else {
        console.log("pas dans le panier");
        productInLocalStorage.push(product);
        localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
      }
    } */

    if (productInLocalStorage.indexOf(productId)) {
      console.log(productInLocalStorage);
      productInLocalStorage.push(product);
      localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
    } else {
      productInLocalStorage.push(product);
      localStorage.setItem("inCart", JSON.stringify(productInLocalStorage));
    }
  });
}

/* class Cart {
  productInCart(produit) {
    let products = this.products;

    if (products[produit._id]) {
      console.log(`y'en a déjà`);
    } else {
      console.log(`y'en a pas`);
    }
    this.products = products;
  }
  get products() {
    return JSON.parse(localStorage.getItem("inCart" || {}));
  }
  set products(products) {
    localStorage.setItem("inCart", JSON.stringify(products));
  }
}
const userCart = new Cart(); */

//let incart = { productId1: {name: productName1, price: productPrice1, quantity: productQuantity1}, productId2:{name: productName2, price: productPrice2, quantity: productQuantity2}}

/* class MyClass {
  constructor(property) {
    this.property = property
  }

  set property(prop) {
  // Some validation etc.
  this._property = prop
  }

  get property() {
    return this._property
  }

  toJSON() {
    return {
      property: this.property
    }
  }
} */

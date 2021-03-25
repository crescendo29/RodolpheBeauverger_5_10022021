const formatCurrency = (elt) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(elt);

// affiche dans le nombre d'articles dans le panier sur chaque page
const productsInLocalStorage = JSON.parse(localStorage.getItem("inCart"));
let howManyArticleInCart = 0;
productsInLocalStorage?.forEach((element) => {
  howManyArticleInCart += element.features.quantity;
});
let cartContent = document.querySelectorAll(".cart-content");
cartContent.forEach((element) => (element.textContent = `Panier(${howManyArticleInCart} articles)`));

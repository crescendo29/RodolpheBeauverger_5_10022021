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

const formatCurrency = (elt) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(elt);

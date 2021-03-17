const formatCurrency = (elt) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(elt);

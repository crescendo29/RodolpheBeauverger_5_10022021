const orderId = new URL(window.location.href).searchParams.get("orderId");
const total = formatCurrency(JSON.parse(localStorage.getItem("total")));
document.getElementById("order-id").textContent = `La référence de votre commande d'un montant de ${total} est : ${orderId}`;

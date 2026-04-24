
document.addEventListener("DOMContentLoaded", async () => {
const addCardBox = document.getElementById("addCardBox");

function showCardMessage(text, type) {
  const msg = document.getElementById("cardMessage");
  if (!msg) return;

  msg.textContent = text;
  msg.className = "form-message " + type;
  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
  }, 6000);
}

 const user = JSON.parse(sessionStorage.getItem("currentUser"));

if (!user || !user._id) {
  window.location.href = "login.html";
  return;
}

// 👇 بعد التأكد بقى



  // عناصر الكارت الأخضر
  const liveName   = document.getElementById("liveName");
  const liveNumber = document.getElementById("liveNumber");
  const liveExp    = document.getElementById("liveExp");

  // عناصر Card Details (زي البروفايل)
  const cardNameEl = document.getElementById("detailsName");
const cardNumberEl = document.getElementById("cardNumber");
const expDateEl    = document.getElementById("cardExpiry");
const cardTypeEl   = document.getElementById("cardType");
const fullName = (user.firstName + " " + user.lastName).toUpperCase();

liveName.textContent = fullName;
cardNameEl.textContent = fullName;

  try {
   const res = await fetch(`/card/${user._id}`);
    const data = await res.json();

  if (!data.card) {
  liveName.textContent = "No Card";
  liveNumber.textContent = "**** **** **** ****";
  liveExp.textContent = "--/--";

  cardNameEl.textContent = "-";
  cardNumberEl.textContent = "-";
  expDateEl.textContent = "-";
  cardTypeEl.textContent = "-";

  document.querySelector(".payment-form").style.display = "none";
  addCardBox.style.display = "block";

  return;
}


    const card = data.card;
let fullCardNumber = card.accountNumber;
let isVisible = false;

const last4 = fullCardNumber.slice(-4);

// عرض افتراضي بالنجوم
liveNumber.textContent = "**** **** **** " + last4;
cardNumberEl.textContent = "**** **** **** " + last4;

// زرار الإظهار
document.getElementById("toggleCard").addEventListener("click", function () {

  if (!isVisible) {
    liveNumber.textContent = fullCardNumber;
    cardNumberEl.textContent = fullCardNumber;
    document.getElementById("toggleCard").textContent = "hide number";
    isVisible = true;
  } else {
    liveNumber.textContent = "**** **** **** " + last4;
    cardNumberEl.textContent = "**** **** **** " + last4;
    document.getElementById("toggleCard").textContent = "show num";
    isVisible = false;
  }

});




    // تاريخ الانتهاء
    liveExp.textContent = card.expiryDate;
    expDateEl.textContent = card.expiryDate;

    // نوع الكارت
    cardTypeEl.textContent = card.cardType;

  } catch (err) {
    console.error(err);
    showCardMessage("Failed to load card data", "error");
  }
});


  
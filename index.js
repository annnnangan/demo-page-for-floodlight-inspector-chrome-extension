const contactUsMessage = document.querySelector(".contact-us .message");
const purchaseMessage = document.querySelector(".purchase .message");

//push data layer when contact us form is submitted
document.querySelector("#contact-us-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  let formObject = {
    email: await hash(form.email.value.toLowerCase()),
  };
  contactUsMessage.innerHTML = `
    <div class="alert alert-success" role="alert">
      Thank you for submitting! We will contact you soon!
    </div>`;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "submitContactUsForm",
    hashedEmail: formObject.email,
  });
  console.log(formObject.email);
});

//push data layer when purchase
document.querySelector("#purchase-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  let order = {
    transactionId: "HK20241112022",
    totalValue: 2200,
    totalCount: 2,
    name: "Sunglasses 太陽眼鏡|Watch 手錶",
    id: "HKS20432|HKW93852",
    price: "1200|2200",
    count: "1|1",
  };

  purchaseMessage.innerHTML = `
      <div class="alert alert-success" role="alert">
        Thank you for purchase! Your order will be delivered soon.
      </div>`;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "submitContactUsForm",
    orderDetails: order,
  });
});

async function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

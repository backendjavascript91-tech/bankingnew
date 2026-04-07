const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587 ,
  auth: {
    user: "336d8adffd64e8",
    pass: "9587abb583fe7b"
  }
});

// ✅ Welcome Email
async function sendWelcomeEmail(to, name) {
  await transporter.sendMail({
    from: '"Crédit Agricole Bank" <no-reply@bank.com>',
    to,
    subject: "Welcome to Our Bank 🎉",
    html: `
      <h2>Welcome ${name} 👋</h2>
      <p>Your account has been created successfully.</p>
      <p>We are happy to have you with us 💚</p>
      <hr>
      <b>Crédit Agricole Bank</b>
    `
  });

  console.log("📩 Email sent to:", to);
}

module.exports = { sendWelcomeEmail };
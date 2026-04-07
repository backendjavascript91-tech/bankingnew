const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
  
});

async function sendWelcomeEmail(to, name) {
  try {
    const info = await transporter.sendMail({
      from: `"Bank App" <backendjavascript91@gmail.com>`,
      to,
      subject: "Welcome 🎉",
      html: `<h2>Welcome ${name}</h2>`
    });

    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.log("❌ Email error:", err);
  }
}

module.exports = { sendWelcomeEmail };
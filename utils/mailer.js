const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // مهم جدًا
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
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
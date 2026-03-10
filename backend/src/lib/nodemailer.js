import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: Number(process.env.SMTP_PORT) || 587, // fixed typo SMPT -> SMTP
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: { rejectUnauthorized: false }
});

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP Error:", error.message);
  } else {
    console.log("✅ Wconnect is ready to send emails!");
  }
});

export default transporter;
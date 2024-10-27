const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const config = require("config");
const cors = require("cors");

require("./startup/prod")(app);
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://kit.fontawesome.com https://cdn.jsdelivr.net https://unpkg.com;"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("public"));

const hhhMail = config.get("thhEmail");
const hhhPass = config.get("password");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: hhhMail,
    pass: hhhPass,
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: '"Navin Portfolio Site" <thehiringhubx@gmail.com>',
    to: "click.coctmg@gmail.com",
    subject: `Message from ${name}`,
    html: `
    <h2>New message from your portfolio site</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    <hr>
    <p>This message was sent from your portfolio's contact form.</p>
  `,
    replyTo: email,
  };

  // Email from Site
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Failed to send email");
    }
    console.log("Email sent:", info.response);

    // Auto-reply
    const replyOptions = {
      from: '"Navin Gharti (Navin Portfolio Site)" <thehiringhubx@gmail.com>',
      to: email,
      subject: `Thank you for contacting Navin Gharti`,
      html: `
  <div style="font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #ccc; border-radius: 10px; background-color: #ffffff;">
    <h2 style="color: #2E86C1; font-size: 20px;">Hello, Hi and Namastey, ${name}!</h2>
    <p style="font-size: 16px; line-height: 1.5;">Thank you for reaching out through my portfolio website! Your message is much appreciated, and it’s always a pleasure to connect!</p>
     <p style="font-size: 16px; line-height: 1.5;">I’ve received your message and will review it promptly. You can expect a response shortly—my inbox is not as scary as it sounds, I promise!</p>
      <p style="font-size: 16px; line-height: 1.5;">In the meantime, feel free to explore more of my work on the site. If you have any additional questions or thoughts, don’t hesitate to mention them in your reply.</p>
      <hr style="border-top: 1px solid #ddd;">
      <p style="font-size: 16px; line-height: 1.5;">Here’s a copy of your message for your reference:</p>
      <blockquote style="background: #f0f8ff; padding: 15px; border-left: 5px solid #2E86C1; margin: 20px 0; font-style: italic;">
        ${message}
      </blockquote>
      <p style="font-size: 16px; line-height: 1.5;">Looking forward to connecting with you soon!</p>
      <p style="margin-top: 20px; font-size: 16px; line-height: 1.5;">Best regards,<br><strong style="color: #2E86C1;">Navin Gharti</strong></p>
      <hr style="border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #999; text-align: center;">This is an automated response to confirm that your message has been received. I will respond personally!</p>
    </div>
`,
    };
    transporter.sendMail(replyOptions, (replyError, replyInfo) => {
      if (replyError) {
        console.error("Error sending auto-reply:", replyError);
        return res
          .status(500)
          .send("Email sent, but failed to send auto-reply.");
      }
      console.log("Auto-reply sent:", replyInfo.response);
      return res.status(200).send("Email and auto-reply sent successfully.");
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

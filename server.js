const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const config = require("config");
const cors = require("cors");
const port = 3000;

require("./startup/prod")(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #2E86C1;">Hello, ${name}!</h2>
      <p>Thank you for getting in touch through my portfolio website. I truly appreciate you taking the time to reach out to me.</p>
      <p>I've received your message and will carefully review it. You can expect a response shortly, and I’ll do my best to get back to you as soon as possible.</p>
      <p>In the meantime, feel free to explore more of my work on the site. If there's anything else you'd like to know, don’t hesitate to mention it when I respond.</p>
      <hr style="border-top: 1px solid #eee;">
      <p>Here’s a copy of the message you sent for your reference:</p>
      <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #2E86C1; margin: 20px 0;">
        ${message}
      </blockquote>
      <p>Looking forward to connecting with you soon.</p>
      <p style="margin-top: 20px;">Best regards,<br><strong>Navin Gharti</strong></p>
      <hr style="border-top: 1px solid #eee;">
      <p style="font-size: 12px; color: #999;">This is an automated response to acknowledge receipt of your message.</p>
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

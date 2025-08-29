const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// route for sending email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "axisfive.solution@gmail.com",       // your Gmail
        pass: "qqjw kxfd dncn eoxn"       // Gmail App Password
      }
    });

    await transporter.sendMail({
      from: email,
      to: "axisfive.solution@gmail.com",          // where you want to receive messages
      subject: `New Inquiry from ${name}`,
      text: `Message from ${name} (${email}):\n\n${message}`
    });

    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send message." });
  }
});

// start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

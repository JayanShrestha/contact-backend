import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json(`Server is running `);
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <contact@jayanshrestha.com>",
      to: "jayanshrestha055@gmail.com",
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name: </strong> ${name}</p>
        <p><strong>Email: </strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>`,
    });
    if (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
    return res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Failed to send email" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Localhost: ${process.env.PORT}`);
});

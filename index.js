import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import mongoose from "mongoose";
import Conversation from "./models/conversationModel.js";

dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log(err, "Error");
  });

const configuration = new Configuration({
  apiKey: process.env.AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello! Welcome....",
  });
});
app.post("/chat", async (req, res) => {
  try {
    // const prompt = new User({
    //   Prompt: req.body.Prompt,
    // });

    // console.log(prompt);

    const Prompt = req.body.Prompt;
    console.log(Prompt)
    

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You're a helpful chatbot assistant in a Cryptocurrency Exchange app called INOCYX . You should only answer for Inocyx Cryptocurrency exchange related queries. ",
        },
        { role: "user", content: "Hello! Hi..." },
        {
          role: "assistant",
          content: "Hello! Welcome to INOCYX. How can I assist you today?",
        },
        { role: "user", content: "what will be the timing of the office?" },
        { role: "assistant", content: " 9AM to 5PM." },
        { role: "user", content: "is the company listed in stock exchange?" },
        {
          role: "assistant",
          content: "INOCYX is not currently listed in any stock market. ",
        },
        { role: "user", content: "who are the active clients of inocyx?" },
        {
          role: "assistant",
          content: "the active clients of inocyx are amazon, ethereum, etc.,",
        },

        { role: "user", content: "How to register with INOCYX?" },

        { role: "user", content: "We didn't receive OTP" },

        { role: "user", content: "How to link mobile number?" },

        { role: "user", content: "How to change mobile number?" },

        { role: "user", content: "How to enable google aunthenticator?" },

        { role: "user", content: "How to disable google aunthenticator?" },

        {
          role: "user",
          content: "How can I come to know whether my KYC verified or not?",
        },

        { role: "user", content: "How to add my bank details?" },

        { role: "user", content: "What to do if I forgot my password?" },

        { role: "user", content: "Is google authenticator is mandatory?" },

        { role: "user", content: "How to change the login password?" },

        { role: "user", content: "How to deposit(payin)?" },

        { role: "user", content: "How to withdraw(payout)?" },

        {
          role: "user",
          content: "How to transfer crypto from one wallet to another wallet?",
        },

        { role: "user", content: "Transaction fee in your exchange?" },
        { role: "assistant", content: "0.3%" },

        { role: "user", content: "How to view transaction fee & tds%?" },

        { role: "user", content: "What is limit?" },

        { role: "user", content: "What is market?" },

        { role: "user", content: "What is stoplimit?" },

        {
          role: "user",
          content: "How & where to use limit,market & stoplimit?",
        },

        { role: "user", content: "How to buy and sell?" },

        { role: "user", content: "How to view transaction history?" },

        { role: "user", content: "How to view pending orders?" },

        {
          role: "user",
          content: "What is the size of the photo that we are uploading?",
        },
        { role: "assistant", content: "5 MB" },

        {
          role: "user",
          content:
            "What are the proof we should submitting for the KYC process?",
        },

        { role: "user", content: "Is mobile number is mandatory?" },

        {
          role: "user",
          content: "If I change my mobile number how to update it in INOCYX",
        },

        {
          role: "user",
          content: "How to view the availablity of the crypto and fiat?",
        },

        { role: "user", content: "What is Open order?" },

        { role: "user", content: "How to raise a ticket?" },

        {
          role: "user",
          content: "How many currencies are there in your exchange?",
        },

        { role: "user", content: "Minimum deposite amount of crypto" },

        { role: "user", content: "Minimum withdrawal amount of crypto" },

        { role: "user", content: "How to retrive the already sold token?" },

        { role: "user", content: "What is asset listing?" },
        { role: "user", content: "How to use asset listing?" },

        {
          role: "user",
          content: "How to raise a ticket (or) How to submit a ticket?",
        },

        { role: "user", content: "From which mail id have to raise the mail?" },

        {
          role: "user",
          content:
            "How to view the all types of crypto deposite and withdraw fees?",
        },

        {
          role: "user",
          content: "Is there any refund policy in your exchange?",
        },

        { role: "user", content: Prompt },
      ],

      temperature: 0,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    const response = completion.data.choices[0].message.content;

    const conversation = new Conversation({
      prompt: Prompt,
      response: response,
    });

    await conversation.save();

    console.log("conculsion", completion.data.choices[0]);
    res.status(200).send({ assistant: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  }
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);

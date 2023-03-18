import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config()

const configuration = new Configuration({
    // apiKey: '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'
    apiKey:  process.env.AI_API_KEY
});
const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) =>{
    res.status(200).send({ 
        message: 'Hello! Welcome....'
    })
})
app.post('/chat', async (req, res) =>{
    try {
        const prompt  = req.body.prompt;
        //const message = req.body.message
     console.log(prompt);
    const completion = await openai.createChatCompletion({ 
    
    model: "gpt-3.5-turbo", 
    messages: [ 
      { role: "system", content: "You're a helpful chatbot assistant in a Cryptocurrency Exchange app called INOCYX . You should only answer for Inocyx Cryptocurrency exchange related queries. " }, 
      { role: "user", content: "Hello! Hi..." },
      {role: "assistant", content: "Hello! Welcome to INOCYX. How can I assist you today?"},
      {role: "user", content: "what will be the timing of the offfice?" },
      {role: "assistant", content: "the timing will be 9AM to 5PM." },  
      {role: "user", content: "is the company listed in stock exchange?" },
      {role: "assistant", "content": "INOCYX is not  listed in stock exchange."},
      {role: "user", "content": "who are the active clients of inocyx?"},
      {role: "assistant", "content": "the active clients of inocyx are amazon, ethereum, etc.,"},
      {role: "assistant", "content": "they are having a plan to a new blockchain in hyperledger or to create a private blockchain."},

      
      {role: "user", content: prompt}
      
    //   [
    //     {"role": "system", "content": "You are a chatbot for crypto-currency exchange called INOCYX ."},

    //     {"role": "user", "content": "what will be the timing of the offfice?"},
    //     {"role": "assistant", "content": "the timing will be 9AM to 5PM."},

    //     {"role": "user", "content": "is the company listed in stock exchange?"},
    //     {"role": "assistant", "content": "INOCYX is not listed in stock exchange."},

    //     {"role": "user", "content": "who are the active clinets of inocyx?"},
    //     {"role": "assistant", "content": "the active clients of inocyx are amazon, ethereum, etc.,"},

    //      {"role":"user", "content": "will create its own blockchain?"},
    //     {"role": "assistant", "content": "they are having a plan to create a new blockchain in hyperledger or to create a private blockchain."},

        
    //     {"role": "user", "content": prompt}

    // ]


      // [
      //   [
      //     {"role": "user", "content": 'Translate the following English text to French: "{text}"'}
      //   ]
      // ]
    ],
      //prompt: `${prompt}`, 
      temperature: 0, 
      max_tokens: 500, 
      top_p: 1, 
      frequency_penalty: 0.5, 
      presence_penalty: 0, 
    }); 
   console.log("conculsion",completion.data.choices[0] )
    res.status(200).send({ 
      assistant: completion.data.choices[0].message.content 
    }); 
        
    } catch (error) { 
        console.error(error) 
    res.status(500).json({ message:'something went wrong'}) 
    } 
}) 

app.listen(5000, () => console.log('AI server started on http://localhost:5000')); 
// const openai = require('openai');

// openai.ChatCompletion.create({
//   model: "gpt-3.5-turbo",
//   messages: [
//     { role: "system", content: "You are a helpful assistant." },
//     { role: "user", content: "Who won the world series in 2020?" },
//     { role: "assistant", content: "The Los Angeles Dodgers won the World Series in 2020." },
//     { role: "user", content: "Where was it played?" }
//   ]
// })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.error(error);
//   });














// const { Configuration, OpenAIApi } = require('openai');

// const configuration = new Configuration({
//   apiKey: 'YOUR-OPENAPI-SECRET-KEY'
// });

// const openai = new OpenAIApi(configuration);

// async function handleEvent(event: UserSentMessageEvent, context: Context) {
//   const channel = event.channel;

//   if (channel.type !== 'DIRECT' || !channel.members.find(m => m.name === 'assistant')) return;

//   const user = event.user;

//   if (user.name === 'assistant') return;

//   const message = event.message;

//   const completion = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         'role': 'system',
//         'content': 'Your name is Ava. You are a helpful assistant.'
//       }, {
//         'role': 'user',
//         'content': message.body
//       }
//     ]
//   });

//   await context.ChatKitty.Channels.sendChannelMessage(event.message.channelId, {
//     'user': { 'username': 'assistant' },
//     'type': 'TEXT',
//     'body': completion.data.choices[0].message.content
//   });
// }
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  promptTokens: {
    type:  mongoose.Schema.Types.Mixed,
    required: false,
  },
  responseTokens: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
},{ timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
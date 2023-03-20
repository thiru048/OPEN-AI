import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  
  Prompt: {
    type: String, 
    require: true
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;

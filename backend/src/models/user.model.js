import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlenngth: 6,
  },
  profilePic : {
    type: String,
    default: "",
  },
}
, {
// Add createdAt and updatedAt timestamps
  timestamps: true,
});
//Momgo want you to use capital on 1st character and singular for model name
const User = mongoose.model("User", userSchema);

export default User;
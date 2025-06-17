import mongoose from "mongoose";

const aiAssistantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
}, {
  timestamps: true,
});

const AiAssistant = mongoose.model("AiAssistant", aiAssistantSchema);

export default AiAssistant;

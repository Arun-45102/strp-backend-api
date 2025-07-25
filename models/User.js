import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    discordID: {
      type: String,
    },
    username: {
      type: String,
    },
    discriminator: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
    },
    banner: {
      type: String,
    },
    global_name: {
      type: String,
    },
    tag: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model("User", userSchema);

export default mongoose.model("User", userSchema);

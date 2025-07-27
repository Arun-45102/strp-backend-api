import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema(
  {
    isDiscAdmin: { type: Boolean, default: false },
    isUK: { type: Boolean, default: false },
    isMod: { type: Boolean, default: false },
    isCivilian: { type: Boolean, default: false },
    isCommunity: { type: Boolean, default: false },
  },
  { _id: false }
);

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
    roles: {
      type: rolesSchema,
      default: {},
    },
    access_token: {
      type: String,
    },
    token_expiry: {
      type: Date,
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

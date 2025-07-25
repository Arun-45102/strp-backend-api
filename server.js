import "dotenv/config";
import express from "express";
import cors from "cors";
import { Client, GatewayIntentBits } from "discord.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;

const app = express();
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

connectDB();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

import channelsRoutes from "./routes/channels.js";
import guildRoutes from "./routes/guild.js";
import rolesRoutes from "./routes/roles.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./db/config.js";

app.use("/swaggerapi", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/strp-api/discord/channels", channelsRoutes);
app.use("/strp-api/discord/guild", guildRoutes);
app.use("/strp-api/discord/roles", rolesRoutes);
app.use("/strp-api/discord/users", userRoutes);
app.use("/auth/discord", authRoutes);

export default function getGuild(guildID) {
  const guild = client.guilds.fetch(guildID);
  return guild;
}

client.login(TOKEN);
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger is running on port ${PORT}/swaggerapi`);
});

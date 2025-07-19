import "dotenv/config";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Client, GatewayIntentBits } from "discord.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;

const app = express();
app.use(cors());
const server = createServer(app);

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

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/strp-api/discord/channels", channelsRoutes);
app.use("/strp-api/discord/guild", guildRoutes);
app.use("/strp-api/discord/roles", rolesRoutes);
app.use("/strp-api/discord/users", userRoutes);

export default function getGuild(guildID) {
  const guild = client.guilds.fetch(guildID);
  return guild;
}

client.login(TOKEN);
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger is running on port ${PORT}/strp-api`);
});

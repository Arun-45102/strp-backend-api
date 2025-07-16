import "dotenv/config";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Client, GatewayIntentBits } from "discord.js";

const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;
const SERVERID = process.env.SERVERID;

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


// Server details
app.get("/strp-api/discord/guildData", async (req, res) => {
  try {
    const guildData = await getGuildData(SERVERID);
    res.json({
        guild: guildData
    })
  } catch (error) {
    console.error("Error in /strp-api/discord/guildData", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
});

app.get("/strp-api/discord/getGuildMembers", async (req, res) => {
  try {
    const members = await getOnlineMembers(SERVERID);
    res.json({
      onlineMemberCount: members.size,
      onlineMembers: members,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/getGuildMembers", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
});

app.get("/strp-api/discord/getRolesData", async (req, res) => {
  try {
    const roles = await getAllRoles(SERVERID);
    res.json({
      availableRoles: roles,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/getRolesData", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
});

app.get("/strp-api/discord/getRoleData/:id", async (req, res) => {
  try {
    const roleData = await getRoleData(SERVERID, req.params.id);
    const roleMembers = {};
    roleData.forEach((role) => {
      roleMembers[role.user.id] = role.nickname;
    });
    res.json({
      count: roleData.size,
      members: roleMembers,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/getRolesCount", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
});

app.get("/strp-api/discord/getUserData/:id", async (req, res) => {
  try {
    const userData = await getUserData(SERVERID, req.params.id);
    const roles = {};
    userData.roles.cache.forEach((role) => {
      roles[role.id] = role.name;
    });
    res.json({
      user: userData,
      roles: roles,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/getRolesCount", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
});

async function getOnlineMembers(guildID) {
  const guild = await getGuild(guildID);
  const getMembers = await guild.members.fetch();
  const onlineMembers = getMembers.filter(
    (member) => member.presence && member.presence.status !== "offline"
  );
  return onlineMembers;
}

async function getUserData(guildID, userID) {
  const guild = await getGuild(guildID);
  const getMembers = await guild.members.fetch();
  const userData = getMembers.filter(
    (member) => member.id && member.id == userID
  );
  return userData.first();
}

async function getGuildData(guildID) {
  const guild = await getGuild(guildID);
  return guild;
}

async function getAllRoles(guildID) {
  const guild = await getGuild(guildID);
  const roleCounts = {};
  guild.roles.cache.forEach((role) => {
    roleCounts[role.id] = role.name;
  });
  return roleCounts;
}

async function getRoleData(guildID, roleID) {
  const guild = await getGuild(guildID);
  const count = guild.members.cache.filter((member) =>
    member.roles.cache.has(roleID)
  );

  return count;
}

async function getGuild(guildID) {
  const guild = client.guilds.fetch(guildID);
  return guild;
}

client.login(TOKEN);
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

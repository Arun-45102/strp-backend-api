import getGuild from "../server.js";

export const SERVERID = process.env.SERVERID;

export async function OnlineMembers(req, res) {
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
}

export async function UserData(req, res) {
  try {
    const userData = await getUserData(SERVERID, req.params.id);
    res.json({
      user: userData,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/getRolesCount", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
}

export async function UserRoles(req, res) {
  try {
    const roles = await getUserRoles(SERVERID, req.params.id);
    res.json({
      roles: roles,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/getRolesCount", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
}

export async function getOnlineMembers(guildID) {
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

async function getUserRoles(guildID, userID) {
  const guild = await getGuild(guildID);
  const getMembers = await guild.members.fetch();
  const roles = [];
  const userData = getMembers.filter(
    (member) => member.id && member.id == userID
  );
  const userRoles = userData.first();
  userRoles.roles.cache.forEach((role) => {
    roles.push(role);
  });
  return roles;
}

export default {
  OnlineMembers,
  UserData,
  UserRoles,
};

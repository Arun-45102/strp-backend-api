import getGuild from "../server.js";

export const SERVERID = process.env.SERVERID;

const discAdminRoles = ["957094806130151434"];
const ukRoles = ["952311242574430261"];
const modRoles = [
  "957647830242185246",
  "953699511493070878",
  "1344342679131127848",
  "1187765326671265863",
  "953266749728505898",
  "1000720500680560640",
  "1107254612567785512",
];
const immigrationRoles = ["953266749728505898", "1000720500680560640"];
const civilianRoles = ["953266785581400155"];
const communityRoles = ["953266786319626282"];

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

export async function UserRole(req, res) {
  try {
    const role = await getUserRole(SERVERID, req.params.id);
    res.json({
      role: role,
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

export async function getUserRole(guildID, userID) {
  const userRoles = await getUserRoles(guildID, userID);
  const userRoleIDs = [""];
  userRoles.forEach((role) => {
    userRoleIDs.push(role.id);
  });
  const roleGroups = {
    isDiscAdmin: userRoleIDs.some((r) => discAdminRoles.includes(r)),
    isUK: userRoleIDs.some((r) => ukRoles.includes(r)),
    isMod: userRoleIDs.some((r) => modRoles.includes(r)),
    isImmigration: userRoleIDs.some((r) => immigrationRoles.includes(r)),
    isCivilian: userRoleIDs.some((r) => civilianRoles.includes(r)),
    isCommunity: userRoleIDs.some((r) => communityRoles.includes(r)),
  };
  return roleGroups;
}

export default {
  OnlineMembers,
  UserData,
  UserRoles,
  UserRole,
  getUserRole,
};

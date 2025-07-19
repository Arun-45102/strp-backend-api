import getGuild from "../server.js";

const SERVERID = process.env.SERVERID;

export async function RolesData(req, res) {
  try {
    const roles = await getAllRoles(SERVERID);
    res.json({
      availableRoles: roles,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/getRolesData", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
}

export async function RolesName(req, res) {
  try {
    const roleName = await getRoleName(SERVERID, req.params.id);
    res.json({
      rolename: roleName,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/getRolesData", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
}

export async function RoleData(req, res) {
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
}

async function getAllRoles(guildID) {
  const guild = await getGuild(guildID);
  const roleCounts = {};
  guild.roles.cache.forEach((role) => {
    roleCounts[role.id] = role.name;
  });
  return roleCounts;
}

async function getRoleName(guildID, roleID) {
  const guild = await getGuild(guildID);
  const getRoles = await guild.roles.fetch();
  const roleName = getRoles.filter((role) => role.id && role.id == roleID);
  return roleName.first();
}

async function getRoleData(guildID, roleID) {
  const guild = await getGuild(guildID);
  const count = guild.members.cache.filter((member) =>
    member.roles.cache.has(roleID)
  );

  return count;
}

export default {
  RolesData,
  RolesName,
  RoleData,
};

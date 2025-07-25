import getGuild from "../server.js";

const SERVERID = process.env.SERVERID;

export async function GuildData(req, res) {
  try {
    const guildData = await getGuildData(SERVERID);
    res.json({
      guild: guildData,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/guildData", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
}

export async function ScheduledEvents(req, res) {
  try {
    const events = await getScheduledEvents(SERVERID);
    res.json({
      events: events,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/guildData", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
}

export async function getGuildData(guildID) {
  const guild = await getGuild(guildID);
  return guild;
}

async function getScheduledEvents(guildID) {
  const guild = await getGuild(guildID);
  const events = [];
  guild.scheduledEvents.cache.filter((event) => {
    events.push(event);
  });
  return events;
}

export default {
  GuildData,
  ScheduledEvents,
  getGuildData
};
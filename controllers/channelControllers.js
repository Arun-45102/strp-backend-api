import getGuild from "../server.js";

const SERVERID = process.env.SERVERID;

export async function ChannelsData(req, res) {
  try {
    const channels = await getAllChannels(SERVERID);
    res.json({
      availableChannels: channels,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/getChannelsData", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
}

export async function ChannelName(req, res) {
  try {
    const channelName = await getChannelName(SERVERID, req.params.id);
    res.json({
      channelname: channelName,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/getChannelName", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
}

export async function ChannelMessages(req, res) {
  try {
    const channelMessages = await getChannelMessages(SERVERID, req.params.id);
    res.json({
      channelmessages: channelMessages,
    });
  } catch (error) {
    console.error("Error in /strp-api/discord/getChannelMessages", error);
    res.status(500).json({ error: "Error fetching member count" });
  }
}

async function getAllChannels(guildID) {
  const guild = await getGuild(guildID);
  const channelsCounts = {};
  guild.channels.cache.forEach((channel) => {
    channelsCounts[channel.id] = channel.name;
  });
  return channelsCounts;
}

async function getChannelName(guildID, channelID) {
  const guild = await getGuild(guildID);
  const getChannels = await guild.channels.fetch();
  const channelName = getChannels.filter(
    (channel) => channel.id && channel.id == channelID
  );
  return channelName.first();
}

async function getChannelMessages(guildID, channelID) {
  const guild = await getGuild(guildID);
  const channel = guild.channels.cache.get(channelID);
  let chamessages = [];
  const allMessages = await channel.messages.fetch({ limit: 10 });
  chamessages.push(...allMessages.values());
  return chamessages;
}

export default {
  ChannelsData,
  ChannelName,
  ChannelMessages,
};

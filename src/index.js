import { Client, Events, GatewayIntentBits, ChannelType, PermissionFlagsBits } from 'discord.js';
import { requireEnv, errorLabel } from './config.js';
import { welcomeMember } from './welcome.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
let config;
async function getChannel() {
  const channel = await client.channels.fetch(config.channelId);
  if (!channel || channel.guildId !== config.guildId || channel.type !== ChannelType.GuildText) throw new Error('Channel tidak valid');
  if (!channel.permissionsFor(client.user)?.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages])) throw new Error('Izin channel tidak cukup');
  return channel;
}
client.once(Events.ClientReady, async (ready) => {
  try {
    await getChannel();
    console.log(`${ready.user.tag} siap menyambut anggota baru di channel ${config.channelId}.`);
  } catch {
    console.error('Periksa ID server, ID channel sambutan, serta izin View Channel dan Send Messages.');
    client.destroy();
    process.exitCode = 1;
  }
});
client.on(Events.GuildMemberAdd, async (member) => {
  try { await welcomeMember(member, config, getChannel); }
  catch (error) { console.error(`Sambutan gagal: ${errorLabel(error)}.`); }
});
client.on(Events.Error, (error) => console.error(`Koneksi bermasalah: ${errorLabel(error)}.`));
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => { client.destroy(); process.exit(0); });
}
try {
  config = { guildId: requireEnv('DISCORD_GUILD_ID'), channelId: requireEnv('WELCOME_CHANNEL_ID') };
  await client.login(requireEnv('DISCORD_TOKEN'));
} catch {
  console.error('Bot gagal aktif. Periksa ketiga nilai .env, internet, dan Server Members Intent.');
  client.destroy();
  process.exitCode = 1;
}

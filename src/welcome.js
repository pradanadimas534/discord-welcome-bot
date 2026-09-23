export async function welcomeMember(member, config, getChannel) {
  if (member.guild.id !== config.guildId || member.user.bot) return;
  const channel = await getChannel();
  if (channel.id !== config.channelId || channel.guildId !== config.guildId) throw new Error('Tujuan sambutan tidak sesuai konfigurasi');
  await channel.send({
    content: `👋 Selamat datang <@${member.id}> di **${member.guild.name}**!\nSenang kamu bergabung. Semoga betah dan selamat bersenang-senang! 🎉`,
    allowedMentions: { parse: [], users: [member.id] },
  });
}

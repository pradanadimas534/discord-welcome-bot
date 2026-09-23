import test from 'node:test';
import assert from 'node:assert/strict';
import { welcomeMember } from '../src/welcome.js';
const config = { guildId: 'guild', channelId: 'welcome' };
const member = { id: '123', user: { bot: false }, guild: { id: 'guild', name: 'Komunitas @everyone' } };
test('satu sambutan dan hanya mention anggota baru', async () => {
  const sent = [];
  await welcomeMember(member, config, async () => ({ id: 'welcome', guildId: 'guild', send: async (body) => sent.push(body) }));
  assert.equal(sent.length, 1);
  assert.match(sent[0].content, /Selamat datang <@123>/);
  assert.deepEqual(sent[0].allowedMentions, { parse: [], users: ['123'] });
});
test('abaikan bot dan server lain tanpa akses channel', async () => {
  const unexpected = () => assert.fail('Tidak boleh mengambil channel');
  await welcomeMember({ ...member, user: { bot: true } }, config, unexpected);
  await welcomeMember({ ...member, guild: { id: 'other' } }, config, unexpected);
});
test('tolak tujuan channel atau server yang salah', async () => {
  for (const channel of [{ id: 'other', guildId: 'guild' }, { id: 'welcome', guildId: 'other' }]) {
    await assert.rejects(welcomeMember(member, config, async () => ({ ...channel, send: () => assert.fail('Tidak boleh mengirim') })), /Tujuan sambutan/);
  }
});

# Bot Selamat Datang

Bot menyambut anggota manusia yang baru bergabung, hanya di satu channel teks. Bot mengabaikan bot lain dan server lain, tidak membalas chat atau mengirim DM. Anggota yang masuk saat bot offline tidak disambut ulang.

## Buat aplikasi Discord

1. Buka https://discord.com/developers/applications lalu pilih New Application.
2. Pada Bot, buat/reset token. Simpan token hanya di file .env lokal, jangan bagikan ke chat.
3. Aktifkan Bot → Privileged Gateway Intents → Server Members Intent. Message Content Intent dan Presence Intent tidak diperlukan.
4. Pada Installation, aktifkan Guild Install dengan scope bot. Jangan berikan Administrator atau Manage Channels. Pasang bot menggunakan tautan instalasi.
5. Aktifkan Discord User Settings → Advanced → Developer Mode. Klik kanan server → Copy Server ID; klik kanan channel selamat datang → Copy Channel ID.

## Batasi akses hanya ke channel sambutan

Kode membatasi pengiriman ke satu channel. Agar akses Discord juga dibatasi, atur izin server berikut:

1. Pastikan tidak ada role bot yang memiliki Administrator.
2. Pada setiap kategori lain, buka Edit Category → Permissions, tambahkan akun bot sebagai MEMBER override, lalu set View Channel = Deny (X merah). Ini hanya membatasi bot tersebut.
3. Pastikan channel di dalamnya tersinkron dengan kategori. Untuk channel yang tidak tersinkron atau berada di luar kategori, tambahkan override akun bot dengan View Channel = Deny langsung pada channel tersebut.
4. Pada channel selamat datang, tambahkan akun bot dengan View Channel = Allow dan Send Messages = Allow. Read Message History boleh ditolak karena tidak dibutuhkan.
5. Setiap membuat channel/kategori baru, terapkan pembatasan yang sama atau sinkronkan dengan kategori yang sudah dibatasi.

Mematikan View Channel di role server saja tidak cukup karena izin dapat diwarisi dari @everyone. Override akun bot pada channel/kategori mengatasi izin dari role biasa lain. Administrator tetap melewati pembatasan ini, jadi jangan berikan izin tersebut. Bot menerima kejadian anggota bergabung pada level server untuk menyambut mereka; tidak membutuhkan akses membaca chat lain.

## Jalankan di PowerShell

Gunakan Node.js 22.12 atau lebih baru.

```powershell
cd 'C:\Program Codding\discord-bot'
npm.cmd install
Copy-Item .env.example .env
notepad .env
```

Isi DISCORD_TOKEN, DISCORD_GUILD_ID, dan WELCOME_CHANNEL_ID lalu simpan. Jangan menimpa .env yang sudah diisi ketika mengulang setup.

```powershell
npm.cmd run check
npm.cmd test
npm.cmd start
```

Bot aktif selama proses berjalan. Ctrl+C untuk berhenti. Untuk 24 jam, gunakan mesin/server yang selalu menyala. Ubah teks sambutan di src/welcome.js.

## Verifikasi di server

Setelah log siap menyambut muncul, minta anggota baru bergabung. Pastikan satu sambutan muncul hanya di channel tujuan. Periksa override izin seluruh kategori/channel. Tes lokal tidak membuktikan pengaturan izin server sudah benar.

Jika gagal login, periksa token, koneksi, dan Server Members Intent. Jika channel gagal diakses, periksa ID server/channel serta View Channel dan Send Messages. Bot tidak mengubah izin Discord secara otomatis.

Referensi resmi:
- https://support-dev.discord.com/hc/en-us/articles/6207308062871-What-are-Privileged-Intents
- https://support.discord.com/hc/en-us/articles/10543994968087-Channel-Permissions-Settings-101

export function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Isi ${name} di file .env terlebih dahulu.`);
  if (name.endsWith('_ID') && !/^\d{17,20}$/.test(value)) {
    throw new Error(`${name} harus berupa ID Discord, bukan nama server/aplikasi.`);
  }
  return value;
}

// Jangan mencetak objek error Discord: objek tersebut dapat berisi data request.
export function errorLabel(error) {
  return typeof error?.code === 'number' ? `kode Discord ${error.code}` : 'periksa koneksi, konfigurasi, dan izin bot';
}

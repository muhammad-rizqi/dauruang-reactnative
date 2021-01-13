import {api} from '../API/webapi';

export const updateProfile = (userId, nama_lengkap, email, telepon, lokasi) => {
  const data = {
    nama_lengkap,
    email,
    telepon,
    lokasi: JSON.stringify({
      ...lokasi,
      latitude: parseFloat(lokasi.latitude),
      longitude: parseFloat(lokasi.longitude),
    }),
  };
  return api('PATCH', '/users/' + userId, data);
};

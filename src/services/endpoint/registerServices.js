import {api} from '../API/webapi';

export const register = async (
  nama_lengkap,
  email,
  password,
  telepon,
  lokasi,
) => {
  const body = {
    nama_lengkap,
    email,
    password,
    telepon,
    lokasi,
  };

  return api('POST', '/register', body);
};

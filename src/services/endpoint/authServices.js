import {api} from '../API/webapi';

export const register = (nama_lengkap, email, password, telepon, lokasi) => {
  const body = {
    nama_lengkap,
    email,
    password,
    telepon,
    lokasi,
  };

  return api('POST', '/register', body);
};

export const login = (email, password) => {
  const body = {
    email,
    password,
  };

  return api('POST', '/login', body);
};

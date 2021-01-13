import {api} from '../API/webapi';
import {createFormData} from '../helper/helper';

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

export const changePassword = (
  userId,
  password,
  new_password,
  password_confirmation,
) => {
  const data = {
    password,
    new_password,
    password_confirmation,
  };
  return api('PATCH', `/users/${userId}/password`, data);
};

export const deleteAcount = (userId, password) => {
  const data = {
    password,
  };
  return api('DELETE', `/users/${userId}`, data);
};

export const changeAvatar = (userId, avatar) => {
  const data = new FormData();

  data.append('avatar', {
    name: avatar.fileName,
    type: avatar.type,
    uri: avatar.uri,
  });
  console.log('sending');
  return api('PATCH', `/users/${userId}/avatar`, data, avatar);
};

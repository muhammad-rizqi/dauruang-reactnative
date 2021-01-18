import {api} from '../API/webapi';

export const getContact = (userId) => {
  return api('GET', '/chat/' + userId);
};

export const sendMessage = (userId, to, pesan) => {
  const body = {
    to,
    pesan,
  };
  return api('POST', '/chat/' + userId, body);
};

export const getMessage = (userId, to) => {
  const body = {
    to,
  };
  return api('POST', '/chat/' + userId + '/messages', body);
};

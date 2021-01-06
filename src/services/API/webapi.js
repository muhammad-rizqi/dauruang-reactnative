export const host = 'http://192.168.1.46:3000/api';
import store from '../../redux/store';

export const api = (method, path, body = null, file = null) => {
  const {token} = store.getState();
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  file ? null : headers.append('Content-Type', 'application/json');
  token !== null ? headers.append('Authorization', 'Bearer ' + token) : null;

  const data = fetch(host + path, {
    method: method,
    headers: headers,
    body: method === 'GET' ? null : JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson);
      return resJson;
    });

  return data;
};

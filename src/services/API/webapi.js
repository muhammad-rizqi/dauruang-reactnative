export const host = 'http://192.168.1.46:3000/api';
import {ToastAndroid} from 'react-native';
import {clearToken} from '../../redux/action';
import store from '../../redux/store';
import {removeToken} from '../storage/Token';

export const api = (method, path, body = null, file = null) => {
  const {token} = store.getState();
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  file ? null : headers.append('Content-Type', 'application/json');
  token !== null ? headers.append('Authorization', 'Bearer ' + token) : null;

  const data = fetch(host + path, {
    method: method,
    headers: headers,
    body: method === 'GET' ? null : file ? body : JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((resJson) => {
      if (resJson.message) {
        if (resJson.message.split(' ')[0] === 'Token') {
          removeToken();
          store.dispatch(clearToken());
        }
      }
      console.log(resJson);
      return resJson;
    })
    .catch(() => ToastAndroid.show('Gagal menyambung', ToastAndroid.LONG));

  return data;
};

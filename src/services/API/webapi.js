export const host = 'https://192.168.1.46:3000/api';

export const api = (method, path, body = null, file = null) => {
  const data = fetch(host + path, {
    method: method,
    body: body,
  })
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson);
    });

  return data;
};

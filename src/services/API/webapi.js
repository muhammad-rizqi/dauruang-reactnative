export const host = 'http://192.168.1.46:3000/api';

export const api = (method, path, body = null, file = null) => {
  const data = fetch(host + path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson);
      return resJson;
    });

  return data;
};

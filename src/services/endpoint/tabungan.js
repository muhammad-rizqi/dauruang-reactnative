import {setSaldo} from '../../redux/nasabahAction';
import store from '../../redux/store';
import {api} from '../API/webapi';

export const getSaldo = (userId) => {
  const data = {loading: true, data: 0, error: false};
  store.dispatch(setSaldo(data));

  api('GET', '/saldo/' + userId)
    .then((res) => {
      if (res.code === 200) {
        data.data = res.data.saldo;
      } else {
        data.error = res.error;
      }
    })
    .catch((e) => (data.error = e.message))
    .finally(() => {
      data.loading = false;
      store.dispatch(setSaldo(data));
    });
};

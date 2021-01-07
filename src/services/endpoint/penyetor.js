import {api} from '../API/webapi';
import store from '../../redux/store';
import {
  setDataPenjemputan,
  setDataPenyetoran,
} from '../../redux/penyetorAction';

export const getDataSetoran = () => {
  const data = {loading: true, data: 0, error: false};
  store.dispatch(setDataPenyetoran(data));
  api('GET', '/penyetoran')
    .then((res) => {
      if (res.code === 200) {
        data.data = res.data;
      } else {
        data.error = res.error;
      }
    })
    .catch((e) => (data.error = e.message))
    .finally(() => {
      data.loading = false;
      store.dispatch(setDataPenyetoran(data));
    });
};

export const getDataJemputan = () => {
  const data = {loading: true, data: 0, error: false};
  store.dispatch(setDataPenjemputan(data));
  api('GET', '/penjemputan')
    .then((res) => {
      if (res.code === 200) {
        data.data = res.data;
      } else {
        data.error = res.error;
      }
    })
    .catch((e) => (data.error = e.message))
    .finally(() => {
      data.loading = false;
      store.dispatch(setDataPenjemputan(data));
    });
};

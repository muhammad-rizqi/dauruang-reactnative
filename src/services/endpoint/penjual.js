import {api} from '../API/webapi';
import store from '../../redux/store';
import {
  setPenjualan,
  setSaldoPenjual,
  setStok,
} from '../../redux/penjualAction';

export const getDataPenjualan = () => {
  const data = {loading: true, data: 0, error: false};
  store.dispatch(setPenjualan(data));
  api('GET', '/penjualan')
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
      store.dispatch(setPenjualan(data));
    });
};

export const getStok = () => {
  const data = {loading: true, data: 0, error: false};
  store.dispatch(setStok(data));
  api('GET', '/stok')
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
      store.dispatch(setStok(data));
    });
};

export const getSaldoPenjualan = () => {
  const data = {loading: true, data: 0, error: false};
  store.dispatch(setSaldoPenjual(data));
  api('GET', '/penjualan/saldo')
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
      store.dispatch(setSaldoPenjual(data));
    });
};

export const jualSampah = (pengurusId, jenis_sampah, client, harga, berat) => {
  const data = {
    id_pengurus: pengurusId,
    jenis_sampah,
    client,
    harga,
    berat,
  };
  return api('POST', '/penjualan', data);
};

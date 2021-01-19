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

export const confirmJemput = (penjemputanId, pengurusId, status) => {
  const data = {
    id_pengurus: pengurusId,
    status: status,
  };
  return api('PATCH', '/penjemputan/' + penjemputanId, data);
};

export const addSetor = (nasabahId, jenis_sampah, berat, dijemput) => {
  const data = {
    id_nasabah: nasabahId,
    jenis_sampah,
    berat,
    dijemput,
  };
  return api('POST', '/penyetoran', data);
};

export const setSaldoPenjual = (data) => {
  return {
    type: 'SET_PENJUAL_SALDO',
    data: data,
  };
};

export const setPenjualan = (data) => {
  return {
    type: 'SET_PENJUALAN',
    data: data,
  };
};

export const setStok = (data) => {
  return {
    type: 'SET_STOK',
    data: data,
  };
};

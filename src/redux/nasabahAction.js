export const setSaldo = (data) => {
  return {
    type: 'SET_SALDO',
    data: data,
  };
};

export const setPenarikan = (data) => {
  return {
    type: 'SET_PENARIKAN',
    data: data,
  };
};

export const setPenyetoran = (data) => {
  return {
    type: 'SET_PENYETORAN',
    data: data,
  };
};

export const setPenjemputan = (data) => {
  return {
    type: 'SET_PENJEMPUTAN',
    data: data,
  };
};

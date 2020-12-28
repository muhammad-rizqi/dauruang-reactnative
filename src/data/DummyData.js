export const penyetoran = {
  code: 200,
  data: [
    {
      id: 1,
      id_nasabah: 1,
      tanggal: '2020-20-21',
      keterangan: 'penyetoran',
      jenis_sampah: 1,
      berat: 2,
      debit: 200000,
      kredit: 10000,
      saldo: 200000,
      relation: {
        jenis_sampah: {
          id: 1,
          nama_kategori: 'besi',
          harga: 2000,
        },
      },
    },
    {
      id: 2,
      id_nasabah: 1,
      tanggal: '2020-20-21',
      keterangan: 'penyetoran',
      jenis_sampah: 1,
      berat: 2,
      debit: 200000,
      kredit: 10000,
      saldo: 200000,
      relation: {
        jenis_sampah: {
          id: 1,
          nama_kategori: 'besi',
          harga: 2000,
        },
      },
    },
  ],
};

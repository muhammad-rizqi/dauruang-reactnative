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
          nama_kategori: 'Besi',
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
          nama_kategori: 'Besi',
          harga: 2000,
        },
      },
    },
    {
      id: 3,
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
          nama_kategori: 'Besi',
          harga: 2000,
        },
      },
    },
    {
      id: 4,
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
          nama_kategori: 'Besi',
          harga: 2000,
        },
      },
    },
    {
      id: 5,
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
          nama_kategori: 'Besi',
          harga: 2000,
        },
      },
    },
    {
      id: 6,
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
          nama_kategori: 'Besi',
          harga: 2000,
        },
      },
    },
  ],
};

export const penarikan = {
  code: 200,
  data: [
    {
      id: 1,
      id_nasabah: 1,
      tanggal: '2020-20-20',
      keterangan: 'penarikan',
      kredit: 1000000,
      saldo: 1000000,
    },
    {
      id: 2,
      id_nasabah: 1,
      tanggal: '2020-20-20',
      keterangan: 'penarikan',
      kredit: 1000000,
      saldo: 1000000,
    },
  ],
};

export const penjemputan = {
  code: 200,
  data: [
    {
      id: 1,
      id_nasabah: 1,
      id_pengurus: 1,
      tanggal: '2020-20-20',
      nama_pengirim: 'Kevin',
      telepon: '0801918217272',
      keterangan: 'Bang jemput kayak biasa',
      lokasi: 'http://maps.com/aksjdashdjahdahsdsaj',
      status: 1, // 0 : pending, 1: "dijemput", 2: "selesai", 3: "dibatalkan"
      relation: {
        pengurus: {
          id: 1,
          nama_lengkap: 'Jono',
          telepon: '0801918217272',
          lokasi: 'http://maps.com/aksjdashdjahdahsdsaj',
          avatar: 'http://avatar.com/ajskdaksdhasdhkas.jpg',
        },
      },
    },
    {
      id: 2,
      id_nasabah: 1,
      id_pengurus: null,
      tanggal: '2020-20-20',
      nama_pengirim: 'Kevin',
      telepon: '0801918217272',
      keterangan: 'Bang jemput kayak biasa',
      lokasi: 'http://maps.com/aksjdashdjahdahsdsaj',
      status: 0,
      relation: null,
    },
  ],
};

export const chatList = {
  code: 200,
  data: [
    {
      to: 1,
      from: 2,
      unread: 10,
      relation: {
        to: {
          id: 1,
          nama_lengkap: 'Kevin',
          avatar: 'https://ui-avatars.com/api/?name=Kevin',
        },
        from: {
          id: 2,
          nama_lengkap: 'Joni',
          avatar: 'https://ui-avatars.com/api/?name=Joni',
        },
      },
    },
    {
      to: 1,
      from: 2,
      unread: 10,
      relation: {
        to: {
          id: 1,
          nama_lengkap: 'Kevin',
          avatar: 'https://ui-avatars.com/api/?name=Joni',
        },
        from: {
          id: 2,
          nama_lengkap: 'Joni',
          avatar: 'https://ui-avatars.com/api/?name=Joni',
        },
      },
    },
  ],
};

export const chatItem = {
  code: 200,
  data: [
    {
      id: 1,
      from: 1,
      to: 2,
      pesan: 'Oke siap bang',
      is_read: 1,
      created_at: '2020-20-20 10.00',
    },
    {
      id: 2,
      from: 2,
      to: 1,
      pesan: 'Rojer ',
      is_read: 0,
      created_at: '2020-20-20 10.00',
    },
    {
      id: 3,
      from: 1,
      to: 2,
      pesan: 'Oke siap bang',
      is_read: 1,
      created_at: '2020-20-20 10.00',
    },
    {
      id: 4,
      from: 2,
      to: 1,
      pesan: 'Rojer ',
      is_read: 0,
      created_at: '2020-20-20 10.00',
    },
    {
      id: 5,
      from: 1,
      to: 2,
      pesan: 'Oke siap bang',
      is_read: 1,
      created_at: '2020-20-20 10.00',
    },
    {
      id: 6,
      from: 2,
      to: 1,
      pesan: 'Rojer ',
      is_read: 0,
      created_at: '2020-20-20 10.00',
    },
    {
      id: 7,
      from: 1,
      to: 2,
      pesan: 'Oke siap bang',
      is_read: 1,
      created_at: '2020-20-20 10.00',
    },
    {
      id: 8,
      from: 2,
      to: 1,
      pesan: 'Rojer ',
      is_read: 0,
      created_at: '2020-20-20 10.00',
    },
  ],
};

export const dataSetoran = {
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
        nasabah: {
          id: 1,
          nama_lengkap: 'Kevin',
          telepon: '0801918217272',
          lokasi: 'http://maps.com/aksjdashdjahdahsdsaj',
          avatar: 'http://avatar.com/ajskdaksdhasdhkas.jpg',
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
        nasabah: {
          id: 1,
          nama_lengkap: 'Kevin',
          telepon: '0801918217272',
          lokasi: 'http://maps.com/aksjdashdjahdahsdsaj',
          avatar: 'http://avatar.com/ajskdaksdhasdhkas.jpg',
        },
      },
    },
  ],
};

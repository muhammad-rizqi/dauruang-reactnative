import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../style/styles';

const ListPenyetoran = ({dataPenyetoran}) => {
  return dataPenyetoran.data !== null && dataPenyetoran.data.length > 0 ? (
    dataPenyetoran.data.map((setoran) => (
      <View
        key={setoran.id}
        style={[
          styles.card,
          styles.row,
          styles.backgroundWhite,
          styles.marginVS,
        ]}>
        <View style={styles.flex1}>
          <Text style={[styles.textH3, styles.text]}>
            {setoran.relation.jenis_sampah.nama_kategori} {setoran.berat}Kg
          </Text>
          <Text style={styles.textNote}>{setoran.tanggal}</Text>
        </View>
        <View style={styles.centerCenter}>
          <Text style={[styles.textCenter, styles.textNote]}>
            Total Pemasukan
          </Text>
          <Text style={styles.textH3}>Rp. {setoran.debit},-</Text>
        </View>
      </View>
    ))
  ) : (
    <Text>Data Kosong</Text>
  );
};

export default ListPenyetoran;

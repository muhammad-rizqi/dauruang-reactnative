import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  penarikan,
  penjemputan,
  dataSetoran,
  dataPenjualan,
  dataStock,
} from '../../data/DummyData';
import CenterMenu from '../../components/CenterMenu';

const DashboardPenjualan = (props) => {
  const [content, setContent] = useState(1);
  const [dataPenyetoran, setDataPenyetoran] = useState(null);
  const [dataPenarikan, setDataPenarikan] = useState(null);
  const [dataPenjemputan, setDataPenjemputan] = useState(null);

  useEffect(() => {
    setDataPenyetoran(dataSetoran);
    setDataPenarikan(penarikan);
    setDataPenjemputan(penjemputan);
  }, []);

  return (
    <View style={styles.flex1}>
      <View
        style={[
          styles.backgroundPrimary,
          styles.paddingM,
          styles.row,
          styles.centerCenter,
        ]}>
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <Icon name="bars" size={20} color={colors.white} />
        </TouchableWithoutFeedback>
        <View style={[styles.flex1, styles.marginHM]}>
          <Text style={[styles.textH3, styles.textWhite]}>Daur Uang</Text>
        </View>
      </View>
      <ScrollView style={[styles.backgroundLight, styles.flex1]}>
        <View
          style={[
            styles.backgroundPrimary,
            styles.container,
            styles.roundBottom,
          ]}>
          <Text style={[styles.textH3, styles.textWhite]}>
            Hello, Pengurus Penjualan
          </Text>
          <View style={styles.marginVM}>
            <Text style={[styles.textWhite]}>Saldo Keuangan Kita</Text>
            <Text style={[styles.textH2, styles.textWhite]}>
              Rp. 5.000.000,-
            </Text>
            <View style={styles.marginVM} />
          </View>
        </View>
        <View style={styles.centerCard}>
          <View
            style={[
              styles.backgroundWhite,
              styles.card,
              styles.marginHL,
              styles.row,
              styles.absoluteBottom,
            ]}>
            <CenterMenu
              icon="truck-check"
              active={content === 1}
              text="Penjualan"
              onPress={() => setContent(1)}
            />
            <CenterMenu
              icon="warehouse"
              active={content === 2}
              text="Belum Dijual"
              onPress={() => setContent(2)}
            />
          </View>
        </View>

        <View style={styles.container}>
          {content === 1 ? (
            dataPenjualan.data !== null && dataPenjualan.data.length > 0 ? (
              dataPenjualan.data.map((jual) => (
                <View
                  key={jual.id}
                  style={[
                    styles.card,
                    styles.row,
                    styles.backgroundWhite,
                    styles.marginVS,
                  ]}>
                  <View style={styles.flex1}>
                    <Text style={styles.textNote}>
                      ID Penjualan : #{jual.id}
                    </Text>
                    <View style={styles.marginVS}>
                      <Text style={[styles.text, styles.textH3]}>
                        {jual.relation.jenis_sampah.nama_kategori} {jual.berat}
                        Kg
                      </Text>
                      <Text style={styles.textNote}>{jual.tanggal}</Text>
                    </View>
                  </View>
                  <View style={styles.centerCenter}>
                    <Text style={[styles.textCenter, styles.textNote]}>
                      Total Penjualan
                    </Text>
                    <Text style={styles.textH3}>Rp. {jual.debit},-</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>Data Kosong</Text>
            )
          ) : content === 2 ? (
            dataStock ? (
              dataStock.data.length > 0 ? (
                dataStock.data.map((stock) => (
                  <View
                    key={stock.id}
                    style={[
                      styles.card,
                      styles.backgroundWhite,
                      styles.marginVS,
                      styles.row,
                    ]}>
                    <View style={styles.flex1}>
                      <Text style={styles.textNote}>
                        ID Kategori: #{stock.id}
                      </Text>
                      <Text style={styles.textH3}>{stock.nama_kategori}</Text>
                    </View>
                    <View style={styles.centerCenter}>
                      <Text style={styles.textNote}>Stock</Text>
                      <Text style={styles.textH3}>{stock.stok_gudang}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text>Kosong</Text>
              )
            ) : (
              <Text>Kosong</Text>
            )
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardPenjualan;

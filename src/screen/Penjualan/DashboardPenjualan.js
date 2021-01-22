import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import CenterMenu from '../../components/CenterMenu';
import {useSelector} from 'react-redux';
import {
  getDataPenjualan,
  getSaldoPenjualan,
  getStok,
} from '../../services/endpoint/penjual';
import ButtonView from '../../components/ButtonView';
import {toDate, toPrice} from '../../services/helper/helper';

const DashboardPenjualan = ({navigation}) => {
  const [content, setContent] = useState(1);
  const {user, penjual} = useSelector((state) => state);
  console.log(penjual.penjualan);

  const getData = () => {
    getSaldoPenjualan();
    getStok();
    getDataPenjualan();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.flex1}>
      <StatusBar backgroundColor={colors.primary} />
      <View
        style={[
          styles.backgroundPrimary,
          styles.paddingM,
          styles.row,
          styles.centerCenter,
        ]}>
        <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
          <Icon name="bars" size={20} color={colors.white} />
        </TouchableWithoutFeedback>
        <View style={[styles.flex1, styles.marginHM]}>
          <Text style={[styles.textH3, styles.textWhite]}>Daur Uang</Text>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={penjual.saldo.loading}
            onRefresh={() => {
              getData();
            }}
          />
        }
        style={[styles.backgroundLight, styles.flex1]}>
        <View
          style={[
            styles.backgroundPrimary,
            styles.container,
            styles.roundBottom,
          ]}>
          <Text style={[styles.textH3, styles.textWhite]}>
            Hello, {user.nama_lengkap}
          </Text>
          <View style={styles.marginVM}>
            <Text style={[styles.textWhite]}>Saldo Keuangan Kita</Text>
            <Text style={[styles.textH2, styles.textWhite]}>
              Rp. {toPrice(penjual.saldo.data)},-
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
          <ButtonView
            title="Setor Sampah"
            dark
            onPress={() => navigation.navigate('Jual')}
          />
          {content === 1 ? (
            penjual.penjualan.data !== null &&
            penjual.penjualan.data.length > 0 ? (
              penjual.penjualan.data.map((jual) => (
                <View
                  key={jual.id}
                  style={[
                    styles.card,
                    styles.row,
                    styles.backgroundWhite,
                    styles.marginVS,
                  ]}>
                  <View style={styles.flex1}>
                    <View style={styles.marginVS}>
                      <Text style={[styles.text, styles.textH3]}>
                        {jual.relation.jenis_sampah.nama_kategori} {jual.berat}
                        Kg
                      </Text>
                      <Text style={styles.textNote}>
                        {toDate(jual.tanggal)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.centerCenter}>
                    <Text style={[styles.textCenter, styles.textNote]}>
                      Total Penjualan
                    </Text>
                    <Text style={styles.textH3}>
                      Rp. {toPrice(jual.debit)},-
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>Data Kosong</Text>
            )
          ) : content === 2 ? (
            penjual.stok ? (
              penjual.stok.data.length > 0 ? (
                penjual.stok.data.map((stock) => (
                  <View
                    key={stock.id}
                    style={[
                      styles.card,
                      styles.backgroundWhite,
                      styles.marginVS,
                      styles.row,
                    ]}>
                    <View style={styles.flex1}>
                      <Text style={styles.textNote}>Kategori</Text>
                      <Text style={[styles.textH3, styles.text]}>
                        {stock.nama_kategori}
                      </Text>
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

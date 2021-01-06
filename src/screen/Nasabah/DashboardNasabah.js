/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListPenyetoran from '../../components/ListPenyetoran';
import CenterMenu from '../../components/CenterMenu';
import {useSelector} from 'react-redux';
import {getSaldo} from '../../services/endpoint/tabungan';
import {
  penarikanNasabah,
  penjemputanNasabah,
  penyetoranNasabah,
} from '../../services/endpoint/nasabah';

const DashboardNasabah = (props) => {
  const [content, setContent] = useState(1);
  const {user, nasabah} = useSelector((state) => state);

  useEffect(() => {
    getSaldo(user.id);
    penjemputanNasabah(user.id);
    penyetoranNasabah(user.id);
    penarikanNasabah(user.id);
  }, []);
  console.log('ini data', JSON.stringify(nasabah.penyetoran));
  return (
    <View style={styles.flex1}>
      <View
        style={[
          styles.backgroundPrimary,
          styles.paddingM,
          styles.row,
          styles.centerCenter,
        ]}>
        <TouchableWithoutFeedback onPress={() => props.navigation.openDrawer()}>
          <Icon name="bars" size={20} color={colors.white} />
        </TouchableWithoutFeedback>
        <View style={[styles.flex1, styles.marginHM]}>
          <Text style={[styles.textH3, styles.textWhite]}>Daur Uang</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('ChatList')}>
          <Icon name="comment" size={20} color={colors.white} />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView style={[styles.backgroundLight, styles.flex1]}>
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
            {nasabah.saldo.loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <>
                <Text style={[styles.textWhite]}>Saldo Anda</Text>
                <Text style={[styles.textH2, styles.textWhite]}>
                  Rp. {JSON.stringify(nasabah.saldo.data)},-
                </Text>
              </>
            )}
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
              icon="cube-send"
              active={content === 1}
              text="Penyetoran"
              onPress={() => setContent(1)}
            />
            <CenterMenu
              icon="progress-download"
              active={content === 2}
              text="Penarikan"
              onPress={() => setContent(2)}
            />
            <CenterMenu
              icon="dump-truck"
              active={content === 3}
              text="Jemput"
              onPress={() => setContent(3)}
            />
          </View>
        </View>

        <View style={styles.container}>
          {content === 1 ? (
            nasabah.penyetoran ? (
              <ListPenyetoran dataPenyetoran={nasabah.penyetoran} />
            ) : (
              <Text>Kosong</Text>
            )
          ) : content === 2 ? (
            nasabah.penarikan ? (
              nasabah.penarikan.data.length > 0 ? (
                nasabah.penarikan.data.map((tarik) => (
                  <View
                    key={tarik.id}
                    style={[
                      styles.card,
                      styles.backgroundWhite,
                      styles.marginVS,
                      styles.row,
                    ]}>
                    <View style={styles.flex1}>
                      <Text style={styles.textNote}>
                        ID Penarikan: #{tarik.id}
                      </Text>
                      <Text style={styles.textNote}>Tanggal Penarikan</Text>
                      <Text style={styles.textH3}>{tarik.tanggal}</Text>
                    </View>
                    <View style={styles.centerCenter}>
                      <Text style={styles.textNote}>Total Penarikan: </Text>
                      <Text style={styles.textH3}>Rp. {tarik.kredit},-</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text>Kosong</Text>
              )
            ) : (
              <Text>Kosong</Text>
            )
          ) : content === 3 ? (
            nasabah.penjemputan ? (
              nasabah.penjemputan.data.length > 0 ? (
                nasabah.penjemputan.data.map((jemput) => (
                  <View
                    key={jemput.id}
                    style={[
                      styles.card,
                      styles.backgroundWhite,
                      styles.marginVS,
                      styles.row,
                    ]}>
                    <View style={styles.flex1}>
                      <Text style={styles.textNote}>
                        ID Penarikan: #{jemput.id}
                      </Text>
                      <Text style={styles.text}>{jemput.tanggal}</Text>
                      <Text style={styles.textH3}>{jemput.nama_pengirim}</Text>
                      <Text style={styles.text}>{jemput.keterangan}</Text>
                      <Text style={styles.textNote}>{jemput.lokasi}</Text>
                    </View>
                    <View>
                      <MaterialIcon
                        name={
                          jemput.status === 0
                            ? 'progress-clock'
                            : jemput.status === 1
                            ? 'account-check'
                            : jemput.status === 2
                            ? 'truck-check'
                            : jemput.status === 3
                            ? 'close-circle'
                            : 'progress-clock'
                        }
                        size={24}
                        color={colors.grey}
                      />
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

export default DashboardNasabah;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CenterMenu from '../../components/CenterMenu';
import {useSelector} from 'react-redux';
import {
  getDataJemputan,
  getDataSetoran,
} from '../../services/endpoint/penyetor';

const DashboardSetoran = ({navigation}) => {
  const [content, setContent] = useState(1);
  const [loading, setLoading] = useState(false);

  const {user, penyetor} = useSelector((state) => state);

  const getData = () => {
    try {
      getDataJemputan();
      getDataSetoran();
    } finally {
      setLoading(false);
    }
  };

  console.log('ini dari penyetoran', penyetor.penjemputan);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.flex1}>
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
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ChatList')}>
          <Icon name="comment" size={20} color={colors.white} />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
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
              icon="dump-truck"
              active={content === 2}
              text="Jemput"
              onPress={() => setContent(2)}
            />
          </View>
        </View>

        <View style={styles.container}>
          {content === 1 ? (
            penyetor.penyetoran.data !== null &&
            penyetor.penyetoran.data.length > 0 ? (
              penyetor.penyetoran.data.map((setoran) => (
                <View
                  key={setoran.id}
                  style={[
                    styles.card,
                    styles.row,
                    styles.backgroundWhite,
                    styles.marginVS,
                  ]}>
                  <View style={styles.flex1}>
                    <Text style={styles.textNote}>
                      ID Penyetoran : #{setoran.id}
                    </Text>
                    <View style={styles.marginVS}>
                      <Text style={[styles.textH3, styles.text]}>
                        {setoran.relation.nasabah.nama_lengkap}
                      </Text>
                      <Text style={[styles.text]}>
                        {setoran.relation.jenis_sampah.nama_kategori}{' '}
                        {setoran.berat}Kg
                      </Text>
                      <Text style={styles.textNote}>{setoran.tanggal}</Text>
                    </View>
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
            )
          ) : content === 2 ? (
            penyetor.penjemputan ? (
              penyetor.penjemputan.data.length > 0 ? (
                penyetor.penjemputan.data.map((jemput) => (
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
                        ID Penjemputan: #{jemput.id}
                      </Text>
                      <Text style={styles.text}>{jemput.tanggal}</Text>
                      <View style={styles.marginVS}>
                        <Text style={[styles.textH3, styles.text]}>
                          {jemput.nama_pengirim}
                        </Text>
                        <Text style={styles.text}>{jemput.keterangan}</Text>
                        <Text style={styles.textNote}>
                          {JSON.parse(jemput.lokasi).name}
                        </Text>
                      </View>
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

export default DashboardSetoran;

import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {penarikan, penyetoran, penjemputan} from '../../data/DummyData';
import ListPenyetoran from '../../components/ListPenyetoran';
import CenterMenu from '../../components/CenterMenu';

const DashboardNasabah = (props) => {
  const [content, setContent] = useState(1);
  const [dataPenyetoran, setDataPenyetoran] = useState(null);
  const [dataPenarikan, setDataPenarikan] = useState(null);
  const [dataPenjemputan, setDataPenjemputan] = useState(null);

  useEffect(() => {
    setDataPenyetoran(penyetoran);
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
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
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
          <Text style={[styles.textH3, styles.textWhite]}>Hello, Kevin</Text>
          <View style={styles.marginVM}>
            <Text style={[styles.textWhite]}>Saldo Anda</Text>
            <Text style={[styles.textH2, styles.textWhite]}>Rp. 50.000,-</Text>
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
            dataPenyetoran ? (
              <ListPenyetoran dataPenyetoran={dataPenyetoran} />
            ) : (
              <Text>Kosong</Text>
            )
          ) : content === 2 ? (
            dataPenarikan ? (
              dataPenarikan.data.length > 0 ? (
                dataPenarikan.data.map((tarik) => (
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
            dataPenjemputan ? (
              dataPenjemputan.data.length > 0 ? (
                dataPenjemputan.data.map((jemput) => (
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
                      <Text>{jemput.tanggal}</Text>
                      <Text style={styles.textH3}>{jemput.nama_pengirim}</Text>
                      <Text>{jemput.keterangan}</Text>
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

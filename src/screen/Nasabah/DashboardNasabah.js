import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {penarikan, penyetoran} from '../../data/DummyData';
import ListPenyetoran from '../../components/ListPenyetoran';

const DashboardNasabah = (props) => {
  const [content, setContent] = useState(1);
  const [dataPenyetoran, setDataPenyetoran] = useState(null);
  const [dataPenarikan, setDataPenarikan] = useState(null);

  useEffect(() => {
    setDataPenyetoran(penyetoran);
    setDataPenarikan(penarikan);
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
            <TouchableOpacity
              style={[styles.flex1, styles.centerCenter]}
              onPress={() => setContent(1)}>
              <MaterialIcon
                name="cube-send"
                size={content === 1 ? 40 : 24}
                color={colors.primary}
              />
              <Text
                style={[
                  content === 1 ? styles.textMedium : null,
                  styles.textCenter,
                  styles.textPrimary,
                ]}>
                Penyetoran
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setContent(2)}
              style={[styles.flex1, styles.centerCenter]}>
              <MaterialIcon
                name="progress-download"
                size={content === 2 ? 40 : 24}
                color={colors.primary}
              />
              <Text
                style={[
                  content === 2 ? styles.textMedium : null,
                  styles.textPrimary,
                  styles.textCenter,
                ]}>
                Penarikan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setContent(3)}
              style={[styles.flex1, styles.centerCenter]}>
              <MaterialIcon
                name="dump-truck"
                size={content === 3 ? 40 : 24}
                color={colors.primary}
              />
              <Text
                style={[
                  content === 3 ? styles.textMedium : null,
                  styles.textPrimary,
                  styles.textCenter,
                ]}>
                Jemput
              </Text>
            </TouchableOpacity>
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
            <Text>Content3</Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardNasabah;

import React, {useState} from 'react';
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

const DashboardNasabah = (props) => {
  const [content, setContent] = useState(1);
  return (
    <ScrollView style={[styles.backgroundLight, styles.flex1]}>
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
      <View
        style={[
          styles.backgroundWhite,
          styles.card,
          styles.marginHL,
          styles.bottomXL,
          styles.row,
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
      <View style={{borderWidth: 1}}></View>
    </ScrollView>
  );
};

export default DashboardNasabah;

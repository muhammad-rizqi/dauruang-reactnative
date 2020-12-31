import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {chatList} from '../../data/DummyData';

const ChatList = (props) => {
  return (
    <ScrollView style={[styles.backgroundLight, styles.flex1]}>
      <View style={[styles.row, styles.centerCenter, styles.container]}>
        <TouchableWithoutFeedback>
          <Icon name="chevron-left" size={26} color={colors.primary} />
        </TouchableWithoutFeedback>
        <Text
          style={[
            styles.textH3,
            styles.textPrimary,
            styles.flex1,
            styles.marginHM,
          ]}>
          Pesan
        </Text>
      </View>
      <View style={[styles.flex1]}>
        {chatList.data.map((chat, index) => (
          <TouchableNativeFeedback key={index}>
            <View style={[styles.row, styles.container]}>
              <Image
                source={{uri: chat.relation.from.avatar}}
                style={styles.avatarM}
              />
              <View style={styles.centerCenter}>
                <Text style={[styles.textH3, styles.marginHM]}>
                  {chat.relation.from.nama_lengkap}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        ))}
      </View>
    </ScrollView>
  );
};

export default ChatList;

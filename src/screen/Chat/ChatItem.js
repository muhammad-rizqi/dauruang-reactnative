import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InputView from '../../components/InputView';
import {chatItem} from '../../data/DummyData';
import {colors, styles} from '../../style/styles';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatItem = (props) => {
  return (
    <View style={[styles.backgroundLight, styles.flex1]}>
      <View
        style={[
          styles.row,
          styles.centerCenter,
          styles.marginHM,
          styles.marginVS,
        ]}>
        <TouchableWithoutFeedback>
          <Icon name="chevron-left" size={26} color={colors.primary} />
        </TouchableWithoutFeedback>
        <Image
          source={{uri: 'https://ui-avatars.com/api/?name=Joni'}}
          style={[styles.avatarM, styles.marginHS]}
        />
        <Text style={[styles.textH3, styles.textPrimary, styles.flex1]}>
          Joni
        </Text>
      </View>
      <ScrollView>
        <View style={[styles.flex1, styles.marginHM]}>
          {chatItem.data.map((chat) => (
            <TouchableNativeFeedback key={chat.id}>
              <View
                style={[
                  styles.marginVS,
                  styles.card,
                  chat.from === 1 //TODO change this to id
                    ? [styles.backgroundSecondary, styles.chatFrom]
                    : [styles.backgroundPrimary, styles.chatTo],
                ]}>
                <View>
                  <Text style={chat.to === 1 ? styles.textWhite : styles.text}>
                    {chat.pesan}
                  </Text>
                </View>
                <View>
                  <Text style={styles.textNoteWhite}>{chat.created_at}</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
      </ScrollView>
      <View style={[styles.marginVS, styles.marginHS, styles.row]}>
        <View style={styles.flex1}>
          <InputView placeholder="Tulis Pesan ..." />
        </View>
        <TouchableOpacity style={[styles.centerCenter, styles.marginHS]}>
          <MaterialIcon name="send-circle" size={40} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatItem;

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InputView from '../../components/InputView';
import {colors, styles} from '../../style/styles';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {sendMessage, getMessage} from '../../services/endpoint/chat';

const ChatItem = ({navigation, route}) => {
  const {to} = route.params;
  const {user} = useSelector((state) => state);
  const [message, setMessage] = useState('');
  const [chatItem, setChatItem] = useState([]);
  const scrollViewRef = useRef();

  const onClickSend = async () => {
    try {
      const response = await sendMessage(user.id, to.id, message);
      if (response.code !== 200) {
        ToastAndroid.show('Gagal mengirim', ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show('Gagal mengirim', ToastAndroid.LONG);
      console.log(error);
    } finally {
      setMessage(null);
      getMessages();
    }
  };

  const getMessages = () => {
    getMessage(user.id, to.id)
      .then((res) => {
        if (res.code === 200) {
          setChatItem(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMessages();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={[styles.backgroundLight, styles.flex1]}>
      <View
        style={[
          styles.row,
          styles.centerCenter,
          styles.marginHM,
          styles.marginVS,
        ]}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={26} color={colors.primary} />
        </TouchableWithoutFeedback>
        <Image
          source={{uri: to.avatar}}
          style={[styles.avatarM, styles.marginHS]}
        />
        <Text style={[styles.textH3, styles.textPrimary, styles.flex1]}>
          {to.nama_lengkap}
        </Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: false})
        }>
        <View style={[styles.flex1, styles.marginHM]}>
          {chatItem.map((chat) => (
            <TouchableNativeFeedback key={chat.id}>
              <View
                style={[
                  styles.marginVS,
                  styles.card,
                  chat.from !== user.id //TODO change this to id
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
          <InputView
            placeholder="Tulis Pesan ..."
            value={message}
            onChangeText={(m) => setMessage(m)}
          />
        </View>
        <TouchableOpacity
          style={[styles.centerCenter, styles.marginHS]}
          onPress={onClickSend}>
          <MaterialIcon name="send-circle" size={40} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatItem;

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
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InputView from '../../components/InputView';
import {colors, styles} from '../../style/styles';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {sendMessage, getMessage} from '../../services/endpoint/chat';
import {toHour} from '../../services/helper/helper';
import _ from 'lodash';
import Pusher from 'pusher-js/react-native';

const ChatItem = ({navigation, route}) => {
  const {to} = route.params;
  const {user} = useSelector((state) => state);
  const [message, setMessage] = useState('');
  const [chatItem, setChatItem] = useState([]);
  const scrollViewRef = useRef();
  useEffect(() => {
    var pusher = new Pusher('dd8cf49ab599dd57da5d', {
      cluster: 'ap1',
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data) => {
      if (
        (data.from === to.id && data.to === user.id) ||
        (data.from === user.id && data.to === to.id)
      ) {
        getMessages();
      }
    });
  }, []);

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
      <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content" />
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
          {chatItem.length > 0 && (
            <Text style={[styles.textCenter, styles.textMedium]}>
              {chatItem[0].created_at.slice(0, 10)}
            </Text>
          )}
          {chatItem.map((chat, index) => (
            <View key={index}>
              {chatItem.length > 2 ? (
                chatItem[index - 1] ? (
                  _.isEqual(
                    chatItem[index - 1].created_at.slice(0, 10),
                    chatItem[index].created_at.slice(0, 10),
                  ) ? null : (
                    <Text style={[styles.textCenter, styles.textMedium]}>
                      {chatItem[index].created_at.slice(0, 10)}
                    </Text>
                  )
                ) : null
              ) : null}
              <TouchableNativeFeedback key={chat.id}>
                <View
                  style={[
                    styles.marginVS,
                    styles.card,
                    chat.from !== user.id
                      ? [styles.backgroundSecondary, styles.chatFrom]
                      : [styles.backgroundPrimary, styles.chatTo],
                  ]}>
                  <View>
                    <Text
                      style={
                        chat.to !== user.id ? styles.textWhite : styles.text
                      }>
                      {chat.pesan}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.textNoteWhite}>
                      {toHour(chat.created_at)}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
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

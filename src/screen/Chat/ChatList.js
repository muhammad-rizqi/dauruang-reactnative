/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  TouchableNativeFeedback,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {getContact} from '../../services/endpoint/chat';

const ChatList = ({navigation}) => {
  const [contact, setContact] = useState([]);
  const {user} = useSelector((state) => state);
  const [loading, setLoading] = useState(false);

  const getChatContact = () => {
    setLoading(true);
    getContact(user.id)
      .then((result) => {
        console.log(result);
        if (result.code === 200) {
          setContact(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getChatContact();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={[styles.backgroundLight, styles.flex1]}>
      <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content" />
      <View style={[styles.row, styles.centerCenter, styles.container]}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
        {loading ? (
          <ActivityIndicator color={colors.primary} size="large" />
        ) : (
          contact.map((chat, index) => (
            <TouchableNativeFeedback
              key={index}
              onPress={() =>
                navigation.navigate('ChatItem', {to: chat.relation.to})
              }>
              <View style={[styles.row, styles.container]}>
                <Image
                  source={{uri: chat.relation.to.avatar}}
                  style={styles.avatarM}
                />
                <View style={styles.centerCenter}>
                  <Text style={[styles.textH3, styles.marginHM]}>
                    {chat.relation.to.nama_lengkap}
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default ChatList;

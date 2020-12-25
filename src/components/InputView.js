import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, styles} from '../style/styles';

const InputView = ({
  placeholder,
  name,
  onIconPress,
  secure,
  value,
  onChangeText,
}) => {
  return (
    <View style={[styles.textInput, styles.backgroundWhite, styles.row]}>
      <TextInput
        secureTextEntry={secure}
        placeholder={placeholder}
        style={[styles.flex1, styles.marginHM]}
        value={value}
        onChangeText={() => onChangeText()}
      />
      {name ? (
        <TouchableOpacity
          onPress={() => onIconPress()}
          style={[styles.centerCenter, styles.marginHS]}>
          <Icon name={name} size={24} color={colors.primary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default InputView;
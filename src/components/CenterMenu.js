import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colors, styles} from '../style/styles';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CenterMenu = ({icon, active, onPress, text}) => {
  return (
    <TouchableOpacity
      style={[styles.flex1, styles.centerCenter]}
      onPress={() => onPress()}>
      <MaterialIcon
        name={icon}
        size={active ? 40 : 24}
        color={colors.primary}
      />
      <Text
        style={[
          active ? styles.textMedium : null,
          styles.textCenter,
          styles.textPrimary,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CenterMenu;

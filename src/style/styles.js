import {StyleSheet} from 'react-native';

export const colors = {
  primary: '#0C6170',
  secondary: '#37BEB0',
  tertiary: '#A4E5E0',
  lightBg: '#DBF5F0',
  white: '#fefefe',
};

export const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  backgroundLight: {
    backgroundColor: colors.lightBg,
  },
  centerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textH1: {
    fontWeight: 'bold',
    fontSize: 36,
    color: colors.primary,
  },
  textH2: {
    fontWeight: 'bold',
    fontSize: 36,
    color: colors.primary,
  },
  backgroundWhite: {
    backgroundColor: colors.white,
  },
  marginHXL: {
    marginHorizontal: 42,
  },
  marginVM: {
    marginVertical: 16,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  textMedium: {
    fontWeight: '700',
    color: colors.white,
    fontSize: 14,
  },
  lottieButton: {width: 19, height: 19},
});

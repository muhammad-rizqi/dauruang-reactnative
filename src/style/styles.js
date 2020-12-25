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
  backgroundWhite: {
    backgroundColor: colors.white,
  },
  backgroundPrimary: {
    backgroundColor: colors.primary,
  },
  backgroundSecondary: {
    backgroundColor: colors.secondary,
  },
  centerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerItem: {alignItems: 'center'},
  textH1: {
    fontWeight: 'bold',
    fontSize: 36,
    color: colors.primary,
  },
  textUppercase: {textTransform: 'uppercase'},
  textH2: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.primary,
  },
  textCenter: {
    textAlign: 'center',
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
    alignItems: 'center',
  },
  textMedium: {
    fontWeight: '700',
    fontSize: 14,
  },
  textWhite: {
    color: colors.white,
  },
  lottieButton: {width: 19, height: 19},
});

import {StyleSheet} from 'react-native';

export const colors = {
  primary: '#0C6170',
  secondary: '#37BEB0',
  tertiary: '#A4E5E0',
  lightBg: '#DBF5F0',
  white: '#f5f5f5',
};

export const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  row: {flexDirection: 'row'},
  container: {padding: 16},
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
  },
  textUppercase: {textTransform: 'uppercase'},
  textH2: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  textPrimary: {color: colors.primary},
  textSecondary: {color: colors.secondary},
  textCenter: {
    textAlign: 'center',
  },
  textInput: {borderWidth: 1, borderRadius: 5, borderColor: colors.secondary},
  marginHXL: {
    marginHorizontal: 42,
  },
  marginHM: {
    marginHorizontal: 16,
  },
  marginHS: {
    marginHorizontal: 8,
  },
  marginVM: {
    marginVertical: 16,
  },
  marginVXL: {
    marginVertical: 32,
  },
  marginVS: {
    marginVertical: 8,
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

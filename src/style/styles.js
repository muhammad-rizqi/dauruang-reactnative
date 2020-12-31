import {StyleSheet, Dimensions} from 'react-native';

export const widthScreen = Dimensions.get('screen').width;

export const colors = {
  primary: '#0C6170',
  secondary: '#37BEB0',
  tertiary: '#A4E5E0',
  lightBg: '#DBF5F0',
  white: '#f5f5f5',
  grey: '#8e8e8e',
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
  textH2: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  textH3: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textUppercase: {textTransform: 'uppercase'},
  textPrimary: {color: colors.primary},
  textSecondary: {color: colors.secondary},
  textCenter: {
    textAlign: 'center',
  },
  textInput: {borderWidth: 1, borderRadius: 5, borderColor: colors.secondary},
  marginHXL: {
    marginHorizontal: 42,
  },
  marginHL: {
    marginHorizontal: 24,
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
  textNote: {
    fontSize: 12,
    color: colors.grey,
  },
  textWhite: {
    color: colors.white,
  },
  lottieButton: {width: 19, height: 19},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    width: widthScreen - 32,
    height: widthScreen - 32,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.secondary,
  },
  paddingM: {
    padding: 16,
  },
  roundBottom: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    elevation: 4,
  },
  bottomXL: {bottom: 40},
  centerCard: {position: 'relative', height: 42},
  absoluteBottom: {position: 'absolute', bottom: 0},
  avatarM: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grey,
  },
});

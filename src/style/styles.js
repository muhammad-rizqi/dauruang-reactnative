import {StyleSheet, Dimensions} from 'react-native';

export const widthScreen = Dimensions.get('screen').width;

export const colors = {
  primary: '#116530',
  secondary: '#18a558',
  tertiary: '#a3ebb1',
  lightBg: '#fff',
  white: '#fefefe',
  lightGrey: '#fafafa',
  grey: '#5F5F5F',
  black: '#1f1f1f',
  opacity: '#1f1f1f99',
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
  backgroundOpacity: {
    backgroundColor: colors.opacity,
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
  textInput: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.lightGrey,
  },
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
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 5,
  },
  textMedium: {
    fontWeight: '700',
    fontSize: 14,
  },
  textNote: {
    fontSize: 12,
    color: colors.grey,
  },
  textNoteWhite: {
    fontSize: 12,
    color: colors.white,
  },
  textWhite: {
    color: colors.white,
  },
  text: {
    color: colors.black,
  },
  lottieButton: {width: 19, height: 19},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    elevation: 3,
    width: widthScreen - 32,
    height: widthScreen - 32,
  },
  widthScreenBox: {
    height: widthScreen,
  },
  paddingM: {
    padding: 16,
  },
  paddingS: {
    padding: 8,
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
  },
  avatarL: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  chatTo: {
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  chatFrom: {
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  space: {
    justifyContent: 'space-between',
  },
  topBorderCurve: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  elevation: {
    elevation: 5,
  },
});

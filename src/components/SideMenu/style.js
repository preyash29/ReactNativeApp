import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItem: (active = false) => ({
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    // backgroundColor: active ? 'black' : 'transparent',
  }),
  drawerRouteText: {
    letterSpacing: 0.3,
    // marginLeft: 10,
    color: 'black',
    fontSize:18,
    fontWeight:'bold'
    
  },
  itemContainer: {
    flex: 0.8,
    padding: 15,
  },
  bottomSection: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  versionInfo: {marginBottom: 5},
  logoutContainer: {
    borderTopColor: 'black',
    borderTopWidth: 0.5,
  },
  versionText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  },
  logoutSection: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 0.2,
  },
  copyRightText:{
    fontSize:12
  }
});

export default styles;
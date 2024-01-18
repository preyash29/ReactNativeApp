import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  I18nManager,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import Home from '../components/Home/Home';
import Category from '../components/Category/Category';
import Notification from '../components/Notification/Notification';
import Profile from '../components/Profile/Profile';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useNavigation} from '@react-navigation/native';
import Registor from '../components/Registor/Registor';
import Login from '../components/Login/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLogout} from '../redux/auth/authSlice';
import {useNavigationState, CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const DrawerNavigator = createDrawerNavigator();
const TabNavigator = createBottomTabNavigator();
const StackNavigator = createStackNavigator();
const LoginStack = () => (
  <StackNavigator.Navigator
    screenOptions={{
      headerShown: false, // Hide the header globally
    }}>
    <StackNavigator.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false,
        headerTitle: '',
      }}
    />
    <StackNavigator.Screen
      name="Registor"
      component={Registor}
      options={{
        headerShown: false,
        headerTitle: '',
      }}
    />
    <StackNavigator.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        headerTitle: '',
      }}
    />
  </StackNavigator.Navigator>
);
const TabsLeft = () => {
  const {t} = useTranslation();

  return (
    <TabNavigator.Navigator
      screenOptions={{
        activeTintColor: '#980404',
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        style: {
          backgroundColor: 'white',
        },
      }}>
      <TabNavigator.Screen
        name="Home"
        component={Home}
        options={({route}) => ({
          headerShown: false,
          tabBarLabel: t('Home'),
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name="home" // AntDesign home icon
              size={size}
              color={color}
            />
          ),
        })}
      />
      <TabNavigator.Screen
        name="Category"
        component={Category}
        options={({route}) => ({
          headerShown: false,
          tabBarLabel: t('Category'),
          tabBarIcon: ({color, size, focused}) => (
            <Icons
              name="category" // AntDesign home icon
              size={size}
              color={color}
            />
          ),
        })}
      />
      <TabNavigator.Screen
        name="Notification"
        component={Notification}
        options={({route}) => ({
          headerShown: false,
          tabBarLabel: t('Notification'),
          tabBarIcon: ({color, size, focused}) => (
            <Icons
              name="notifications-on" // AntDesign home icon
              size={size}
              color={color}
            />
          ),
        })}
      />
      <TabNavigator.Screen
        name="Profile"
        component={Profile}
        options={({route}) => ({
          headerShown: false,
          tabBarLabel: t('Profile'),
          tabBarIcon: ({color, size, focused}) => (
            <FontAwesome5
              name="user-tie" // AntDesign home icon
              size={size}
              color={color}
            />
          ),
        })}
      />
    </TabNavigator.Navigator>
  );
};
const TabsRight = () => {
  const {t} = useTranslation();
  return (
    <TabNavigator.Navigator
      screenOptions={{
        activeTintColor: '#980404',
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        style: {
          backgroundColor: 'white',
        },
      }}>
      <TabNavigator.Screen
        name="Profile"
        component={Profile}
        options={({route}) => ({
          headerShown: false,
          tabBarLabel: t('Profile'),
          tabBarIcon: ({color, size, focused}) => (
            <FontAwesome5
              name="user-tie" // AntDesign home icon
              size={size}
              color={color}
            />
          ),
        })}
      />
      <TabNavigator.Screen
        name="Notification"
        component={Notification}
        options={({route}) => ({
          headerShown: false,
          tabBarLabel: t('Notification'),
          tabBarIcon: ({color, size, focused}) => (
            <Icons
              name="notifications-on" // AntDesign home icon
              size={size}
              color={color}
            />
          ),
        })}
      />

      <TabNavigator.Screen
        name="Category"
        component={Category}
        options={({route}) => ({
          headerShown: false,
          tabBarLabel: t('Category'),
          tabBarIcon: ({color, size, focused}) => (
            <Icons
              name="category" // AntDesign home icon
              size={size}
              color={color}
            />
          ),
        })}
      />
      <TabNavigator.Screen
        name="Home"
        component={Home}
        options={({route}) => ({
          headerShown: false,
          tabBarLabel: t('Home'),
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name="home" // AntDesign home icon
              size={size}
              color={color}
            />
          ),
        })}
      />
    </TabNavigator.Navigator>
  );
};
const Tabs = () => {
  const {i18n} = useTranslation();

  // Determine the tabBarPosition based on the selected language
  const tabBarPosition = i18n.language === 'ar' ? 'right' : 'left';

  return tabBarPosition === 'left' ? <TabsLeft /> : <TabsRight />;
};
const {width, height} = Dimensions.get('window');
const DrawerContent = ({navigation, route}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigation.closeDrawer();
    dispatch(setLogout());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  const [isWomenFashionVisible, setIsWomenFashionVisible] = useState(false);
  const [isSubWomenFashionVisible, setIsSubWomenFashionVisible] =
    useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const handleWomenFashionPress = () => {
    setIsWomenFashionVisible(!isWomenFashionVisible);
    setIsSubWomenFashionVisible(false);
  };
  const handleWomenSubFashionPress = () => {
    setIsSubWomenFashionVisible(!isSubWomenFashionVisible);
  };
  const {t, i18n} = useTranslation();
  const changeLanguageButtonHandler = () => {
    // Toggle between English and Hindi for demonstration
    const langCode = i18n.language === 'en' ? 'ar' : 'en';
    changeLanguage(langCode);
  };
  const [showLanguagesList, setShowLanguagesList] = useState(true);

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
    setShowLanguagesList(false);
    console.log('Selected Language:', t(lang));
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{}}>
        <View style={{backgroundColor: '#fff8bd', padding: 20}}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5 name="user-circle" size={35} color="#9f0202" />
            <View style={{alignSelf: 'center', paddingHorizontal: 10, flex: 1}}>
              <Text
                style={{color: '#9f0202', fontSize: 18, fontWeight: 'bold'}}>
                John Mark
              </Text>
            </View>
            <View style={{alignSelf: 'center'}}>
              <FontAwesome5 name="user-edit" size={18} color="#9f0202" />
            </View>
          </View>
        </View>
      </View>
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Tabs')}>
          <Text
            style={{
              textTransform: 'uppercase',
              color: '#040404',
              fontWeight: 'bold',
              letterSpacing: 0.3,
            }}>
            {t('Home')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Registor')}>
              <Text
                style={{
                  textTransform: 'uppercase',
                  color: '#040404',
                  fontWeight: 'bold',
                  letterSpacing: 0.3,
                }}>
                Change language
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../assests/en.png')}
            style={{width: (width * 5) / 100, height: 20}}
          />
        </View>
      </View>
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TouchableOpacity onPress={handleWomenFashionPress}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text
              style={{
                textTransform: 'uppercase',
                color: '#040404',
                fontWeight: 'bold',
                letterSpacing: 0.3,
              }}>
              Women's fashion
            </Text>
            <View style={{alignSelf: 'center'}}>
              <MaterialIcons
                name={
                  isWomenFashionVisible
                    ? 'keyboard-arrow-down'
                    : 'keyboard-arrow-right'
                }
                size={25}
                color="#040404"
              />
            </View>
          </View>
        </TouchableOpacity>

        {isWomenFashionVisible && (
          <View style={{marginTop: 10}}>
            <TouchableOpacity onPress={handleWomenSubFashionPress}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: '#040404',
                    letterSpacing: 0.3,
                  }}>
                  Women's clothing
                </Text>
                <View style={{alignSelf: 'center'}}>
                  <MaterialIcons
                    name={
                      isSubWomenFashionVisible
                        ? 'keyboard-arrow-down'
                        : 'keyboard-arrow-right'
                    }
                    size={25}
                    color="#040404"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/* You can add more components or content as needed */}
          </View>
        )}
        {isSubWomenFashionVisible && (
          <View>
            <Text style={{color: '#040404', fontWeight: 'bold'}}>
              Women's fashion content goes here!
            </Text>
          </View>
        )}
      </View>

      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TouchableOpacity onPress={handleLogout}>
          <Text
            style={{
              textTransform: 'uppercase',
              color: '#040404',
              fontWeight: 'bold',
              letterSpacing: 0.3,
            }}>
            {t('LOGOUT')}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.btns}>
          <TouchableOpacity
            style={[
              styles.btn,
              selectedLanguage === 'en' ? styles.selectedBtn : null,
            ]}
            onPress={changeLanguageButtonHandler}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'white', marginRight: 5}}>
                {i18n.language === 'ar' ? t('English') : t('عربي')}
              </Text>
              <Image
                source={
                  i18n.language === 'en'
                    ? require('../assests/ar.png')
                    : require('../assests/en.png')
                }
                style={{
                  width: (width * 5) / 100,
                  height: (height * 3) / 100,
                  alignSelf: 'center',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const CustomHeaderleft = () => {
  const navigation = useNavigation();

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };
  const HomeScreen = () => {
    navigation.navigate('Home');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        width: width,
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: 10,
      }}>
      <View style={{alignSelf: 'center', width: (width * 10) / 100}}>
        <TouchableOpacity onPress={handleDrawerOpen}>
          <Icons name="menu" size={30} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={{flex: 0.9}}>
        <TouchableOpacity onPress={HomeScreen}>
          <Image
            source={require('../assests/Logo.png')} // Replace with your image path
            style={{
              width: '70%',
              height: 50,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <View style={{padding: 5}}>
          <Icon name="search1" size={30} color="gray" />
        </View>
        <View style={{padding: 5}}>
          <Icon name="hearto" size={30} color="gray" />
        </View>
        <View style={{padding: 5}}>
          <Icon name="shoppingcart" size={30} color="gray" />
        </View>
      </View>
    </View>
  );
};
const CustomHeaderRight = () => {
  const navigation = useNavigation();

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };
  const HomeScreen = () => {
    navigation.navigate('Home');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        width: width,
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: 10,
      }}>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <View style={{padding: 5}}>
          <Icon name="search1" size={30} color="gray" />
        </View>
        <View style={{padding: 5}}>
          <Icon name="hearto" size={30} color="gray" />
        </View>
        <View style={{padding: 5}}>
          <Icon name="shoppingcart" size={30} color="gray" />
        </View>
      </View>
      <View style={{flex: 0.9}}>
        <TouchableOpacity onPress={HomeScreen}>
          <Image
            source={require('../assests/Logo.png')} // Replace with your image path
            style={{
              width: '70%',
              height: 50,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{alignSelf: 'center', width: (width * 10) / 100}}>
        <TouchableOpacity onPress={handleDrawerOpen}>
          <Icons name="menu" size={30} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default function AppContainer() {
  const {i18n} = useTranslation();
  const isLanguageHindi = i18n.language === 'ar';
  const drawerPosition = isLanguageHindi ? 'right' : 'left';
  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        drawerPosition: drawerPosition,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <DrawerNavigator.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerTitle: '',
          headerLeft: () => {
            if (isLanguageHindi) {
              return <CustomHeaderRight />;
            } else {
              return <CustomHeaderleft />;
            }
          },
        }}
      />
      <DrawerNavigator.Screen
        name="Login"
        component={LoginStack}
        options={{headerTitle: '', headerShown: false}}
      />
    </DrawerNavigator.Navigator>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    margin: 20,
    width: width - 20,
    // height: height / 2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  languageItem: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  btns: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btn: {
    width: (width * 50) / 100,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBtn: {
    backgroundColor: '#980404', // You can set your desired background color
  },
  container: {
    flex: 1,
  },
  drawerItem: (active = false) => ({
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    // backgroundColor: active ? 'black' : 'transparent',
  }),
  drawerRouteText: {
    letterSpacing: 0.4,
    // marginLeft: 10,
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
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
  versionInfo: {
    marginBottom: 20,
  },
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
  copyRightText: {
    fontSize: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191266',
  },
  button: {
    backgroundColor: '#6258e8',
    padding: 10,
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  text: {
    marginBottom: 100,
    fontSize: 18,
    color: 'white',
  },
  languagesList: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#6258e8',
  },

  languageButton: {
    padding: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  lngName: {
    fontSize: 16,
    color: 'white',
  },
});

import React, {useState} from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import {Text, Button, Image} from '@components';
import {
  BaseStyle,
  BaseColor,
  Images,
  ColorFontBold,
  useTheme,
  BaseSetting,
  Typography,
  FontWeight,
} from '@config';
import {AuthActions} from '@actions';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styles from './styles';

function DrawerContent(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const login = useSelector(state => state.auth.login.success);
  const [modalVisible, setModalVisible] = useState(false);

  const signOut = () => {
    if (login) {
      setModalVisible(true);
    } else {
      dispatch(AuthActions.onLogout());
      props.navigation.toggleDrawer();
      props.navigation.navigate('Login');
    }
  };

  const onLogOut = () => {
    dispatch(
      AuthActions.authentication(false, response => {
        console.log('CERRANDO SESION');
      }),
    );
    dispatch(AuthActions.onLogout());
    props.navigation.navigate('Login');
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  title3
                  semibold
                  textAlign="center"
                  style={{marginBottom: 10}}>
                  {t('sure_want_sing_out')}
                </Text>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button
                    style={{
                      backgroundColor: colors.primaryColor,
                      height: 45,
                      width: 180,
                      marginBottom: 15,
                      ...Platform.select({
                        ios: {
                          shadowColor: '#FF5733',
                          shadowOffset: {height: 1},
                          shadowOpacity: 0.6,
                          shadowRadius: 6,
                        },
                        default: {
                          elevation: 4,
                        },
                      }),
                    }}
                    styleText={[
                      Typography.footnote,
                      {fontWeight: FontWeight.bold},
                    ]}
                    onPress={() => {
                      setModalVisible(false);
                      onLogOut();
                    }}>
                    {t('yes_close')}
                  </Button>
                  <Button
                    style={{
                      height: 45,
                      width: 180,
                      backgroundColor: '#D6D6D6',
                    }}
                    styleText={[
                      Typography.footnote,
                      {fontWeight: FontWeight.bold},
                    ]}
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    {t('no_back')}
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{flex: 0.1}}>
        <Text>Header</Text>
      </View>
      <View
        style={{
          flex: 0.8,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            props.navigation.toggleDrawer();
            props.navigation.navigate('Token');
          }}>
          <View style={styles.drawerItem}>
            <Image
              source={Images.icon_help}
              style={styles.img}
              resizeMode="contain"
            />
            <Text body1 light style={{color: ColorFontBold}}>
              {t('generate_token')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            props.navigation.toggleDrawer();
            props.navigation.navigate('Pin');
          }}>
          <View style={styles.drawerItem}>
            <Image
              source={Images.icon_help}
              style={styles.img}
              resizeMode="contain"
            />
            <Text body1 light style={{color: ColorFontBold}}>
              {t('used_token')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            signOut();
          }}>
          <View style={styles.drawerItem}>
            <Image
              source={login ? Images.icon_sign_out : Images.icon_sign_in}
              style={styles.img}
              resizeMode="contain"
            />
            <Text
              body1
              light
              style={{color: login ? BaseColor.scarlet : ColorFontBold}}>
              {login ? t('sign_out') : t('log_in')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.1}}>
        <Text>Footer</Text>
      </View>
    </View>
  );
}

export default DrawerContent;

import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from 'actions';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from 'react-native';
import {BaseStyle, useTheme, Images, BaseColor} from 'config';
import {
  SafeAreaView,
  Image,
  MessageModal,
} from 'components';
import {Grid, Block, Section} from 'react-native-responsive-layout';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useApolloClient} from '@apollo/client';
import {USER, USERDEVICE, getGraphQlError} from 'gqlApollo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VersionCheck from 'react-native-version-check';
import DeviceInfo from 'react-native-device-info';

export default function Login({navigation, route}) {
  const {colors} = useTheme();
  const appInfo = useSelector(state => state.appInfo);

  const {t} = useTranslation();
  const {mutate} = useApolloClient();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({id: true, password: true});

  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState('');
  const [typeMessage, setTypeMessage] = useState('success');
  const showMessage = (
    message = '',
    type = 'success',
    onFinish = () => {},
    timeout = 2000,
  ) => {
    setTypeMessage(type);
    setMessage(message);
    setIsModal(true);
    setTimeout(() => {
      setIsModal(false);
      onFinish();
    }, timeout);
  };

  useEffect(() => {
    return () => {};
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    if (id === '' || password === '') {
      setSuccess({
        ...success,
        id: false,
        password: false,
      });
      showMessage('enter_all_data', 'error');
    } else {
      setLoading(true);
      const input = {
        nameUser: id.toUpperCase(),
        password: password,
      };
      try {
        const {errors, data} = await mutate({
          mutation: USER.MUTATIONS.loginTokenUser,
          variables: {input},
          fetchPolicy: 'no-cache',
        });

        if (errors && errors.length > 0) {
          showMessage('connection_error_try_later', 'error');
        }
        if (data) {
          setPassword('');
          setId('');
          const inputSync = {
            userId: data.loginTokenUser.id,
            tokenDevice:
              appInfo.tokenDevice !== ''
                ? appInfo.tokenDevice.toString()
                : DeviceInfo.getUniqueId(),
            appVersion: VersionCheck.getCurrentVersion(),
          };

          const {errors: errorsSync, data: dataSync} = await mutate({
            mutation: USERDEVICE.MUTATIONS.syncTokenUserDevice,
            variables: {input: inputSync},
            fetchPolicy: 'no-cache',
          });

          showMessage('logging_in', 'success', () =>
            successCallback(data.loginTokenUser),
          );
        }
      } catch (err) {
        setLoading(false);
        showMessage(getGraphQlError(err).messages, 'error');
      }
    }
    setLoading(false);
  };

  const successCallback = token => {
    setLoading(false);
    dispatch(AuthActions.onLogin(token));
    navigation.navigate('Main');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {backgroundColor: '#ff130b'}]}
      forceInset={{top: 'always'}}>
      <MessageModal
        modalVisible={isModal}
        message={message}
        type={typeMessage}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}>
        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={{
            minHeight: hp('100%') - getStatusBarHeight(),
          }}>
          <Grid stretchable style={{backgroundColor: '#ff130b'}}>
            <Section
              style={{
                width: '100%',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Block>
                <View style={BaseStyle.slide}>
                  <Image
                    source={Images.logo_blank}
                    style={{
                      width: '60%',
                      marginHorizontal: 'auto',
                      maxHeight: 200,
                      minHeight: 80,
                      marginTop: hp('15%'),
                    }}
                    resizeMode="contain"
                  />
                </View>
              </Block>
            </Section>
            <Section
              stretch
              style={{
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Block>
                <View
                  style={{
                    width: '70%',
                    marginBottom: '20%',
                    marginHorizontal: '15%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FFF',
                      height: hp('6%'),
                      width: '100%',
                      borderRadius: 8,
                    }}>
                    <TextInput
                      style={[
                        {
                          flex:1,
                          paddingTop: 0,
                          paddingBottom: 0,
                          paddingLeft: 10,
                          margin: 0,
                          textAlignVertical: 'bottom',
                          backgroundColor: '#FFF',
                          width: '100%',
                          borderRadius: 8,
                        },
                      ]}
                      onChangeText={text => setId(text)}
                      autoCorrect={false}
                      autoCapitalize="none"
                      placeholder={t('user')}
                      placeholderTextColor={BaseColor.grayColor}
                      value={id}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: '#FFF',
                      height: hp('6%'),
                      width: '100%',
                      borderRadius: 8,
                      marginTop: 15,
                    }}>
                    <TextInput
                      style={[
                        {
                          flex: 1,
                          paddingTop: 0,
                          paddingBottom: 0,
                          paddingLeft: 10,
                          margin: 0,
                          textAlignVertical: 'bottom',
                          backgroundColor: '#FFFF',
                          width: '100%',
                          borderRadius: 8,
                        },
                      ]}
                      onChangeText={text => setPassword(text)}
                      autoCorrect={false}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      placeholder={t('password')}
                      placeholderTextColor={BaseColor.grayColor}
                      value={password}
                    />
                  </View>
                </View>
              </Block>
            </Section>

            <Section>
              <Block>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: hp('8%'),
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      onLogin();
                    }}>
                    <View
                      style={{
                        width: wp('20%'),
                        height: wp('20%'),
                        borderRadius: wp('20%') / 2,
                        backgroundColor: '#ff130b',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          width: wp('19%'),
                          height: wp('19%'),
                          borderRadius: wp('19%') / 2,
                          backgroundColor: '#ff130b',
                          borderColor: '#FFF',
                          borderWidth: wp('6%'),
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </Block>
            </Section>
          </Grid>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from '@actions';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {BaseStyle, useTheme, Images, BaseColor} from '@config';
import {
  SafeAreaView,
  Icon,
  Text,
  Button,
  TextInput,
  Image,
  MessageModal,
  Header,
} from '@components';
import {Grid, Block, Section} from 'react-native-responsive-layout';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useApolloClient} from '@apollo/client';
import {USER, getGraphQlError} from '@gqlApollo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Login({navigation, route}) {
  const {colors} = useTheme();

  const {t} = useTranslation();
  const {mutate} = useApolloClient();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 20,
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
        email: id.toLowerCase(),
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
          showMessage('logging_in', 'success', () => {
            setLoading(false);
            dispatch(AuthActions.onLogin(data.loginTokenUser));
            route.params?.from
              ? navigation.navigate(route.params?.from)
              : navigation.navigate('Drawer', {screen: 'Token'});
          });
        }
      } catch (err) {
        setLoading(false);
        showMessage(getGraphQlError(err).messages, 'error');
      }
    }
    setLoading(false);
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header title={''} />
      <MessageModal
        modalVisible={isModal}
        message={message}
        type={typeMessage}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}>
        <Grid
          stretchable
          scrollable
          style={{
            paddingHorizontal: 20,
            minHeight: hp('100%') - 60 - getStatusBarHeight(),
          }}>
          <Section style={{}}>
            <Block>
              <View style={BaseStyle.slide}>
                <Image
                  source={Images.logo}
                  style={{
                    width: '60%',
                    margin: 'auto',
                    maxHeight: 200,
                    minHeight: 80,
                  }}
                  resizeMode="contain"
                />
              </View>
            </Block>
          </Section>

          <Section style={{}}>
            <Block>
              <View style={{marginTop: '12%', marginBottom: '0%'}}>
                <Text
                  title1
                  bold
                  textAlign="left"
                  style={{
                    width: '100%',
                    color: BaseColor.tarawera,
                  }}>
                  {t('login_start')}
                </Text>
                <Text
                  body2
                  bold
                  textAlign="left"
                  style={{
                    width: '60%',
                    color: BaseColor.nobel,
                  }}>
                  {t('login_info')}
                </Text>
              </View>
            </Block>
          </Section>

          <Section
            stretch
            style={{
              alignContent: 'center',
            }}>
            <Block size="1/1">
              <View
                style={{
                  width: '100%',
                  marginBottom: '20%',
                }}>
                <View style={[BaseStyle.contentTitle]}>
                  <Text
                    textAlign="left"
                    body2
                    style={{width: '100%', color: BaseColor.tarawera}}>
                    {t('email')}
                  </Text>
                </View>
                <TextInput
                  keyboardType="email-address"
                  onChangeText={text => setId(text)}
                  onFocus={() => {
                    setSuccess({
                      ...success,
                      id: true,
                    });
                  }}
                  success={success.id}
                  value={id}
                />
                <View style={BaseStyle.contentTitle}>
                  <Text
                    body2
                    textAlign="left"
                    style={{width: '100%', color: BaseColor.tarawera}}>
                    {t('password')}
                  </Text>
                </View>
                <TextInput
                  onChangeText={text => setPassword(text)}
                  onFocus={() => {
                    setSuccess({
                      ...success,
                      password: true,
                    });
                  }}
                  secureTextEntry={!passwordVisible}
                  success={success.password}
                  value={password}
                  icon={
                    <TouchableOpacity onPress={onPasswordIconPress}>
                      <Icon
                        name={passwordVisible ? 'eye-slash' : 'eye'}
                        size={20}
                        color={BaseColor.dividerColor}
                        enableRTL={true}
                      />
                    </TouchableOpacity>
                  }
                />
              </View>
            </Block>
          </Section>

          <Section style={{}}>
            <Block>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '10%',
                }}>
                <Button
                  style={{marginTop: 10, width: '80%'}}
                  loading={loading}
                  onPress={() => {
                    onLogin();
                  }}>
                  {t('log_in')}
                </Button>
              </View>
            </Block>
          </Section>
        </Grid>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

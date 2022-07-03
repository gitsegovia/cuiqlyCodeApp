import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, TouchableWithoutFeedback} from 'react-native';
import moment from 'moment-timezone';
import {BaseStyle, useTheme} from 'config';
import {SafeAreaView, Text, MessageModal} from 'components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useApolloClient} from '@apollo/client';
import {USER, USERDEVICE, getGraphQlError} from 'gqlApollo';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, Block, Section} from 'react-native-responsive-layout';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {dateMesCorto} from 'utils';
import {useSocket} from 'services/websocket';
import {AuthActions} from 'actions';

import LinearGradient from 'react-native-linear-gradient';

const TimerLink = '20';

function CounterTag({callback}) {
  let counter = TimerLink;
  const [timeSeconds, setTimeSeconds] = useState(TimerLink);

  const timer = useRef();

  const setClock = () => {
    timer.current = setInterval(() => {
      counter = moment(counter, 'ss').subtract(1, 'seconds').format('ss');
      if (counter == '00') {
        clearInterval(timer.current);
        setTimeSeconds('');
        if (callback) callback();
        return true;
      }
      setTimeSeconds(counter);
    }, 1000);
  };

  useEffect(() => {
    setClock();
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <React.Fragment>
      <Text headline style={{marginTop: 3}}>{`00:${timeSeconds}`}</Text>
    </React.Fragment>
  );
}

export default function Token({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {mutate} = useApolloClient();
  const login = useSelector(state => state.auth.login);
  const appInfo = useSelector(state => state.appInfo);
  const dispatch = useDispatch();

  //WEBSOCKET
  const socketConnect = useSocket();

  useFocusEffect(
    useCallback(() => {
      if (socketConnect) {
        console.log('SOCKETIO: chat --useSocket', socketConnect);
        socketConnect.on('tokenUsed', tokenUsed => {
          console.log('VALOR DE TOKEN ACTUAL:', token);
          if (tokenUsed === token) {
            setIsViewCounter(false);
            setLoading(false);
            setToken('');
          }
        });
      }

      return () => {
        if (socketConnect) {
          socketConnect.off('tokenUsed');
        }
      };
    }, [socketConnect]),
  );
  //WEBSOCKET END

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [isViewCounter, setIsViewCounter] = useState(false);

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

  /**
   * call when action logout
   */
  const onLogout = async () => {
    dispatch(AuthActions.onLogout());
    await mutate({
      mutation: USERDEVICE.MUTATIONS.deleteTokenUserDevice,
      variables: {input: {tokenDevice: appInfo.tokenDevice}},
      fetchPolicy: 'no-cache',
    });
  };

  /**
   * call when action generate token
   */
  const onGenerateToken = async () => {
    if (loading) return;
    setLoading(true);
    const input = {
      userId: login.userId,
    };

    console.error(input);
    try {
      const {errors, data} = await mutate({
        mutation: USER.MUTATIONS.createTokenSecurity,
        variables: {input: input},
        fetchPolicy: 'no-cache',
      });

      if (errors && errors.length > 0) {
        console.log('errors: ', errors);
        showMessage('connection_error_try_later', 'error');
        setLoading(false);
      }
      if (data) {
        showMessage('new_code_generate', 'success');
        setToken(data.createTokenSecurity.codeActivation);
        setIsViewCounter(true);
      }
    } catch (err) {
      setLoading(false);
      showMessage(getGraphQlError(err).messages, 'error', () => {}, 1500);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Grid
        stretchable
        style={{
          paddingHorizontal: 20,
        }}>
        <Section
          stretch
          style={{
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Block>
            <Text
              body1
              regular
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
              }}
              textAlign="center">
              {`${dateMesCorto(moment())}`}
            </Text>
          </Block>
          <Block>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: hp('2%'),
              }}>
              {token !== '' ? (
                <View style={styles.shadowGraddient}>
                  <LinearGradient
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 0}}
                    locations={[0.2, 0.6]}
                    colors={['#ff0207', '#ff2a7e']}
                    style={styles.gradient}>
                    <View style={styles.gradientContent}>
                      <Text title2 bold>
                        {t('token')}
                      </Text>
                      <Text
                        bold
                        style={{fontSize: wp('10%'), letterSpacing: 6}}>
                        {`${token.substring(0, 3)} ${token.substring(3)}`}
                      </Text>
                      {isViewCounter && (
                      <CounterTag
                        callback={() => {
                          setIsViewCounter(false);                          
                          setLoading(false);
                          setToken('');
                        }}
                      />
                      )}
                    </View>
                  </LinearGradient>
                </View>
              ) : (
                <View style={styles.shadowGraddientOff}>
                <TouchableWithoutFeedback onPress={onGenerateToken}>
                  <View style={styles.gradientOff}>
                    <View style={styles.gradientContent}>
                      <Text
                        title1
                        bold
                        style={{
                          paddingVertical: 5,
                          paddingHorizontal: 20,
                        }}
                        textAlign="center">
                        {t('generate_token')}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                </View>
              )}
            </View>
          </Block>
          <Block>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: hp('4%'),
              }}>
              <TouchableWithoutFeedback onPress={onLogout}>
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
                      width: wp('11%'),
                      height: wp('11%'),
                      borderRadius: wp('11%') / 2,
                      backgroundColor: '#ff130b',
                      borderColor: '#FFF',
                      borderWidth: wp('2.5%'),
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </Block>
        </Section>
      </Grid>
    </SafeAreaView>
  );
}

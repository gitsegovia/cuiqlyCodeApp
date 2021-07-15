import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import moment from 'moment';
import {BaseStyle, useTheme, Images, BaseColor} from '@config';
import {
  SafeAreaView,
  Icon,
  TextInput,
  Text,
  Button,
  Image,
  MessageModal,
  Header,
} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useApolloClient} from '@apollo/client';
import {USER, getGraphQlError} from '@gqlApollo';
import useInterval from '@utils/useInterval';
import {useSelector} from 'react-redux';
import {Grid, Block, Section} from 'react-native-responsive-layout';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TimerLink = '20';

function CounterTag({callback}) {
  let counter = TimerLink;
  const [timeSeconds, setTimeSeconds] = useState(TimerLink);
  const {t} = useTranslation();
  const [activeLink, setActiveLink] = useState(false);

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
      <Text body1 primaryColor>
        {`${t('token_valid_for')} ${timeSeconds}s`}
      </Text>
    </React.Fragment>
  );
}

export default function Token({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {mutate} = useApolloClient();
  const login = useSelector(state => state.auth.login);

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
   * call when action reset pass
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
      }
      if (data) {
        showMessage('new_code_generate', 'success');
        setToken(data.createTokenSecurity.codeActivation);
        setIsViewCounter(true);
      }
    } catch (err) {
      showMessage(getGraphQlError(err).messages, 'error', () => {}, 1500);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header title={''} />
      <MessageModal
        modalVisible={isModal}
        message={message}
        type={typeMessage}
      />
      <Grid
        stretchable
        scrollable
        style={{
          paddingHorizontal: 20,
          minHeight: hp('100%') - 60 - getStatusBarHeight(),
        }}>
        <Section>
          <Block>
            <View style={BaseStyle.slide}>
              <Image
                source={Images.logo}
                style={BaseStyle.logo}
                resizeMode="contain"
              />
            </View>
          </Block>
        </Section>

        <Section stretch>
          <Block>
            <View style={{width: '10%', height: 0, marginTop: '20%'}}></View>
            <Text
              headline
              semibold
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
              }}
              textAlign="center">
              {t('security_token')}
            </Text>
            <View
              style={{
                width: '60%',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                marginHorizontal: '20%',
              }}>
              <Text header semibold style={{letterSpacing: 10}}>
                {token !== '' ? token.substring(0, 3) : '---'}
              </Text>
              <Text header semibold style={{letterSpacing: 10}}>
                {token !== '' ? token.substring(3) : '---'}
              </Text>
            </View>
            <View
              style={{
                paddingTop: 15,
                paddingHorizontal: 60,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {isViewCounter && (
                <CounterTag
                  callback={() => {
                    setIsViewCounter(false);
                    setToken('');
                  }}
                />
              )}
            </View>
          </Block>
        </Section>

        <Section>
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
                onPress={onGenerateToken}>
                {t('generate_token')}
              </Button>
            </View>
          </Block>
        </Section>
      </Grid>
    </SafeAreaView>
  );
}

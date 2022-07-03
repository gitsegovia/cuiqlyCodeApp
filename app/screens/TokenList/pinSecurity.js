import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useApolloClient} from '@apollo/client';
import {useSelector, useDispatch} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Grid, Block, Section} from 'react-native-responsive-layout';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {BaseStyle, useTheme} from 'config';
import {SafeAreaView, Text, MessageModal} from 'components';
import {USER, getGraphQlError} from 'gqlApollo';
import {TokenListActions} from 'actions';

export default function Pin(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {query} = useApolloClient();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const login = useSelector(state => state.auth.login);
  const refresh = useSelector(state => state.tokenList.refresh);

  const [loading, setLoading] = useState(false);

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

  const [pinSecurity, setPinSecurity] = useState({
    pin1: '',
    pin2: '',
    pin3: '',
    pin4: '',
  });

  useEffect(() => {
    setPinSecurity({
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
    });
    setLoading(false);

    return () => {};
  }, [refresh]);

  const refPin1 = useRef();
  const refPin2 = useRef();
  const refPin3 = useRef();
  const refPin4 = useRef();

  const onCheckPin = () => {
    if (
      pinSecurity.pin1 == '' ||
      pinSecurity.pin2 == '' ||
      pinSecurity.pin3 == '' ||
      pinSecurity.pin4 == ''
    ) {
      console.log('Codigo incompleto', pinSecurity);
      showMessage('incorrect_code', 'error');
    } else {
      const pin =
        pinSecurity.pin1 +
        pinSecurity.pin2 +
        pinSecurity.pin3 +
        pinSecurity.pin4;
      validatePinUser(pin);
    }
  };

  /**
   * call when action
   */
  const validatePinUser = async pin => {
    console.log('Codigo completo', pin);
    if (loading) return;

    setLoading(true);
    console.log('validatePinUser loading');
    const input = {
      userId: login.userId,
      pin: pin,
    };
    console.log('Codigo completo', input);
    try {
      console.log('Codigo checkPinTokenUser');
      setLoading(false);
      const {errors, data} = await query({
        query: USER.QUERYS.checkPinTokenUser,
        variables: {input: input},
        fetchPolicy: 'no-cache',
      });
      console.log('Codigo errors, data', errors, data);
      if (errors && errors.length > 0) {
        setLoading(false);
        console.log('errors: ', errors);
        showMessage('connection_error_try_later', 'error');
      }
      if (data) {
        if (data.checkPinTokenUser) {
          setLoading(false);
          showMessage('valid_code', 'success', () => {
            setPinSecurity({
              pin1: '',
              pin2: '',
              pin3: '',
              pin4: '',
            });
            dispatch(TokenListActions.onSetTokenListValidate(true));
          });
        } else {
          setLoading(false);
          showMessage('incorrect_code', 'error');
        }
      }
    } catch (err) {
      console.log('Codigo err', err);
      setLoading(false);
      showMessage(getGraphQlError(err).messages, 'error', () => {}, 1500);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
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
            minHeight: hp('92%') - getStatusBarHeight() - 50,
            width: wp('100%'),
          }}>
          <Grid stretchable>
          <Section
              stretch
              style={{
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Block>
              <Text
                  title1
                  medium
                  grayColor
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                  }}
                  textAlign="center">
                  {t('security_pin')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '84%',
                    marginLeft: '8%',
                    marginTop: 25,
                  }}>
                  <TextInput
                    ref={refPin1}
                    style={BaseStyle.textInputSquare}
                    onChangeText={text => {
                      setPinSecurity({...pinSecurity, pin1: text});
                      if (text !== '') refPin2.current.focus();
                    }}
                    maxLength={1}
                    value={pinSecurity.pin1}
                    selectionColor={colors.primary}
                    keyboardType="numeric"
                    onFocus={() => setPinSecurity({...pinSecurity, pin1: ''})}
                  />
                  <TextInput
                    ref={refPin2}
                    style={BaseStyle.textInputSquare}
                    onKeyPress={({nativeEvent}) => {
                      if (
                        nativeEvent.key === 'Backspace' &&
                        pinSecurity.pin2 === ''
                      ) {
                        setPinSecurity({...pinSecurity, pin1: ''});
                        refPin1.current.focus();
                      }
                    }}
                    onChangeText={text => {
                      setPinSecurity({...pinSecurity, pin2: text});
                      if (text !== '') refPin3.current.focus();
                    }}
                    maxLength={1}
                    value={pinSecurity.pin2}
                    selectionColor={colors.primary}
                    keyboardType="numeric"
                    onFocus={() => setPinSecurity({...pinSecurity, pin2: ''})}
                  />
                  <TextInput
                    ref={refPin3}
                    style={BaseStyle.textInputSquare}
                    onKeyPress={({nativeEvent}) => {
                      if (
                        nativeEvent.key === 'Backspace' &&
                        pinSecurity.pin3 === ''
                      ) {
                        setPinSecurity({...pinSecurity, pin2: ''});
                        refPin2.current.focus();
                      }
                    }}
                    onChangeText={text => {
                      setPinSecurity({...pinSecurity, pin3: text});
                      if (text !== '') refPin4.current.focus();
                    }}
                    maxLength={1}
                    value={pinSecurity.pin3}
                    selectionColor={colors.primary}
                    keyboardType="numeric"
                    onFocus={() => setPinSecurity({...pinSecurity, pin3: ''})}
                  />
                  <TextInput
                    ref={refPin4}
                    style={BaseStyle.textInputSquare}
                    onKeyPress={({nativeEvent}) => {
                      if (
                        nativeEvent.key === 'Backspace' &&
                        pinSecurity.pin4 === ''
                      ) {
                        setPinSecurity({...pinSecurity, pin3: ''});
                        refPin3.current.focus();
                      }
                    }}
                    onChangeText={text => {
                      setPinSecurity({...pinSecurity, pin4: text});
                    }}
                    maxLength={1}
                    value={pinSecurity.pin4}
                    selectionColor={colors.primary}
                    keyboardType="numeric"
                    onFocus={() => setPinSecurity({...pinSecurity, pin4: ''})}
                  />
                </View>
              </Block>
            </Section>
            <Section>
              <Block>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: hp('4%'),
                  }}>
                  <TouchableWithoutFeedback onPress={onCheckPin}>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/*
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
          }}
        >
          <Block>
            <View style={{width: '10%', height: 0, marginTop: '1%'}}></View>
          </Block>
          <Block>
            <Text
              title1
              medium
              grayColor
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
              }}
              textAlign="center">
              {t('security_pin')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '84%',
                marginLeft: '8%',
                marginTop: 25
              }}>
              <TextInput
                ref={refPin1}
                style={BaseStyle.textInputSquare}
                onChangeText={(text) => {
                  setPinSecurity({...pinSecurity, pin1: text});
                  if (text !== '') refPin2.current.focus();
                }}
                maxLength={1}
                value={pinSecurity.pin1}
                selectionColor={colors.primary}
                keyboardType="numeric"
                onFocus={() => setPinSecurity({...pinSecurity, pin1: ''})}
              />
              <TextInput
                ref={refPin2}
                style={BaseStyle.textInputSquare}
                onKeyPress={({ nativeEvent }) => {
                  if(nativeEvent.key === 'Backspace' && pinSecurity.pin2===''){
                    setPinSecurity({...pinSecurity, pin1: ''});
                    refPin1.current.focus();
                  }
                }}
                onChangeText={(text) => {
                  setPinSecurity({...pinSecurity, pin2: text});
                  if (text !== '') refPin3.current.focus();
                }}
                maxLength={1}
                value={pinSecurity.pin2}
                selectionColor={colors.primary}
                keyboardType="numeric"
                onFocus={() => setPinSecurity({...pinSecurity, pin2: ''})}
              />
              <TextInput
                ref={refPin3}
                style={BaseStyle.textInputSquare}
                onKeyPress={({ nativeEvent }) => {
                  if(nativeEvent.key === 'Backspace' && pinSecurity.pin3===''){
                    setPinSecurity({...pinSecurity, pin2: ''});
                    refPin2.current.focus();
                  }
                }}
                onChangeText={(text) => {
                  setPinSecurity({...pinSecurity, pin3: text});
                  if (text !== '') refPin4.current.focus();
                }}
                maxLength={1}
                value={pinSecurity.pin3}
                selectionColor={colors.primary}
                keyboardType="numeric"
                onFocus={() => setPinSecurity({...pinSecurity, pin3: ''})}
              />
              <TextInput
                ref={refPin4}
                style={BaseStyle.textInputSquare}
                onKeyPress={({ nativeEvent }) => {
                  if(nativeEvent.key === 'Backspace' && pinSecurity.pin4===''){
                    setPinSecurity({...pinSecurity, pin3: ''});
                    refPin3.current.focus();
                  }
                }}
                onChangeText={(text) => {
                  setPinSecurity({...pinSecurity, pin4: text});
                }}
                maxLength={1}
                value={pinSecurity.pin4}
                selectionColor={colors.primary}
                keyboardType="numeric"
                onFocus={() => setPinSecurity({...pinSecurity, pin4: ''})}
              />
            </View>
          </Block>
          
        </Section>        
      </Grid>
*/

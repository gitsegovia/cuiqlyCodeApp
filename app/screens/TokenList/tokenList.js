import React, {useState, useRef} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView, Text, TokenDetail} from 'components';
import {BaseStyle, useTheme, Images, BaseColor} from 'config';
import {useApolloClient} from '@apollo/client';
import {USER, getGraphQlError} from 'gqlApollo';
import {useTranslation} from 'react-i18next';
import {Grid, Block, Section} from 'react-native-responsive-layout';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RenderHeaderFlatlist from './header';
import styles from './styles';

import ModalInfoToken from './modalInfoToken';

const RenderEmptyList = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.emptyContainer}>
      <Text>{t('no_tokens_generated')}</Text>
    </View>
  );
};

function TokenList({navigation}) {
  const LIMIT_SQL = 10;
  const [data, setData] = useState([]);
  const [loadingFooter, setLoadingFooter] = useState(false);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState('');
  const [finish, setFinish] = useState(false);
  const [loading, setLoading] = useState(false);
  const {query} = useApolloClient();
  const [params, setParams] = useState({
    params: {search: ''},
    options: {limit: LIMIT_SQL, offset: 0},
  });

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

  const headerRef = useRef();

  const fetchTokenUsedList = async () => {
    if (loading === true) return;
    const input = {
      params: headerRef.current.getInfoParams(),
      options: params.options
    }
    console.error('ENVIANDO', input);

    try {
      const {errors, data: dataApi} = await query({
        query: USER.QUERYS.listTokenUsed,
        variables: {input: input},
        fetchPolicy: 'no-cache',
      });
      setLoading(false);
      if (errors && errors.length > 0) {
        console.error('errors: ', errors);
        showMessage('connection_error_try_later', 'error');
      }
      if (dataApi) {
        console.error(
          'LLEGO',
          dataApi.listTokenUsed.length,
          dataApi.listTokenUsed,
        );
        if (dataApi.listTokenUsed.length > 0) {
          //     if (data.length === 0) {
          setData(dataApi.listTokenUsed);
          //     } else {
          //       setData(values => [...values, ...data.listTokenUsed]);
          //     }
          //     setFinish(false);
        } else {
          console.error('FINAL');
          //     setFinish(true);
        }
        //   setLoadingFooter(false);
        //   setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      showMessage(getGraphQlError(err).messages, 'error', () => {}, 1500);
    }
  };

  const onEndFetch = () => {
    if (finish === true) return false;
    setFinish(true);
    setLoadingFooter(true);
    setParams(value => ({
      ...value,
      options: {
        limit: LIMIT_SQL,
        offset: LIMIT_SQL * (value.options.offset / LIMIT_SQL + 1),
      },
    }));
  };

  const onSearch = () => {
    setData([]);
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchTokenUsedList();

  //     return () => {
  //       setData([]);
  //       setParams({
  //         params: {search: ''},
  //         options: {limit: LIMIT_SQL, offset: 0},
  //       });
  //     };
  //   }, [params]),
  // );

  const [infoToken, setInfoToken] = useState(null);
  const setModalVisible = () => {
    setInfoToken(null)
  }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      {infoToken!==null && <ModalInfoToken
        setModalVisible={setModalVisible}
        infoToken={infoToken}
      />}
      <Grid
        stretchable
        style={{
          paddingHorizontal: 50,
        }}>
        <Section
          style={{
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Block>
            <View style={{paddingHorizontal: 20, marginBottom: 15}}>
              <RenderHeaderFlatlist ref={headerRef} />
            </View>
          </Block>
        </Section>
        <Section
          stretch
          style={{
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Block>
            <FlatList
              contentContainerStyle={{paddingHorizontal: 0}}
              data={data}
              renderItem={({item}) => (
                  <TokenDetail item={item} onPress={() => {
                  console.log('TOCANDO');
                  setInfoToken(item);
                }}/>
              )}
              ListFooterComponent={() => {
                return loadingFooter === true ? (
                  <View>
                    <ActivityIndicator size="large" color={BaseColor.scarlet} />
                  </View>
                ) : null;
              }}
              keyExtractor={(_, index) => index}
              ListEmptyComponent={<RenderEmptyList />}
            />
          </Block>
        </Section>
        <Section>
          <Block>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: hp('6%'),
              }}>
              <TouchableWithoutFeedback onPress={fetchTokenUsedList}>
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
                      backgroundColor: '#ff3463',
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

export default TokenList;
/*


*/

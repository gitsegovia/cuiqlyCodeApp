import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  SafeAreaView,
  Text,
  Header,
  Icon,
  TextInput,
  MessageModal,
  TokenDetail,
} from '@components';
import {BaseStyle, useTheme, Images, BaseColor} from '@config';
import {useApolloClient} from '@apollo/client';
import {USER, getGraphQlError} from '@gqlApollo';
import {useTranslation} from 'react-i18next';
import RenderHeaderFlatlist from './header';
import moment from 'moment';
import styles from './styles';

const RenderEmptyList = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text>No hay Tokens generados</Text>
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

  const fetchTokenUsedList = async () => {
    if (loading === true) return;
    console.error('ENVIANDO', params);

    try {
      const {errors, data: dataApi} = await query({
        query: USER.QUERY.listTokenUsed,
        variables: {input: params},
        fetchPolicy: 'no-cache',
      });

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
      console.error(err);
      showMessage(getGraphQlError(err).messages, 'error', () => {}, 1500);
    }

    setTimeout(() => {
      setLoading(false);
    }, 5000);
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

  const onSearch = search => {
    setData([]);
    setParams(value => ({...value, params: search}));
  };

  useFocusEffect(
    useCallback(() => {
      fetchTokenUsedList();

      return () => {
        setData([]);
        setParams({
          params: {search: ''},
          options: {limit: LIMIT_SQL, offset: 0},
        });
      };
    }, [params]),
  );

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={'Token usados'}
        renderLeft={() => {
          return (
            <Icon
              name="chevron-left"
              size={20}
              color={colors.accent}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.navigate('Token');
        }}
      />
      <MessageModal
        modalVisible={isModal}
        message={message}
        type={typeMessage}
      />
      <View style={{paddingHorizontal: 20, marginBottom: 25}}>
        <RenderHeaderFlatlist onSearch={onSearch} />
      </View>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 20}}
        data={data}
        renderItem={({item}) => <TokenDetail item={item} />}
        ListFooterComponent={() => {
          return loadingFooter === true ? (
            <View>
              <ActivityIndicator size="large" color={BaseColor.scarlet} />
            </View>
          ) : null;
        }}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={<RenderEmptyList />}
        numColumns={2}
        // onEndReached={onEndFetch}
        // onEndReachedThreshold={0.9}
      />
    </SafeAreaView>
  );
}

export default TokenList;

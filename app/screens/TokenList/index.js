import React from 'react';
import {View, FlatList} from 'react-native';
import {SafeAreaView, Text, Header, Icon} from '@components';
import {BaseStyle, useTheme, Images, BaseColor} from '@config';
import styles from './styles';

const data = [
  {name: 'Jose', token: '123456', used: 'Recarga', date: '02-02-2021'},
  {name: 'Maria', token: '123456', used: 'Recarga', date: '02-02-2021'},
  {name: 'Pedro', token: '123456', used: 'Recarga', date: '02-02-2021'},
  {name: 'Moises', token: '123456', used: 'Recarga', date: '02-02-2021'},
  {name: 'Abraham', token: '123456', used: 'Recarga', date: '02-02-2021'},
];

const RenderItem = ({item}) => {
  console.error(item);
  const data = item.item;
  return (
    <View style={{width: '100%', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
      <Text>{`Token: ${data.token}`}</Text>
      <Text>{data.name}</Text>
      </View>
      <View>
      <Text>{data.used}</Text>
      <Text>{data.date}</Text>
      </View>
    </View>
  );
};

const RenderEmptyList = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text>No hay Tokens generados</Text>
    </View>
  );
};

function TokenList({navigation}) {
  const {colors} = useTheme();

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
          navigation.goBack();
        }}
      />
      <FlatList
        style={{flex: 1}}
        data={data}
        renderItem={item => <RenderItem item={item} />}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={<RenderEmptyList />}
      />
    </SafeAreaView>
  );
}

export default TokenList;

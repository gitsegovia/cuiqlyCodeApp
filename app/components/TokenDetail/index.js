import React from 'react';
import {View} from 'react-native';
import Text from '../Text';
import styles from './styles';
import {BaseColor, Typography} from '@config';
import moment from 'moment';

export default function TokenDetail(props) {
  const {item} = props;

  return (
    <View style={styles.showShadow}>
      <View style={styles.contentShadow}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text body1 bold style={{letterSpacing: 5, marginRight: 5}}>
            {item.codeActivation !== ''
              ? item.codeActivation.substring(0, 3)
              : '---'}
          </Text>
          <Text body1 bold style={{letterSpacing: 5}}>
            {item.codeActivation !== ''
              ? item.codeActivation.substring(3)
              : '---'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 45,
          }}>
          <Text callout light textAlign="justify" numberOfLines={2}>
            {`${item.Employee.firstName} ${item.Employee.lastName}`}
          </Text>
          <Text callout light textAlign="justify" numberOfLines={2}>
            {`${item.Employee.position}`}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            minHeight: 37,
          }}>
          <Text
            headline
            light
            textAlign="justify"
            style={{color: BaseColor.apple}}>
            {item.typeUse}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Text
            subhead
            light
            textAlign="justify"
            style={{color: BaseColor.scarlet}}>
            {moment(item.createdAt).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>
    </View>
  );
}

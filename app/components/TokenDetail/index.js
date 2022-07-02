import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import Text from '../Text';
import styles from './styles';
import {BaseColor, Typography} from 'config';
import moment from 'moment';
import {dateMesCorto} from 'utils'

export default function TokenDetail(props) {
  const {item, onPress = () => console.log('Onpress TokenDetail')} = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.showShadow}>
      <View style={styles.contentShadow}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}>
            <Text footnote regular textAlign="justify" numberOfLines={2}>
            {`${item.Employee.position}`}
          </Text>
            <Text title3 medium textAlign="justify" numberOfLines={2}>
            {`${item.Employee.firstName} ${item.Employee.lastName}`}
          </Text>
            <Text
            footnote
            light
            textAlign="justify"
            style={{color: BaseColor.grayColor}}>
            {`${dateMesCorto(item.createdAt)} ${moment(item.createdAt).format('HH:mm')}`}
          </Text>
          
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            minHeight: 37,
          }}>
            <Text body1 bold style={{letterSpacing: 3, marginRight: 5}}>
            {`${item.codeActivation.substring(0, 3)} ${item.codeActivation.substring(3)}`}
          </Text>
          <Text
            body1
            medium
            textAlign="justify"
            style={{color: BaseColor.grayColor}}>
            {item.typeUse.substring(0, 8)}
          </Text>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

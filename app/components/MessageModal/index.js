import React from 'react';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import {BaseColor, useTheme} from 'config';
import Text from '../Text';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function MessageModal(props) {
  const {navigation, modalVisible, type, message} = props;
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <Modal
      isVisible={modalVisible}
      avoidKeyboard={true}
      hasBackdrop={false}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection={['up']}
      animationIn='slideInDown'
      animationOut='slideOutUp'
      style={styles.bottomModal}>
      <View
        style={[
          styles.contentFilterBottom,
          {
            backgroundColor:
              type === 'error' ? BaseColor.error : BaseColor.success,
          },
        ]}>
        <View style={[styles.lineColumn, {marginVertical: 20}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <Text
              body2
              regular
              style={{marginLeft: 5, color: BaseColor.fieldColor}}>
              {t(message)}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

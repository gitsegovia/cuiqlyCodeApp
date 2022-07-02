import React, {useState} from 'react';
import ModalCustom from 'react-native-modal';
import {View, Modal} from 'react-native';
import {BaseColor, useTheme} from 'config';
import Text from 'components/Text';
import {useTranslation} from 'react-i18next';
import {dateMesCorto} from 'utils';
import moment from 'moment-timezone';
import {Grid, Block, Section} from 'react-native-responsive-layout';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ModalInfoToken(props) {
  const {setModalVisible, infoToken} = props;
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [modalActive, setModalActive] = useState(true);

  const onClose = () => {
    setModalActive(false);
    setModalVisible();
  };

  return (
    <ModalCustom
      isVisible={modalActive}
      avoidKeyboard={true}
      hasBackdrop={true}
      onSwipeComplete={onClose}
      swipeDirection={['up']}
      animationIn="slideInDown"
      animationOut="slideOutUp">
      <View
        style={{
          backgroundColor: '#FFF',
          width: '100%',
          height: '70%',
          borderRadius: 20,
        }}>
        <Grid
          stretchable
          style={{
            paddingHorizontal: 20,
          }}>
          <Section
            style={{
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginTop: 15,
              width: '100%',
            }}>
            <Block>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text title3 semibold textAlign="justify" numberOfLines={2}>
                    {`${infoToken.Employee.firstName} ${infoToken.Employee.lastName}`}
                  </Text>
                  <Text footnote regular textAlign="justify" numberOfLines={2}>
                    {`${infoToken.Employee.position}`}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    minHeight: 37,
                  }}>
                  <Text
                    body2
                    medium
                    textAlign="justify"
                    style={{color: BaseColor.grayColor}}>
                    {`${dateMesCorto(infoToken.createdAt)}`}
                  </Text>
                  <Text callout regular texPtAlign="justify">
                    {`${moment(infoToken.createdAt).format('HH:mm:ss')}`}
                  </Text>
                </View>
              </View>
            </Block>
            <Block>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text
                  bold
                  style={{
                    letterSpacing: 3,
                    marginRight: 5,
                    fontSize: wp('8%'),
                    color: BaseColor.scarlet,
                  }}>
                  {`${infoToken.codeActivation.substring(0,3)} ${infoToken.codeActivation.substring(3)}`}
                </Text>
              </View>
            </Block>
          </Section>
          <Section
            stretch
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginTop: 15,
            }}>
              <View>
                <Text body2 medium>{t('use')}</Text>
                <Text>{infoToken.typeUse}</Text>
              </View>
            </Section>
          <Section
            style={{
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Block>
              <View style={{marginBottom: '3%'}}>
                <Text
                  medium
                  textAlign="justify"
                  style={{color: BaseColor.grayColor}}>
                  {infoToken.TokenUser.codeUser}
                </Text>
              </View>
            </Block>
          </Section>
        </Grid>
      </View>
    </ModalCustom>
  );
}

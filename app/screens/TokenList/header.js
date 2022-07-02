import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity, Modal, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaView, Text, Header, Icon, TextInput} from 'components';
import {BaseStyle, useTheme, Images, BaseColor} from 'config';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import styles from './styles';

const RenderHeaderFlatlist = ({setParams}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('');
  const [date, setDate] = useState(new Date(moment()));
  const [modalVisible, setModalVisible] = useState(false);
  const [optionView, setOptionView] = useState(false);

  const onChangeDateIOS = selectedDate => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const DatepickerModal = ({visible, onClose, onChange}) => {
    const [localDate, setLocalDate] = useState(new Date(date));

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#0008',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View style={{width: '100%', backgroundColor: 'white'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
              }}>
              <TouchableOpacity
                onPress={onClose}
                style={{paddingHorizontal: 15, paddingVertical: 15}}>
                <Text body1 semibold>
                  {t('cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onClose();
                  onChange(localDate);
                }}
                style={{paddingHorizontal: 15, paddingVertical: 15}}>
                <Text body1 semibold>
                  {t('done')}
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              testID="dateTimePicker"
              value={localDate}
              mode={'date'}
              is24Hour={true}
              display="spinner"
              //textColor='#fff'
              themeVariant="light"
              // minimumDate={new Date('1920-01-01')}
              onChange={(event, selectedDate) => setLocalDate(selectedDate)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{width: '88%', marginLeft: '6%', flexDirection: 'column', marginTop: 15}}>
      <TextInput
        iconStart={
          <View
            style={{
              marginLeft: 10,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name={'search'}
              size={20}
              color={colors.border}
              enableRTL={true}
            />
          </View>
        }
        style={[styles.inputSearch, {borderWidth: 0.5}]}        
        styleInput={{marginLeft: 10}}
        onChangeText={value => setSearch(value)}
        placeholder={t('search')}
        value={search}
        returnKeyType="search"
        //onSubmitEditing={() => console.log('enter')}
        onBlur={() => setParams({search: search})}
      />
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop:15
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if(optionView){
              setOptionView(false)
            }else{
              setOptionView(true)
            }
          }}>
          <Text semibold>{t('Desde')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if(optionView){
              setOptionView(false)
            }else{
              setOptionView(true)
            }
          }}>
          <Text semibold>{t('Hasta')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if(optionView){
              setOptionView(false)
            }else{
              setOptionView(true)
            }
          }}>
          <Text semibold>{t('Acción')}</Text>
        </TouchableOpacity>
      </View>
      {optionView && (
        <View style={BaseStyle.rowFlexStart}>
          <View style={BaseStyle.columnFormLeft}>
            <View style={[BaseStyle.contentTitle]}>
              <Text
                textAlign="center"
                body2
                style={{width: '100%', color: BaseColor.tarawera}}>
                {t('since')}
              </Text>
              <View
                style={[
                  {
                    minWidth: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 13.3,
                    //backgroundColor: 'teal',
                    borderBottomWidth: 0.8,
                    borderColor: '#bdbdbd',
                  },
                ]}>
                <Text
                  onPress={
                    Platform.OS === 'ios'
                      ? () => {
                          setModalVisible(true);
                        }
                      : () => {
                          setShow(true);
                          setMode('date');
                        }
                  }
                  textAlign="left"
                  body2
                  style={{
                    width: '100%',
                    color: BaseColor.tarawera,
                  }}>
                  {moment(date).format('DD-MM-YYYY')}
                </Text>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  display="spinner"
                  minimumDate={new Date(moment().subtract(100, 'year'))}
                  maximumDate={new Date(moment().subtract(18, 'year'))}
                  onChange={onChangeDate}
                />
              )}
            </View>
            <DatepickerModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              date={date}
              onChange={onChangeDateIOS}
            />
          </View>

          <View style={BaseStyle.columnFormRight}>
            <View style={[BaseStyle.contentTitle]}>
              <Text
                textAlign="left"
                body2
                style={{width: '100%', color: BaseColor.tarawera}}>
                {t('until')}
              </Text>
              <View
                style={[
                  {
                    minWidth: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 13.3,
                    //backgroundColor: 'teal',
                    borderBottomWidth: 0.8,
                    borderColor: '#bdbdbd',
                  },
                ]}>
                <Text
                  onPress={
                    Platform.OS === 'ios'
                      ? () => {
                          setModalVisible(true);
                        }
                      : () => {
                          setShow(true);
                          setMode('date');
                        }
                  }
                  textAlign="left"
                  body2
                  style={{
                    width: '100%',
                    color: BaseColor.tarawera,
                  }}>
                  {moment(date).format('DD-MM-YYYY')}
                </Text>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  display="spinner"
                  minimumDate={new Date(moment().subtract(100, 'year'))}
                  maximumDate={new Date(moment().subtract(18, 'year'))}
                  onChange={onChangeDate}
                />
              )}
            </View>
            <DatepickerModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              date={date}
              onChange={onChangeDateIOS}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default RenderHeaderFlatlist;

import React, {useState, useEffect, forwardRef} from 'react';
import {View, TouchableOpacity, Modal, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Text, Icon, TextInput,SelectInput} from 'components';
import {useTheme, BaseStyle} from 'config';
import styles from './styles';

const RenderHeaderFlatlist = forwardRef((props, ref) => {
  const {colors} = useTheme();
  const refresh = useSelector(state => state.tokenList.refresh);
  const {t} = useTranslation();
  const [search, setSearch] = useState('');

  const [date, setDate] = useState(new Date(moment()));

  const [modalSinceVisible, setModalSinceVisible] = useState(false);
  const [since, setSince] = useState('');
  const [modalUntilVisible, setModalUntilVisible] = useState(false);
  const [until, setUntil] = useState('');
  const [modalTypeVisible, setModalTypeVisible] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    setSince('');
    setUntil('');
    setType('');
    setSearch('')

    return () => {};
  }, [refresh]);

  React.useImperativeHandle(ref, () => {
    return {
      getInfoParams: () => {
        return { search, since: moment(since).format('YYYY-MM-DD'), until: moment(until).format('YYYY-MM-DD'), type}
      },
    };
  });

  const DatepickerSinceModal = () => {
    const [localDate, setLocalDate] = useState(new Date());
    const onClose = () => setModalSinceVisible(false);

    const onChangeDate = (event, selectedDate) => {
      if (event.type !== 'dismissed') {
        setSince(selectedDate);
      }
      onClose();
    };

    if (Platform.OS === 'ios') {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
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
                    setSince(localDate);
                    setUntil('');
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
                maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                onChange={(event, selectedDate) => setLocalDate(selectedDate)}
              />
            </View>
          </View>
        </Modal>
      );
    }

    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={localDate}
        mode={'date'}
        is24Hour={true}
        display="spinner"
        //textColor='#fff'
        themeVariant="light"
        maximumDate={new Date(moment().format('YYYY-MM-DD'))}
        onChange={onChangeDate}
      />
    );
  };

  const DatepickerUntilModal = () => {
    const [localDate, setLocalDate] = useState(new Date());
    const onClose = () => setModalUntilVisible(false);

    const onChangeDate = (event, selectedDate) => {
      if (event.type !== 'dismissed') {
        setUntil(selectedDate);
      }
      onClose();
    };

    if (Platform.OS === 'ios') {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
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
                    setUntil(localDate);
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
                minimumDate={
                  since === ''
                    ? new Date('1920-01-01')
                    : new Date(moment(since).format('YYYY-MM-DD'))
                }
                onChange={(event, selectedDate) => setLocalDate(selectedDate)}
              />
            </View>
          </View>
        </Modal>
      );
    }

    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={localDate}
        mode={'date'}
        is24Hour={true}
        display="spinner"
        themeVariant="light"
        minimumDate={
          since === ''
            ? new Date('1920-01-01')
            : new Date(moment(since).format('YYYY-MM-DD'))
        }
        onChange={onChangeDate}
      />
    );
  };

  const SelectTypeModal = () => {
    const onClose = () => setModalTypeVisible(false);
    const [typeOperation, setTypeOperation] = useState('')
    const listTypeOperation = [
      {label: 'Editar', value: 'Edit'},
      {label: 'Recargar', value: 'Recharge'},
    ];

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#0008',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View style={{width: '100%', backgroundColor: 'white'}}>
            <View style={[BaseStyle.inputTitle]}>
              <Text subhead semibold>
                {t('type_operation')}
              </Text>
            </View>
            <SelectInput
              listSelect={listTypeOperation}
              onChange={setTypeOperation}
              value={typeOperation}
            />
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
                    setType(typeOperation);
                  }}
                  style={{paddingHorizontal: 15, paddingVertical: 15}}>
                  <Text body1 semibold>
                    {t('done')}
                  </Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View
      style={{
        width: '88%',
        marginLeft: '6%',
        flexDirection: 'column',
        marginTop: 15,
      }}>
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
          marginTop: 15,
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalSinceVisible(true);
          }}>
          <Text caption1 semibold grayColor={since === '' ? true : false}>
            {since === '' ? t('since') : moment(since).format('DD-MM-YYYY')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalUntilVisible(true);
          }}>
          <Text caption1 semibold grayColor={until === '' ? true : false}>
            {until === '' ? t('until') : moment(until).format('DD-MM-YYYY')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalTypeVisible(true)}>
          <Text semibold grayColor={type === '' ? true : false}>
            {t('action')}
          </Text>
        </TouchableOpacity>
      </View>
      {modalSinceVisible && <DatepickerSinceModal />}
      {modalUntilVisible && <DatepickerUntilModal />}
      {modalTypeVisible && <SelectTypeModal />}
    </View>
  );
});

export default RenderHeaderFlatlist;

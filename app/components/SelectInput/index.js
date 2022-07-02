import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme, BaseStyle, BaseColor} from 'config';
import styles from './styles';
import {useTranslation} from 'react-i18next';

import RNPickerSelect from 'react-native-picker-select';

export default function SelectInput(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {style, onChange, value, placeholder, listSelect, ...rest} = props;
  const [select, setSelect] = useState(value);
  const placeholderBase = { 
    label: t('to_select'),
    value: null,
  };

  const [borderColor, setBorderColor] = useState(BaseColor.dividerColor);

  useEffect(() => {
    setSelect(value);
  }, [value]);

  return (
    <View
      style={[
        style,
        {
          borderColor: borderColor,
          borderBottomWidth: 0.8,
          width: '100%',
        },
      ]}>
      <RNPickerSelect
        placeholder={placeholderBase}
        onValueChange={(itemValue) => {
          setSelect(itemValue);
          onChange(itemValue == null ? '' : itemValue);
        }}
        style={styles}
        items={listSelect}
        value={select}
        doneText={t('done')}
      />
    </View>
  );
}

SelectInput.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.object,
  listSelect: PropTypes.array,
};

SelectInput.defaultProps = {
  style: {},
  onChange: (value) => {
    console.log(value);
  },
  value: '',
  placeholder: {
    label: '',
    value: null,
    color: '#9EA0A4',
  },
  listSelect: [],
};

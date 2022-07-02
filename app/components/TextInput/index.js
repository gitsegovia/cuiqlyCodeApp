import React, {forwardRef, useState, useEffect} from 'react';
import {TextInput, View, I18nManager} from 'react-native';
import PropTypes from 'prop-types';
import {BaseStyle, BaseColor, useTheme} from 'config';
import Text from '../Text';
import {useTranslation} from 'react-i18next';

const Index = forwardRef((props, ref) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const cardColor = colors.card;
  const {
    style,
    styleInput,
    onChangeText,
    onFocus,
    onBlur,
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    iconStart,
    onSubmitEditing,
    pattern,
    onValidation,
    textError,
    colorError,
    ...propsText
  } = props;
  const [borderColor, setBorderColor] = useState(BaseColor.dividerColor);

  const handleValidation = value => {
    if (!pattern) return value;

    if (typeof pattern === 'string') {
      const condition = new RegExp(pattern, 'g');
      return condition.test(value);
    }

    if (typeof pattern === 'object') {
      const conditions = pattern.map(rule => new RegExp(rule, 'g'));
      return conditions.map(condition => condition.test(value));
    }
  };

  const onChangeRegExp = value => {
    const isValid = handleValidation(value);
    onValidation && onValidation(isValid);
    onChangeText && onChangeText(value);
  };

  return (
    <>
      <View
        style={[
          BaseStyle.textInput,
          {
            borderColor: borderColor,
            borderBottomWidth: 0.8,
          },
          style,
        ]}>
        {iconStart != null ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 25,
              marginLeft: 5,
            }}>
            {iconStart}
          </View>
        ) : null}
        <TextInput
          ref={ref}
          style={[
            {
              /*fontFamily: 'Raleway'*/
              flex: 1,
              height: multiline ? 'auto' : 25,
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              color: colors.text,
              paddingTop: 0,
              paddingBottom: 0,
              margin: 0,
              textAlignVertical: 'bottom',
            },
            styleInput,
          ]}
          onChangeText={text => onChangeRegExp(text)}
          onFocus={() => {
            onFocus();
            setBorderColor(BaseColor.scarlet);
          }}
          onBlur={() => {
            onBlur();
            setBorderColor(BaseColor.dividerColor);
          }}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={success ? BaseColor.grayColor : BaseColor.error}
          secureTextEntry={secureTextEntry}
          value={value}
          selectionColor={colors.primaryColor}
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={textAlignVertical}
          onSubmitEditing={onSubmitEditing}
          {...propsText}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 25,
            marginRight: 5,
          }}>
          {icon}
        </View>
      </View>
      {success == false ? (
        <Text
          footnote
          regular
          textAlign="left"
          style={{color: colorError, marginTop: 2}}>
          {t(textError)}
        </Text>
      ) : null}
    </>
  );
});

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleInput: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  success: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  icon: PropTypes.node,
  iconStart: PropTypes.node,
  onSubmitEditing: PropTypes.func,
  textError: PropTypes.string,
  colorError: PropTypes.string,
};

Index.defaultProps = {
  style: {},
  styleInput: {},
  onChangeText: text => {},
  onFocus: () => {},
  onBlur: () => {},
  placeholder: '',
  value: '',
  success: true,
  secureTextEntry: false,
  keyboardType: 'default',
  multiline: false,
  textAlignVertical: 'center',
  icon: null,
  iconStart: null,
  onSubmitEditing: () => {},
  textError: 'required',
  colorError: BaseColor.error,
};

export default Index;

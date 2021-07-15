import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

export default function Index(props) {
  const {style, enableRTL, material, ...rest} = props;
  const layoutStyle = enableRTL ? styles.styleRTL : {};
  if (material)
    return (
      <IconMaterialCom
        style={StyleSheet.flatten([style, layoutStyle])}
        {...rest}
      />
    );
  return <Icon style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;

}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  enableRTL: PropTypes.bool,
  material: PropTypes.bool,
};

Index.defaultProps = {
  style: {},
  enableRTL: false,
  material: false,
};

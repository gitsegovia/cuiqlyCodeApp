import React, {useEffect, useRef, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  Platform,
} from 'react-native';

import Text from '@components/Text';
import styles from './styles';
import PropTypes from 'prop-types';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default function Header(props) {
  const forceDark = useSelector(state => state.application.force_dark);
  const colorScheme = useColorScheme();
  const {
    style,
    styleLeft,
    styleCenter,
    styleRight,
    styleRightSecond,
    styleTitle,
    styleSubTitle,
    title,
    subTitle,
    onPressLeft,
    onPressRight,
    onPressRightSecond,
    renderBorder,
    renderLeft,
    renderCenter,
    renderRightSecond,
    renderRight,
    barStyle,
    titleNumberLine,
    blurActive = false,
    noIconLeft,
    noBoxLeft,
    noIconRight,
    noBoxRight,
  } = props;
  const borderStyle = renderBorder ? styles.borderContain : '';
  const refView = useRef();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
  }, []);

  const RenderHeader = () => (
    <View style={[styles.contain, borderStyle, style]} ref={refView}>
      <View style={{flex: 1}}>
        {noIconLeft === false && (
          <TouchableOpacity
            style={[styles.contentLeft, styleLeft]}
            onPress={onPressLeft}>
            <View
              style={
                noBoxLeft === true
                  ? {}
                  : {
                      backgroundColor: '#fff8',
                      width: 35,
                      height: 35,
                      marginBottom: 10,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }
              }>
              {renderLeft()}
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.contentCenter, styleCenter]}>
        {renderCenter != null ? renderCenter() : renderTextCenter()}
      </View>
      <View style={styles.right}>
        {noIconRight === false && (
          <TouchableOpacity
            style={[styles.contentRightSecond, styleRightSecond]}
            onPress={onPressRightSecond}>
            {renderRightSecond()}
          </TouchableOpacity>
        )}
        {noIconRight === false && (
          <TouchableOpacity
            style={[styles.contentRight, styleRight]}
            onPress={onPressRight}>
            <View
              style={
                noBoxRight === true
                  ? {}
                  : {
                      backgroundColor: '#fff8',
                      width: 35,
                      height: 35,
                      marginBottom: 10,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }
              }>
              {renderRight()}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  function renderTextCenter() {
    return (
      <>
        <Text
          callout
          semibold
          numberOfLines={titleNumberLine}
          style={styleTitle}
          textAlign="center">
          {title}
        </Text>
        {subTitle != '' && (
          <Text caption2 light style={styleSubTitle}>
            {subTitle}
          </Text>
        )}
      </>
    );
  }

  return (
    <View
      style={
        Platform.OS === 'android'
          ? {
              paddingTop: StatusBar.currentHeight,
            }
          : {
              paddingTop: 0,
            }
      }>
      <RenderHeader />
    </View>
  );
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleSubTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderBorder: PropTypes.bool,
  renderLeft: PropTypes.func,
  noIconLeft: PropTypes.bool,
  noBoxLeft: PropTypes.bool,
  renderCenter: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  noIconRight: PropTypes.bool,
  noBoxRight: PropTypes.bool,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
  titleNumberLine: PropTypes.number,
};

Header.defaultProps = {
  style: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  styleRightSecond: {},
  styleTitle: {},
  styleSubTitle: {},
  renderBorder: false,
  renderLeft: () => {},
  noIconLeft: false,
  noBoxLeft: false,
  renderCenter: null,
  renderRight: () => {},
  renderRightSecond: () => {},
  noIconRight: false,
  noBoxRight: false,
  onPressLeft: () => {},
  onPressRight: () => {},
  onPressRightSecond: () => {},
  title: '',
  subTitle: '',
  barStyle: '',
  titleNumberLine: 1,
};

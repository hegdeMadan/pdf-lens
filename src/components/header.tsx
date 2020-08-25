import React, { ReactElement } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { sizes, spaces, colors } from '../theme';
import { Heading } from './Text';

type PropType = {
  text: string;
  rightText?: string;
  rightTextColor?: string;
  leftIconName?: string;
  iconSize?: number;
  LeftIcon?: ReactElement;
  RightIcon?: ReactElement;
  rightIconName?: string;
  styleProps?: object;
  iconColor?: string;
  onClick?: Function;
  onClickRight?:Function;
  textAlign?: 'flex-end' | 'flex-start' | 'center';
  headerColor?: string;
  leftText?: string;
}

const Header = ({
  text,
  rightText,
  rightTextColor,
  LeftIcon,
  RightIcon,
  leftIconName,
  rightIconName,
  styleProps,
  iconColor,
  onClick,
  onClickRight,
  iconSize,
  textAlign,
  headerColor,
  leftText
}: PropType) => (
  <View style={{ ...styles.wrapper, ...styleProps }}>
    {leftIconName || leftText ? (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {leftIconName || LeftIcon ? (
          <TouchableOpacity onPress={() => (onClick ? onClick() : null)}>
            <View
              style={{
                ...styles.iconContainer,
                minWidth: moderateScale(sizes.width.header),
              }}
            > 
            { leftIconName ? (
                <Icon
                  name={leftIconName}
                  size={moderateScale(iconSize || sizes.tabIcon)}
                  style={{ ...styles.icon, color: iconColor }}
                />
              ) : null}
              {LeftIcon ? (
                <LeftIcon style={{ ...styles.icon }} />
              ) : null}
              <View />
            </View>
          </TouchableOpacity>
        ) : null}
        {leftText ? (
          <View
            style={{
              justifyContent: 'center',
              paddingLeft: moderateScale(spaces.padding.label)
            }}
          >
            <Heading
              variant='heading'
              text={leftText}
              style={styles.text}
              color={headerColor}
              weight='light'
            />
          </View>        
        ) : null}
      </View>
    ) : (
      <View
        style={{
          height: '100%',
          minWidth: moderateScale(sizes.width.header),
          justifyContent: 'center',
        }}
      />
    )}

    <View style={{ justifyContent: 'center', width: 'auto', alignItems: textAlign || 'center' }}>
      <Heading variant="subHeading" text={text} style={styles.text} color={headerColor} />
    </View>

    {rightIconName || RightIcon || rightText ? (
      <TouchableOpacity onPress={() => (onClickRight ? onClickRight() : null)}>
        <View
          style={{
            ...styles.iconContainer,
            minWidth: moderateScale(sizes.width.header),
          }}
        >
          {RightIcon ? (
            <RightIcon style={{ ...styles.icon }} />
          ) : null}

          { rightIconName
            ? (
              <Icon
                name={rightIconName}
                size={moderateScale(iconSize || 28)}
                style={{ ...styles.icon, color: iconColor }}
              />
            )
            : null
          }
          { rightText
            ? (
              <Heading
                variant="heading3"
                text={rightText}
                style={{
                  ...styles.text,
                  textAlign: 'center',
                  padding: moderateScale(spaces.padding.headerElements),
                }}
                color={rightTextColor}
              />
            ) : null
          }
        </View>
      </TouchableOpacity>
    ) : (
      <View
        style={{
          height: moderateScale(sizes.height.header),
          width: moderateScale(sizes.width.header),
        }}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: moderateScale(sizes.height.header),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.grey.medium,
    borderBottomWidth: 1,
    zIndex: 1,
  },
  iconContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  text: {
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Header;

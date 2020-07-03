import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { borders, spaces, sizes, textColors } from '../theme'

export const TextInputBox = ({
  style,
  placeholder,
  secureText,
  iconName,
  iconSize,
  iconColor,
  leftIcon,
  containerStyle,
  onClick,
}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(
          spaces.padding.search.placeholder.horizontal,
        ),
        ...styles.container,
        flexDirection: leftIcon ? 'row-reverse' : 'row',
        ...containerStyle,
      }}>
      <TextInput
        secureTextEntry={secureText || false}
        style={{ ...styles.input, ...style }}
        placeholder={placeholder || 'Type here'}
      />
      {iconName ? (
        <TouchableOpacity
          onPress={() => (onClick ? onClick() : console.log('icon clicked'))}
          style={{
            alignSelf: 'center',
          }}>
          <View
            style={{
              alignSelf: 'center',
            }}>
            <Icon
              name={iconName}
              size={moderateScale(iconSize || 20)}
              color={iconColor || textColors.smallLabel}
            />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: borders.borderColor.inputText,
    borderWidth: borders.borderWidth.inputText,
    borderRadius: borders.borderRadius.inputText,
  },
  input: {
    height: moderateScale(sizes.height.inputText),
  },
})

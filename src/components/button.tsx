import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ButtonText } from './Text'
import { sizes, buttonColor, borders } from '../theme'
import { moderateScale } from 'react-native-size-matters'

export const Button = props => {
  return (
    <TouchableOpacity onPress={() => props.onClick()}>
      <View
        style={{
          height: moderateScale(sizes.height.button.default),
          backgroundColor: buttonColor.default,
          borderRadius: borders.borderRadius.default,
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          ...props.buttonStyle,
        }}>
        <ButtonText
          text={props.buttonText || 'button'}
          style={{
            ...props.textStyle,
            textAlign: 'center',
          }}
        />
      </View>
    </TouchableOpacity>
  )
}

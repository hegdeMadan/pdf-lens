import React from 'react'
import { View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { sizes } from '../theme'

export const Breaker = props => {
  const height = moderateScale(sizes.height.breaker * (props.variant || 1))
  const horizontal = moderateScale(sizes.width.breaker * (props.variantW || 1))
  return (
    <View
      style={{
        height: height,
        width: horizontal,
      }}
    />
  )
}

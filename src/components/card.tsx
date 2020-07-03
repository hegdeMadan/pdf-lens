import React from 'react'
import { View, ImageBackground } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { colors, sizes, borders, textColors } from '../theme'
import { Heading } from './Text'

export const Card = ({
  style,
  children,
  centerAlign,
  noElevation,
  curve,
  title,
  textVariant,
  image,
  imageStyles,
  imageBackgroundStyle,
}) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: colors.card,
        height: moderateScale(sizes.height.card),
        elevation: noElevation ? 0 : 2,
        borderRadius: curve || borders.borderRadius.card,
        alignSelf: centerAlign ? 'center' : 'flex-start',
        ...style,
      }}>
      {image ? (
        <ImageBackground
          source={image}
          style={{
            width: '100%',
            height: '100%',
            ...imageBackgroundStyle,
          }}
          imageStyle={{ ...imageStyles }}>
          <Heading
            text={title}
            style={{
              padding: moderateScale(spaces.padding.imageCardTitle),
            }}
            variant={textVariant || 'heading'}
            color={textColors.onImageTitle}
          />
        </ImageBackground>
      ) : null}
      {children}
    </View>
  )
}

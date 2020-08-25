import React from 'react'
import { Text } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { sizes, textColors, colors } from '../theme'

type heading = {
  color?: string;
  variant?: 'heading' | 'subHeading' | 'heading2' | 'heading3';
  weight?: string;
  text: string;
  style?: object;
  center?: boolean;
}

export const Label = props => (
  <>
    <Text
      style={{
        color: props.color || textColors.label,
        fontSize: moderateScale(getLabelTextSize(props.variant)),
        fontWeight: props.weight || 'normal',
        ...props.style,
      }}>
      {props.text}
      {props.children}
    </Text>
  </>
)

export const LabelSpacing = props => (
  <>
    <Text
      style={{
        fontWeight: 'bold',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      {props.text}
    </Text>
  </>
)

export const ButtonText = props => (
  <>
    <Text
      style={{
        color: props.color || textColors.button,
        fontSize: moderateScale(sizes.buttonText),
        fontWeight: 'bold',
        ...props.style,
      }}>
      {props.text}
    </Text>
  </>
)

export const Heading = (props: heading) => (
  <>
    <Text
      style={{
        color: props.color || textColors.heading,
        fontSize: moderateScale(getHeadingSize(props.variant || 'heading')),
        fontWeight: props.weight || 'bold',
        fontFamily: 'Roboto',
        textAlign: props.center ? 'center' : 'auto',
        ...props.style,
      }}>
      {props.text}
    </Text>
  </>
)

export const Paragraph = props => (
  <>
    <Text
      style={{
        color: colors.black,
        fontSize: moderateScale(sizes.paragraph),
        fontFamily: 'Roboto',
        ...props.style,
      }}>
      {props.text}
      {props.children}
    </Text>
  </>
)

const getLabelTextSize = variant => {
  if (variant === 'small') {
    return sizes.smallLabel
  }
  if (variant === 'medium') {
    return sizes.mediumLabel
  }
  return sizes.label
}

const getHeadingSize = variant => {
  if (variant === 'heading') {
    return sizes.heading
  }

  if (variant === 'subHeading') {
    return sizes.subHeading
  }

  if (variant === 'heading2') {
    return sizes.heading2
  }

  if (variant === 'heading3') {
    return sizes.heading3
  }
  return sizes.heading
}

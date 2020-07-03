import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const FloatingNav = ({
  text,
  leftIconName,
  rightIconName,
  styleProps,
  iconColor,
  onClick,
}) => (
  <View style={{ ...styles.wrapper, ...styleProps }}>
    <Icon
      name={leftIconName || 'arrow-back'}
      size={moderateScale(28)}
      style={{ ...styles.icon, color: iconColor }}
    />

    <Text style={styles.text}> {text || 'back'} </Text>

    {rightIconName ? (
      // <TouchableOpacity onPress={() => onPress }>
      <Icon
        name={rightIconName}
        size={moderateScale(28)}
        style={{ ...styles.icon, color: iconColor }}
      />
    ) : // </TouchableOpacity>
    null}
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: moderateScale(50),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    zIndex: 1,
  },
  icon: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: moderateScale(10),
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: moderateScale(10),
  },
})

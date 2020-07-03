import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntIcons from 'react-native-vector-icons/AntDesign'
import FeatherIcons from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
// import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import EvilIcons from 'react-native-vector-icons/EvilIcons'
// import IonicIcons from 'react-native-vector-icons/Ionicons'
import { moderateScale } from 'react-native-size-matters'
import { sizes, colors } from '../theme'

type IconPropTypes = {
  focused: boolean;
}

export const HomeIcon = (props: IconPropTypes) => {
  return (
    <FeatherIcons
      name='home'
      size={moderateScale(sizes.tabIcon)}
      color={props.focused ? colors.tabIconFocused : colors.tabIcon}
    />
  )
} 

export const MessagesIcon = (props: IconPropTypes) => {
  return (
    <AntIcons
      name='message1'
      size={moderateScale(sizes.tabIcon)}
      color={props.focused ? colors.tabIconFocused : colors.tabIcon}
    />
  )
}

export const FriendsIcon = (props: IconPropTypes) => {
  return (
    <SimpleLineIcons
      name='people'
      size={moderateScale(sizes.tabIcon)}
      color={props.focused ? colors.tabIconFocused : colors.tabIcon}
    />
  )
}

export const NotficationIcon = (props: IconPropTypes) => {
  return (
    <FeatherIcons
      name='bell'
      size={moderateScale(sizes.tabIcon)}
      color={props.focused ? colors.tabIconFocused : colors.tabIcon}
    />
  )
}

export const CreateIcon = (props: IconPropTypes) => {
  return (
    <AntIcons
      name='pluscircleo'
      size={moderateScale(sizes.tabIcon)}
      color={props.focused ? colors.tabIconFocused : colors.tabIcon}
    />
  )
}

// not used
export const ProfileIcon = props => {
  return (
    <MaterialIcons
      name="person"
      size={moderateScale(sizes.tabIcon)}
      color={props.color}
    />
  )
}

export const DiscoverIcon = props => {
  return (
    <MaterialIcons
      name="explore"
      size={moderateScale(sizes.tabIcon)}
      color={props.color}
    />
  )
}

export const AddStoryIcon = props => {
  return (
    <MaterialIcons
      name="add-circle"
      size={moderateScale(sizes.tabIcon)}
      color={props.color}
    />
  )
}
  
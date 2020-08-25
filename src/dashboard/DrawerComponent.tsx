import React from 'react'
import { View, StyleSheet } from 'react-native'
import { sizes, colors, spaces, borders } from '../theme'
import { moderateScale } from 'react-native-size-matters'
import { Paragraph, Label } from '../components'
import AntIcon from 'react-native-vector-icons/AntDesign'
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { screens } from '../navigator/constants'

const DrawerComponent = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userNameWrapper}>
        <View
          style={styles.avatar}
        >
          <Paragraph text='G' style={{ fontWeight: 'bold', color: colors.white }} />
        </View>
        <View style={styles.userName}>
          <Paragraph text='Guest' style={{ color: colors.white }} />
        </View>
      </View>

      <View style={styles.drawerNavigators}>
        <View style={styles.navigatorContainer}>
          <FeatherIcons
            name='home'
            size={moderateScale(sizes.tabIcon)}
            color={colors.tabIcon}
          />
          <View style={styles.nameBreaker}>
            <Label
              text={screens.home}
            />
          </View>
        </View>

        <View style={styles.navigatorContainer}>
          <AntIcon
            name='pdffile1'
            size={moderateScale(sizes.tabIcon)}
            color={colors.tabIcon}
          />
          <View style={styles.nameBreaker}>
            <Label
              text={screens.exportToPdf}
            />
          </View>
        </View>

        <View style={styles.navigatorContainer}>
          <CommunityIcon
            name='cloud-outline'
            size={moderateScale(sizes.tabIcon)}
            color={colors.tabIcon}
          />
          <View style={styles.nameBreaker}>
            <Label
              text='Sync from cloud'
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomLabel}>
        <Label variant='small'>
          Made with {<AntIcon name='heart' color={colors.red} size={14} />} in India
        </Label>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatar: {
    width: sizes.width.avatar,
    height: sizes.height.avatar,
    backgroundColor: colors.avatar,
    marginHorizontal: spaces.margin.label,
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    marginLeft: spaces.margin.label,
    justifyContent: 'center'
  },
  userNameWrapper: {
    flexDirection: 'row',
    paddingVertical: moderateScale(24),
    backgroundColor: colors.primry
  },
  drawerNavigators: {
    paddingTop: moderateScale(12),
    borderTopWidth: borders.borderWidth.bottomBar,
    borderTopColor: colors.grey.medium,
  },
  navigatorContainer: {
    flexDirection: 'row',
    paddingLeft: spaces.margin.label,
    alignItems: 'center',
    // backgroundColor: colors.hover.primary,
    paddingVertical: moderateScale(10)
  },
  nameBreaker: {
    paddingLeft: moderateScale(20),
  },
  bottomLabel: {
    position: 'absolute',
    bottom: moderateScale(10),
    marginLeft: spaces.margin.label,
  }
})

export default DrawerComponent;

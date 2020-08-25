import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import AntIcons from 'react-native-vector-icons/AntDesign'
import { sizes, colors } from '../theme'
import { moderateScale } from 'react-native-size-matters'
import { Header, Label } from '../components';
import { screens } from '../navigator/constants'
import { noFile } from '../assets'

export const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 0, left: 0 }}>
        <Header
          leftIconName='menu'
          textAlign='flex-start'
          headerColor={colors.grey.superDark}
          iconColor={colors.white}
          iconSize={sizes.miscIcons}
          onClick={() => navigation.openDrawer()}
          styleProps={{
            backgroundColor: colors.primry
          }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image source={noFile} style={{ width: 192, height: 192, alignSelf: 'center' }} />
        <View style={{ maxWidth: moderateScale(256), alignSelf: 'center', paddingTop: moderateScale(5) }}>
          <Label
            text='Looks like you do not have any scans'
            style={{ textAlign: 'center' }}
            weight='bold'
          />
          <View height={moderateScale(4)} />
          <Label
            text='Scan a document from your camera or import one from gallery'
            style={{ textAlign: 'center' }}
            variant='medium'
          />
        </View>
      </View>
      <View style={styles.scanButton}>
        <TouchableOpacity onPress={() => navigation.navigate(screens.scanner)}>
          <View style={styles.scanIcon}>
            <AntIcons
              name='scan1'
              size={moderateScale(sizes.scanIcon)}
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  scanButton: {
    position: 'absolute',
    bottom: moderateScale(32),
    right: moderateScale(48),
    backgroundColor: colors.primry,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: 50,
    justifyContent: 'center',
  },
  scanIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
})

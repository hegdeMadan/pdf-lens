import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid
} from 'react-native'
import PDFScanner from '@woonivers/react-native-document-scanner'
import ImagePicker from 'react-native-image-crop-picker'
import DocumentPicker from 'react-native-document-picker';
import { moderateScale } from 'react-native-size-matters';
import { colors, sizes } from '../theme';
import { Header } from '../components';
import { screens } from '../navigator/constants';
import { exportImageToPdf, copyImage } from '../scripts'

class Scanner extends React.Component {
  constructor(props) {
    super(props);
    this.pdfScannerElement = React.createRef();
    this.deviceWidth = Dimensions.get('window').width;
    this.deviceHeight = Dimensions.get('window').height;
    this.state = {
      data: {},
      isCameraAccessible: false,
      detection: {},
      imageWidth: 0,
      imageHeight: 0,
      initialImage: '',
      pdfFile: null,
      croppedImage: null,
      fileToCrop: null
    }
  }

  captureImage = () => {
    this.pdfScannerElement.current.capture()
  }

  showToast = (isSaved) => {
    if (isSaved) {
      ToastAndroid.show('Document Saved', ToastAndroid.LONG);
    } else {
      ToastAndroid.show('Failed to save the document', ToastAndroid.LONG);
    }
  }

  onExportSuccess = (filePath) => {
    console.log('success')
    this.setState({ pdfFile: filePath });
    this.showToast(true)
  }

  onExportFailure = () => {
    console.log('failed')
    this.showToast(false)
  }

  openFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      exportImageToPdf([res.uri], 'test', this.onExportSuccess, this.onExportFailure)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('user closed the dialouge', err);
      } else {
        throw err;
      }
    }
  }

  onCopySuccess = (destinationPath, pdfFileName) => {
    exportImageToPdf([destinationPath], pdfFileName, this.onExportSuccess, this.onExportFailure)
  }

  cropPicture = (data) => {
    this.setState({ data });
    if (data.croppedImage) {
      ImagePicker.openCropper({
        path: `${data.croppedImage}`,
        freeStyleCropEnabled: true
      }).then(image => {
        console.log('cropped image', image);
        copyImage(image, this.onCopySuccess)
      })
      .catch(() => this.showToast(false))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <PDFScanner
            ref={this.pdfScannerElement}
            style={styles.scanner}
            onPictureTaken={(data) => this.cropPicture(data)}
            // manualOnly={true}
            overlayColor='rgba(255,130,0, 0.7)'
            enableTorch={false}
            quality={0.9}
            onRectangleDetect={({ stableCounter, lastDetectionType }) => {
              this.setState({ detection: { stableCounter, lastDetectionType } })
              console.log('detection', stableCounter, lastDetectionType)
            }}
            detectionCountBeforeCapture={5}
            detectionRefreshRateInMS={50}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <Header
            leftIconName='home'
            textAlign='flex-start'
            headerColor={colors.grey.superDark}
            iconColor={colors.white}
            iconSize={sizes.miscIcons}
            onClick={() => this.props.navigation.navigate(screens.home)}
            styleProps={{
              backgroundColor: colors.primry,
              borderBottomWidth: 0
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.captureImage()}>
            <View style={styles.captureButton} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanner: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
  },
  buttonText: {
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  permissions: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: moderateScale(120),
    backgroundColor: 'rgba(0, 0, 0, 1)',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  captureButton: {
    width: moderateScale(68),
    height: moderateScale(68),
    borderWidth: 1,
    borderColor: colors.grey.light,
    backgroundColor: 'rgba(25, 25, 25, 0.9)',
    borderRadius: 50,
    alignSelf: 'center',
  }
})

export default Scanner;

import { colors } from '../theme';
import RNImageToPdf from 'react-native-image-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getDefinedRandomColor = () => {
  const colorPointer = Math.floor(Math.random() * 11);
  return colors.colorCodes[colorPointer];
};

export const getColor = name => {
  let colorPointer = name.length;
  if (name.length > colors.colorCodes.length - 1) {
    colorPointer = colors.colorCodes.length - 1;
  }
  return colors.colorCodes[colorPointer];
};

export const exportImageToPdf = async (
  filePathArr,
  fileName,
  successCallback,
  failureCallback,
) => {
  try {
    const options = {
      imagePaths: [...filePathArr],
      name: `${fileName}.pdf`,
      quality: 1,
      // maxSize: {
      //   width: this.deviceWidth + 100,
      //   height: (this.deviceHeight * this.deviceWidth) * (this.deviceWidth + 100)
      // }
    };
    const pdf = await RNImageToPdf.createPDFbyImages(options);
    console.log('exported image', pdf.filePath);

    successCallback(pdf.filePath);
  } catch (e) {
    failureCallback();
    console.log(e);
  }
};

export const copyImage = (imageData, successCallback) => {
  const pathArr = imageData.path.split('/');
  const fileName = pathArr[pathArr.length - 1];
  const destinationPath = `${RNFetchBlob.fs.dirs.PictureDir}/${fileName}`;
  const pdfFileName = fileName.split('.')[0];
  RNFetchBlob.fs
    .cp(imageData.path, destinationPath)
    .then(() => {
      successCallback(destinationPath, pdfFileName);
    })
    .catch(err => {
      console.log('error copying', err);
    });
};

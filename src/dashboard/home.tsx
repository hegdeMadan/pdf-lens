import React from 'react';
import { View, Text } from 'react-native'
import RNImageToPdf from 'react-native-image-to-pdf';

const Home = () => {
  const myAsyncPDFFunction = async () => {
    try {
      const options = {
        imagePaths: ['/path/to/image1.png','/path/to/image2.png'],
        name: 'PDFName',
        maxSize: { // optional maximum image dimension - larger images will be resized
          width: 900,
          height: Math.round((1080 / 720) * 900),
        },
        quality: 0.7, // optional compression paramter
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      
      console.log(pdf.filePath);
    } catch(e) {
      console.log(e);
    }
  }
  return (
    <View>
      <Text>
        pdf
      </Text>
      
    </View>
  );
}

export default Home;

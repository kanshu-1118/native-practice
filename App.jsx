import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library';

import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from 'react-native-view-shot';

import { useState, useRef } from 'react';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';




const HomeImage = require('./assets/images/background-image.png');

export default function App() {

  

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible,setIsModalVisible] = useState(false);
  const [showAppOptions,setShowAppOptions] = useState(true);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef();

  const onReset = () => {
    setShowAppOptions(false);
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("保存が完了しました");
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (status === null) {
    requestPermission();
  }

  


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing : true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    } else {
      alert('写真を選んでいません')
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSource={HomeImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon={"refresh"} onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon={"save-alt"} onPress={onSaveImageAsync}/>
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme={"primary"} label="写真を選ぶ" onPress={pickImageAsync} />
          <Button label="この写真を使う" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />      
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionContainer: {
    position:"absolute",
    bottom: 80,
  },
  optionsRow : {
    alignItems:"center",
    flexDirection:"row",
  }
});

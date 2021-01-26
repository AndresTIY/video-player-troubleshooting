/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import VideoPlayer from './VideoPlayer';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// const sample =
//   'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8';
// const sample2 = 'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8';

const dataHttpsHLS = [video1hls, video2hls, video3hls, video4hls, video5hls];

const dataMp4 = [video1, video2, video3, video4, video5];

const dataMp4Http = [
  video1mp4NoS,
  video2mp4NoS,
  video3mp4NoS,
  video4mp4NoS,
  video5mp4NoS,
];

//THIS WORKS

// TRY HLS WITHOUT HTTP - S
const dataHttpHLS = [
  video1hlsNoS,
  video2hlsNoS,
  video3hlsNoS,
  video4hlsNoS,
  video5hlsNoS,
];

const App = () => {
  const [videoUrl, setVideoUrl] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState();
  const [dataForList, setDataForList] = React.useState();

  const handleItemPress = (i) => {
    console.log(dataForList[i]);
    setVideoUrl(dataForList[i]);
    setCurrentIndex(i);
  };
  const handleOnEnd = () => {
    if (currentIndex + 1 < dataForList.length) {
      setVideoUrl(dataForList[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex + 1 === dataForList.length) {
      setVideoUrl(dataForList[0]);
      setCurrentIndex(0);
    }
  };

  const headerComponent = (
    <View style={styles.headerCompStyle}>
      <Button
        title="Use HLS w/HTTP"
        onPress={() => setDataForList(dataHttpHLS)}
      />
      <Button
        title="Use HLS w/HTTPS"
        onPress={() => setDataForList(dataHttpsHLS)}
      />
      <Button title="Use MP4" onPress={() => setDataForList(dataMp4)} />
      <Button
        title="Use MP4 w/HTTP"
        onPress={() => setDataForList(dataMp4Http)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <VideoPlayer handleOnEnd={handleOnEnd} videoUrl={videoUrl} />
      <FlatList
        keyExtractor={(index) => index.toString()}
        ListHeaderComponent={headerComponent}
        data={dataForList}
        renderItem={({index}) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleItemPress(index)}>
            <Text>Video {index}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    flex: 1,
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100,
  },
  headerCompStyle: {flexDirection: 'row', justifyContent: 'center', flex: 1},
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

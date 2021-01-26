import React, {useState, createRef} from 'react';

import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';

import Video from 'react-native-video';

const styles = StyleSheet.create({
  videoPlayer: {
    aspectRatio: 16 / 9,
    width: '100%',
  },
  videoContainer: {
    aspectRatio: 16 / 10,
    // height: 300,
    width: '100%',
  },
  button: {
    // height: 300,
    alignItems: 'center',
    // justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 1,
    width: 120,
    // height: 80,
    alignSelf: 'center',
  },
  videoLoadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

const VideoPlayer = ({videoUrl, handleOnEnd}) => {
  const [isBuff, setIsBuffering] = useState(false);
  const [paused, togglePaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0.0);

  const videoRef = createRef();

  const onBuffer = ({isBuffering}) => {
    console.log({isBuffering});
    setIsBuffering(isBuffering);
  };

  const onLoad = (data) => {
    console.log({onLoadData: data});
  };
  const onError = (data) => {
    console.log({onErrorData: data});
  };

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const onEnd = () => {
    handleOnEnd();
    // trigger next
  };

  return (
    <View style={styles.videoContainer}>
      {isBuff && (
        <View style={styles.videoLoadingIndicator}>
          <ActivityIndicator size="large" color="green" animating={isBuff} />
        </View>
      )}
      {!!videoUrl && (
        <Video
          ref={videoRef}
          playWhenInactive
          playInBackground
          paused={paused}
          controls={false}
          minLoadRetryCount={10}
          resizeMode="contain"
          style={styles.videoPlayer}
          muted={false}
          onLoad={onLoad}
          source={{
            uri: videoUrl,
            type: 'm3u8',
          }}
          onBuffer={onBuffer}
          ignoreSilentSwitch="ignore"
          onProgress={onProgress}
          onEnd={onEnd}
          onError={onError}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => togglePaused(!paused)}>
        <Text>{paused ? 'PLAY' : 'PAUSE'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayer;

// const VIDEO ERROR = {
//   "errorException": "com.google.android.exoplayer2.ExoPlaybackException: com.google.android.exoplayer2.source.UnrecognizedInputFormatException:
// Input does not start with the #EXTM3U header.",
//   "errorString": "Unrecognized media format"
// }

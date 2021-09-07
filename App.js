import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import animalImg from './Constants/ConstData';
const {width, height} = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={animalImg}
        keyExtractor={(item, index) => {
          index.toString;
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });

          return (
            <View
              style={{justifyContent: 'center', width, alignItems: 'center'}}>
              <View
                style={{
                  borderRadius: 18,
                  borderWidth: 10,
                  shadowColor: '#000',
                  shadowOpacity: 0.5,
                  shadowRadius: 20,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  padding: 12,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 14,
                  }}>
                  <Animated.Image
                    source={{uri: item.url}}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      resizeMode: 'cover',
                      transform: [{translateX}],
                    }}
                  />
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => `${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
});

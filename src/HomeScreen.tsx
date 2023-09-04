import React, { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { GestureEvent, PanGestureHandler } from 'react-native-gesture-handler';
import { CardItemType } from "./types/CardItemType";
import { DATA } from "./utils/data";
import { windowWidth } from "./utils/utils";

const SPACING: number = 10;
const ITEM_WIDTH: number = windowWidth * 0.8;
const ITEM_HEIGHT: number = ITEM_WIDTH / 1.5;
const VISIBLE_ITEMS: number = 3;

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<Array<CardItemType>>(DATA);
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const scrollYIndex = React.useRef(new Animated.Value(0)).current
  const scrollYAnimtaed = React.useRef(new Animated.Value(0)).current


  useEffect(() => {
    Animated.spring(scrollYAnimtaed, {
      toValue: scrollYIndex,
      useNativeDriver: true
    }).start()

    // setInterval(() => {
    //   const newIndex: number = Math.floor(Math.random() * data.length)
    //   console.log('newIndex : ', newIndex)
    //   scrollYIndex.setValue(newIndex)
    // }, 2000)
  })


  const renderItem = ({ item, index }: { item: CardItemType, index: number }) => {
    const inputRange = [index - 3, index, index + 1];
    const translateY = scrollYAnimtaed.interpolate({
      inputRange,
      outputRange: [-100, 0, 50]
    })
    const scale = scrollYAnimtaed.interpolate({
      inputRange,
      outputRange: [0.8, 1, 1.3]
    })
    const opacity = scrollYAnimtaed.interpolate({
      inputRange,
      outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0]
    })

    return (
      <Animated.View key={index} style={{
        position: 'absolute',
        top: -ITEM_WIDTH / 4,
        transform: [{
          translateY
        }, {
          scale
        }],
        opacity: opacity
      }}>
        <TouchableOpacity style={styles.cardContainer}
          activeOpacity={0}
          onPress={() => {
            scrollYIndex.setValue(index)
          }}>
          <Image style={styles.bgImage}
            source={{ uri: 'https://picsum.photos/500/300' }} />

          <View style={{ flex: 1, flexDirection: 'row' }}>

            <View style={{ flex: 1 }}>
              <Image source={{ uri: item.userImage }}
                style={styles.userImage} />
              <Text style={styles.cardText}>
                {item.type === 'credit' ? 'Credit' : 'Debit'}
              </Text>
              <View style={styles.balanceContainer}>
                <Text style={styles.dollarSign}>$</Text>
                <Text style={styles.balanceText}>{item.balance}</Text>
              </View>
            </View>
            <Text>{index}</Text>
          </View>

        </TouchableOpacity>
      </Animated.View>
    );
  };

  const onSwipeEnd = (event: GestureEvent<any>) => {
    // console.log(event.nativeEvent)
    // console.log('onSwipeEnd', Math.abs(Math.floor(event.nativeEvent.translationY)))
    // const { translationY } = event.nativeEvent;
    // if (event.nativeEvent.state === State.END) {
    //   if (translationY < 0) {
    //     console.log("User swiped up!", currentIndex);
    //     if (currentIndex > 0) {
    //       setCurrentIndex(currentIndex => currentIndex - 1)
    //       scrollYIndex.setValue(currentIndex)
    //     }
    //   } else if (translationY > 0) {
    //     console.log("User swiped down!", currentIndex);
    //     if (currentIndex < data.length) {
    //       setCurrentIndex(currentIndex => currentIndex + 1)
    //       scrollYIndex.setValue(currentIndex)
    //     }
    //   }
    // }
  }

  const onGesture = (event: GestureEvent<any>) => {
    const { translationY } = event.nativeEvent;

    console.log('onGesture', Math.abs(Math.floor(translationY)))

    const divisor = 30.0;

    let newIndex = currentIndex - (translationY / divisor);

    if (newIndex < 0) newIndex = 0;
    if (newIndex > data.length - 1) newIndex = data.length - 1;

    setCurrentIndex(Math.floor(newIndex))
    console.log('newindex', Math.floor(newIndex))
    scrollYIndex.setValue(Math.floor(newIndex));

    // if (translationY < 0) {
    //   console.log("User swiped up!", currentIndex);
    //   if (currentIndex > 0) {
    //     console.info('qqqqqqqqqqqqqq', currentIndex - Math.floor(newIndex))
    //     setCurrentIndex(currentIndex => currentIndex - Math.floor(newIndex))
    //     scrollYIndex.setValue(currentIndex);
    //   }
    // } else if (translationY > 0) {
    //   console.log("User swiped down!", currentIndex);
    //   if (currentIndex < data.length) {
    //     console.warn('wwwwwwwwwwwwwww', currentIndex + Math.floor(newIndex))
    //     setCurrentIndex(currentIndex => currentIndex + Math.floor(newIndex))
    //     scrollYIndex.setValue(currentIndex)
    //   }
    // }
  }

  return (
    <PanGestureHandler onGestureEvent={onGesture}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        inverted
        contentContainerStyle={styles.flatListContainer}
        removeClippedSubviews={false}
        scrollEnabled={false}
        pagingEnabled
        CellRendererComponent={({ item, index, children, style, ...props }) => {
          const newStyle: StyleProp<ViewStyle> = [
            style,
            {
              zIndex: data.length - index,
            }
          ]
          return (
            <View key={index} style={newStyle}>
              {children}
            </View>
          )
        }}
        renderItem={renderItem}
      />
    </PanGestureHandler>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardText: {
    fontSize: 25,
    fontWeight: 'bold',
    flex: 1,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dollarSign: {
    fontSize: 18,
  },
  balanceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING * 2
  },
  cardContainer: {
    padding: 10,
    backgroundColor: `black`,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'orange',
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  bgImage: {
    position: 'absolute',
    borderRadius: 15,
    start: 0,
    end: 0,
    top: 0,
    bottom: 0,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white'
  },
});

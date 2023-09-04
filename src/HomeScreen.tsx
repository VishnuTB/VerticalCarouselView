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
import { PanGestureHandler } from 'react-native-gesture-handler';
import { CardItemType } from "./types/CardItemType";
import { DATA } from "./utils/data";
import { windowWidth } from "./utils/utils";


const HomeScreen: React.FC = () => {
  const [data, setData] = useState<Array<CardItemType>>(DATA);
  const [index, setIndex] = useState<number>(0)
  const SPACING: number = 10;
  const ITEM_WIDTH: number = windowWidth * 0.8;
  const ITEM_HEIGHT: number = ITEM_WIDTH / 1.5;
  const VISIBLE_ITEMS: number = 5;
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
    //   scrollXIndex.setValue(newIndex)
    // }, 2000)
  })


  const renderItem = ({ item, index }: { item: CardItemType, index: number }) => {
    const inputRange = [index - 1, index, index + 1];
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
        top: -ITEM_WIDTH / 2,
        transform: [{
          translateY
        }, {
          scale
        }],
        opacity: opacity
      }}>
        <TouchableOpacity style={{
          padding: 10,
          backgroundColor: `black`,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: 'orange',
          height: ITEM_HEIGHT,
          width: ITEM_WIDTH,
        }} >
          <Image source={{ uri: item.userImage }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
              borderWidth: 1,
              borderColor: 'white'
            }} />
          <Text style={styles.cardText}>
            {item.type === 'credit' ? 'Credit' : 'Debit'}
          </Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <Text style={styles.balanceText}>{item.balance}</Text>
          </View>

        </TouchableOpacity>
      </Animated.View>
    );
  };

  const onSwipe = (event: any) => {
    console.log('swipe ', event)
    if (event.nativeEvent.translationY > 50) {
      setIndex(index - 1)
      scrollYIndex.setValue(index - 1);
    } else if (event.nativeEvent.translationY < -50) {
      setIndex(index + 1)
      scrollYIndex.setValue(index + 1);
    }
  };
  const gestureHandler = Animated.event(
    [
      {
        nativeEvent: {
          translationY: scrollYAnimtaed,
        },
      },
    ],
    { useNativeDriver: true }
  );


  return (
    <PanGestureHandler {...gestureHandler}
      onHandlerStateChange={onSwipe}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        inverted
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          padding: SPACING * 2
        }}
        scrollEnabled={false}
        removeClippedSubviews={false}
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
});

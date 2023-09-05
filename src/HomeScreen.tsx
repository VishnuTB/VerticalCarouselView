import React, { useState } from "react";
import {
  Animated,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { CardItemType } from "./types/CardItemType";
import { DATA } from "./utils/data";
import { windowWidth } from "./utils/utils";

const SPACING: number = 10;
const ITEM_WIDTH: number = windowWidth * 0.8;
const ITEM_HEIGHT: number = ITEM_WIDTH / 1.5;
const VISIBLE_ITEMS: number = 3;

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<Array<CardItemType>>(DATA);
  const scrollX = React.useRef(new Animated.Value(0)).current
  const scrollYAnimtaed = React.useRef(new Animated.Value(0)).current
  const [enableAnimation, setEnableAnimation] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)



  const renderItem = ({ item, index }: { item: CardItemType, index: number }) => {
    const inputRange = [index - 3, index, index + 1];
    const translateY = scrollYAnimtaed.interpolate({
      inputRange,
      outputRange: [300, 0, 50]
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
        // position: 'absolute',
        // width: '100%',
        transform: [{
          translateY
        }, { scale }],
        opacity: opacity,
      }}>
        <TouchableOpacity style={styles.cardContainer}
          activeOpacity={1}
          onPress={() => {
            console.log('item clicked')
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


  return (
    <View style={{
      height: '100%',
      width: '100%',
      backgroundColor: 'yellow'
    }}>
      <Animated.FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        inverted
        removeClippedSubviews={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate={0}
        bounces={false}
        pagingEnabled
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={2}
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
      />


    </View>
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
  cardContainer: {
    padding: 10,
    backgroundColor: `black`,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'orange',
    height: ITEM_HEIGHT,
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

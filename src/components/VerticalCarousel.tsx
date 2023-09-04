import React, { useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { CardItemType } from "../types/CardItemType";
import { DATA } from "../utils/data";
import { windowWidth } from "../utils/utils";

const SPACING: number = 10;
const ITEM_WIDTH: number = windowWidth * 0.8;
const ITEM_HEIGHT: number = ITEM_WIDTH / 1.5;
const VISIBLE_ITEMS = 5;

const VerticalCarousel: React.FC = () => {
  const [data, setData] = useState<Array<CardItemType>>(DATA);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }: { item: CardItemType, index: number }) => {
    const inputRange = [index - 3, index, index + 1];

    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [-ITEM_HEIGHT, 0, ITEM_HEIGHT]
    });

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5]
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3]
    });

    return (
      <Animated.View style={{
        position: 'absolute',
        zIndex: data.length - index,
        transform: [{ translateY }, { scale }],
        opacity,
      }}>
        <TouchableOpacity style={styles.card} activeOpacity={1}>
          <Image source={{ uri: item.userImage }} style={styles.userImage} />
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

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(_, index) => String(index)}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        padding: SPACING * 2,
      }}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: `black`,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'orange',
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white'
  },
  cardText: {
    fontSize: 25,
    fontWeight: 'bold',
    flex: 1,
    color: 'white',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dollarSign: {
    fontSize: 18,
    color: 'white',
  },
  balanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default VerticalCarousel;

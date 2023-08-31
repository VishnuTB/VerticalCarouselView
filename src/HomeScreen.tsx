import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import Card from "./components/Card";
import Header from "./components/Header";
import { CardItemType } from "./types/CardItemType";

const HomeScreen: React.FC = () => {


  const [cardList, setCardsList] = useState<Array<CardItemType>>([])

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    let initialList: Array<CardItemType> = []
    for (let index = 0; index < 3; index++) {
      initialList.push({
        id: index,
        type: index % 2 === 0 ? 'debit' : 'credit',
        balance: Math.floor(Math.random() * 1999)
      })
    }
    setCardsList(initialList)
  }

  const renderCard = ({ item }: { item: CardItemType }) => {
    return <Card item={item} />
  }

  const addCard = () => {
    setCardsList([...cardList, {
      id: cardList.length,
      type: cardList.length % 2 === 0 ? 'debit' : 'credit',
      balance: Math.floor(Math.random() * 9999)
    }])
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flex: 1 }} />
      <View style={{
        height: 220
      }}>
        <FlatList data={cardList}
          renderItem={renderCard}
          keyExtractor={(item, index) => `${item}${index}`}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={220}
          inverted
        />
      </View>
      <Button title="Add Card"
        onPress={addCard} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
})

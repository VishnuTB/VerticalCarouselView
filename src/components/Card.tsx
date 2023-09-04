import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CardItemType } from "../types/CardItemType";
import { windowHeight } from "../utils/utils";

interface CardProps {
  item: CardItemType;
}

const Card: React.FC<CardProps> = (item: CardProps) => {

  return (
    <View style={{
      height: windowHeight / 4,
      padding: 10
    }}>
      <View style={[styles.container, {
        backgroundColor: `#${Math.floor(Math.random() * 1000000)}`
      }]}>
        <Text style={{
          fontSize: 25,
          fontWeight: 'bold',
          flex: 1
        }}>{item.item.type === 'credit' ? 'Credit' : 'Debit'}</Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'baseline'
        }}>
          <Text style={{
            fontSize: 18
          }}>$</Text>
          <Text style={{
            fontSize: 45,
            fontWeight: 'bold'
          }}>{item.item.balance}</Text>
        </View>
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 10,
    padding: 20,
    flex: 1
  }
})

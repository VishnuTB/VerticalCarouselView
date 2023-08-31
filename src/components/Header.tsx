import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Header: React.FC = () => {
  return <View style={styles.container}>
    <Image style={styles.image}
      source={{ uri: 'https://randomuser.me/api/portraits/women/50.jpg' }} />
    <Text style={styles.title}>Home Screen</Text>
    <Image style={styles.image}
      source={{ uri: 'https://randomuser.me/api/portraits/women/50.jpg' }} />
  </View>
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    flex: 1
  }
})

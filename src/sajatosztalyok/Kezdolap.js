import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LotsOfStyles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>Készítette</Text>
      <Text style={styles.bigBlue}>Bara Péter</Text>
      <Text style={[styles.bigBlue, styles.red]}>Debreceni SZC Baross Gábor Technikum, Szakképző Iskola és Kollégium</Text>
      <Text style={[styles.red, styles.bigBlue]}>Cégünk arra törekszik, hogy a lehető leggyorsabban megtaláljuk elvesztett kutyánkat.</Text>
      <Text style={[styles.red, styles.bigBlue]}>Ügyfélszolgálat:+36-30-475-2725</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign:"center",
    marginTop:35,
    marginLeft:10,
    marginRight:10,
  },
  red: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign:"center",
    marginTop:35,
    marginLeft:10,
    marginRight:10,
  },
});

export default LotsOfStyles;
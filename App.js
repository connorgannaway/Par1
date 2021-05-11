import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/header'

export default function App() {
  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.boldText}>Test update</Text>
      </View>
    </View>
    
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: 'bold'
  },
});

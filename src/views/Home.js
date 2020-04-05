import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Board from '../components/Board'

export default function Home({ route, navigation }) {
  const { playerName } = route.params
  const { difficulty } = route.params

  return (
    <View style={styles.container}>
      <Board playerName={playerName} difficulty={difficulty} navigation={navigation}/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontColor: {
    color: '#fff'
  }
});

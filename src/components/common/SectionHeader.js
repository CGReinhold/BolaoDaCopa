import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectionHeader = ({ character }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{character}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#EAEAEA',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export { SectionHeader };

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const ItemSlider = ({ texto, onClick }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick}>
        <Text style={styles.text}>{texto}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
    fontSize: 20,
    color: '#067bff',
  },
  container: {
    borderBottomWidth: 1,
    borderColor: '#888888',
  },
});

export { ItemSlider };

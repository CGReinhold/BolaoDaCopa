import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const SearchHeader = ({ value, onChangeText }) => {
  const { containerStyle, inputStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        style={inputStyle}
        placeholder="Pesquisar..."
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 38
  },
  inputStyle: {
    height: 50,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});

export { SearchHeader };

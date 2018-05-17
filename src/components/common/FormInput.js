import React from 'react';
import { Text, TextInput, View } from 'react-native';

const FormInput = ({ value, onChangeText, placeholder, keyboardType = 'default' }) => {
  const { inputStyle, containerStyle, placeholderStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={placeholderStyle}>{placeholder}</Text>
      <TextInput
        keyboardType={keyboardType}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#5a5a5a',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    marginLeft: 5
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  placeholderStyle: {
    fontSize: 22,
  }
};

export { FormInput };

import React from 'react';
import { Image, TextInput, View } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry, icon }) => {
  const { iconStyle, inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Image style={iconStyle} source={icon} />
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor='#9e9e9e'
        autoCorrect={false}
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
    marginLeft: 5,
    marginRight: 5,
  },
  iconStyle: {
    tintColor: '#cecece',
    height: 20,
    width: 20
  }
};

export { Input };

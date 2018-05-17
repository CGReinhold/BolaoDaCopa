import React from 'react';
import { Switch, Text, View } from 'react-native';

const SwitchConfig = ({ value, onChange, label }) => {
  const { inputStyle, containerStyle, textStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{label}</Text>
      <Switch style={inputStyle} value={value} onValueChange={onChange} />
    </View>
  );
};

const styles = {
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    flex: 2,
    marginLeft: 5
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  textStyle: {
    fontSize: 21,
    fontWeight: 'bold',
  }
};

export { SwitchConfig };

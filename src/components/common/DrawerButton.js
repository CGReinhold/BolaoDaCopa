import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const DrawerButton = ({ onPress, icon, children }) => {
  const { buttonStyle, textStyle, viewStyle, iconStyle } = styles;

  return (
    <View style={viewStyle}>
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Image style={iconStyle} source={icon} />
        <Text style={textStyle}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    height: 24,
    width: 24
  },
  viewStyle: {
    height: 40,
    marginTop: 15,
  },
  textStyle: {
    color: '#3d3f41',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5
  }
};

export { DrawerButton };

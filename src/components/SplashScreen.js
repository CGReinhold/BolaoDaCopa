import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Images from '../../images';

class SplashScreen extends Component {

  componentWillMount() {
    AsyncStorage.getItem('firebaseUser').then((dados) => {
      if (dados) {
        Actions.main();
      } else {
        Actions.auth();
      }
    }).catch(() => { Actions.auth(); });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.logo} />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  }
});

export { SplashScreen };

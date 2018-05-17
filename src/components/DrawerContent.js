import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { DrawerButton } from './common';
import Images from '../../images';

class DrawerContent extends Component {

  onLogoutPress() {
    AsyncStorage.clear();
    Actions.auth({ type: 'reset' });
  }

  onApostasPress() {
    Actions.apostas();
  }

  onRankingPress() {
    Actions.ranking();
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Image source={Images.logo} />
        </View>
        <DrawerButton icon={Images.dice} onPress={this.onApostasPress.bind(this)}>
          Minhas apostas
        </DrawerButton>
        <DrawerButton icon={Images.trophy} onPress={this.onRankingPress.bind(this)}>
          Ranking
        </DrawerButton>
        <DrawerButton icon={Images.logout} onPress={this.onLogoutPress.bind(this)}>
          Sair
        </DrawerButton>
      </View >
    );
  }
}


const styles = StyleSheet.create({
  header: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    marginTop: 0,
  }
});

export { DrawerContent };

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Spinner } from './common';
import { myBetsFetch } from '../actions';
import ChangeableMatch from './ChangeableMatch';

class MyBets extends Component {
  componentWillMount() {
    this.props.myBetsFetch();
  }

  renderItem(item, bets) {
    console.log('item: ' + JSON.stringify(item.name));

    //TODO: Buscar os dados preenchidos do usuário e exibir na tela
    // if (bets.myBets) {
    //   const match = bets.myBets.filter(bet => bet.u === item.name.toString());
    //   console.log('match: ' + JSON.stringify(match.homeCcore));
    //   if (item.type === 'group') return <ChangeableMatch match={item} homeScore={match.homeCcore} awayScore={} />;
    // }
    if (item.type === 'group') return <ChangeableMatch match={item} />;
  }

  render() {
    if (this.props.loading) return <Spinner size="small" />;
    return (
      <View style={styles.container}>
        <FlatList        
          data={this.props.partidas}
          renderItem={item => this.renderItem(item.item, this.props.bets)}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box1: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
});

const mapStateToProps = state => {
  const { partidas } = state.matches;
  return { partidas, bets: state.myBets };
};

export default connect(mapStateToProps, { myBetsFetch })(MyBets);

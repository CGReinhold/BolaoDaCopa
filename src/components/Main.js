import { connect } from 'react-redux';
import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Spinner } from './common';
  import { matchesFetch, groupsAndGamesFetch } from '../actions';
import Match from './Match';

class Main extends Component {
  componentWillMount() {
    this.props.matchesFetch();
    this.props.groupsAndGamesFetch();
  }

  renderItem({ item }) {
    if (item.type === 'group') return <Match match={item} />;
  }

  render() {
    //TODO: Exibir só spinner enquanto não carregou a janela. Verificar porque não está funcionando direito
    if (this.props.loading) {      
      return <Spinner size="small" />;
    }
    
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.partidas}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
});

const mapStateToProps = state => {
    const { partidas } = state.matches;
    const { groups } = state.groupsAndGames;

  return { partidas, groups };
};

export default connect(mapStateToProps, { matchesFetch, groupsAndGamesFetch })(Main);

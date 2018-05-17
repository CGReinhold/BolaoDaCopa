import { connect } from 'react-redux';
import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Spinner } from './common';
import { matchesFetch } from '../actions';
import Match from './Match';

class Main extends Component {
  componentWillMount() {
    this.props.matchesFetch();
  }

  renderItem({ item }) {
    return <Match match={item} />;
  }

  render() {
    if (this.props.loading) return <Spinner size="small" />;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.partidas}
          renderItem={this.renderItem}
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
  console.log(JSON.stringify(partidas));
  return { partidas };
};

export default connect(mapStateToProps, { matchesFetch })(Main);

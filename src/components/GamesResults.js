import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { groupsAndGamesFetch } from '../actions';

class GamesResults extends Component {
    componentWillMount() {
        this.props.groupsAndGamesFetch();
    }

    render() {
        return (
            <View styles={styles.container}> {JSON.stringify(this.props.gruposInf)} </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
});

const estadoComp = state => {
    const { gruposInf } = state.groupsAndGames;

    return { gruposInf };
};

export default connect(estadoComp, { groupsAndGamesFetch })(GamesResults);

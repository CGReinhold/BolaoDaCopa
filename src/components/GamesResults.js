import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { groupsAndGamesFetch } from '../actions';

class GamesResults extends Component {

    componentWillMount() {
        index = 0;
        this.props.groupsAndGamesFetch();
    }

    render() {
        index++;
        return (
            <View style={styles.container}>
                <Text>                                       
                    "Teste" {index + '  ' + JSON.stringify(this.props.gruposInf)} 
                </Text>
            </View>
        );
    }
}
 
let { index } = 0;

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

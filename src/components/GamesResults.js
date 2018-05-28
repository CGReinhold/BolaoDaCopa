import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { groupsAndGamesFetch } from '../actions';
import { Spinner } from './common';

class GamesResults extends Component {

    componentWillMount() {
        index = 0;
        this.props.groupsAndGamesFetch();
    }

    render() {
        if (this.props.loading === undefined || this.props.loading) {
            return <Spinner size="large" />;
        }
        index++;
        return (
            <View style={styles.container}>
                <Text>
                    "Teste" {index + '  ' + JSON.stringify(this.props.listaGruposEJogos)} 
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
    const { loading, listaGruposEJogos } = state.groupsAndGames;
    
    // let sss = null;

    // try {
    //     if (state.groupsAndGames.listaGruposEJogos) {
    //         sss = state.groupsAndGames.listaGruposEJogos; 
    //     } else {
    //         sss = state.groupsAndGames;
    //     }
    // } catch (err) {
    //     sss = state.groupsAndGames;
    // }
    // const { gruposInf } = sss;

    return { loading, listaGruposEJogos };
};

export default connect(estadoComp, { groupsAndGamesFetch })(GamesResults);

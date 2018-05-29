import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Pages } from 'react-native-pages';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { groupsAndGamesFetch } from '../actions';
import { Spinner, CardSection } from './common';
import Match from './Match';

class GamesResults extends Component {
  
    componentWillMount() {
        this.props.groupsAndGamesFetch();
    }

    renderGroupMatches({ item }) {
        return (<View key={item.uid} >
                    <CardSection style={styles.center}>
                        <Text>{item.name}</Text>
                    </CardSection>
                    <CardSection style={styles.container}>
                        <Match Match={item.partidas[0]} />
                        <Match Match={item.partidas[1]} />
                    </CardSection>
                </View>
               );         
    }

    render() {
        if (this.props.loading === undefined || this.props.loading) {
            return <Spinner size="large" />;
        }

        const jogosPrimeiraRodada = this.props.listaGruposEJogos;
        const finaleira = jogosPrimeiraRodada.map(item => {
           const partidasGrupos = item.matches.filter(partidas => partidas.matchday === 1);
           return { name: item.name, uid: item.uid, partidas: partidasGrupos };
        });

        console.clear();
        console.log(finaleira);
        return (
            <Pages indicatorPosition='bottom' indicatorOpacity={0.40} indicatorColor='rgb(117, 117, 117)' >
                <View style={styles.container}>
                    <CardSection style={styles.center}>
                        <Text >{'1ª Rodada'}</Text>                        
                    </CardSection>
                    <CardSection>
                        <FlatList 
                                style={styles.container}
                                data={finaleira}
                                keyExtractor={(item, index) => item.uid + index.toString()}
                                renderItem={this.renderGroupMatches} 
                        />
                    </CardSection>
                </View>
                <View style={{ flex: 1, backgroundColor: 'green' }} />
                <View style={{ flex: 1, backgroundColor: 'blue' }} />
            </Pages>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',    
  },

  center: {
      justifyContent: 'center'
  }
});

const estadoComp = state => {    
    const { loading, listaGruposEJogos } = state.groupsAndGames;

    return { loading, listaGruposEJogos };
};

export default connect(estadoComp, { groupsAndGamesFetch })(GamesResults);

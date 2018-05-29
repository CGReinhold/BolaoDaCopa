import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Pages } from 'react-native-pages';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { groupsAndGamesFetch, selecoesFetch } from '../actions';
import { Spinner, CardSection } from './common';
import Match from './Match';

class GamesResults extends Component {
  
    componentWillMount() {
        this.props.selecoesFetch();
        this.props.groupsAndGamesFetch();        
    }

    renderGroupMatches({ item }) {
        const primeiraPartida = item.partidas[0];        
        const segundaPartida = item.partidas[1];        

        // primeiraPartida.away_team = this.props.selecoes.filter(time => time.id === primeiraPartida.away_team);
        // segundaPartida.home_team = this.props.selecoes.filter(time => time.id === primeiraPartida.home_team);

        return (<View key={item.uid} >
                    <CardSection style={styles.center}>
                        <Text>{item.name}</Text>
                    </CardSection>
                    <CardSection style={styles.container}>
                        <Match match={primeiraPartida} />
                        <Match match={segundaPartida} />
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
    const { selecoes } = state.selecoes;

    return { loading, listaGruposEJogos, selecoes };
};

export default connect(estadoComp, { groupsAndGamesFetch, selecoesFetch })(GamesResults);

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { CardSection } from './common';
import Match from './Match';
import ChangeableMatch from './ChangeableMatch';

const ExibirPartidas = ({ partidas }) => {
    const bloqueioApostas = Date.UTC(2018, 6, 14, 14, 0, 0, 0);

    if (partidas === null || (partidas && (partidas.length === 0 || partidas[0].away_team.length === 0))) {
        return (<CardSection style={styles.listaPartidas}>
            <Text>Nenhum jogo</Text>
        </CardSection>);
    }

    if (partidas && partidas[0].home_aposta && bloqueioApostas > Date.now()) {
        return (
            <CardSection style={styles.listaPartidas}>
                <ChangeableMatch match={partidas[0]} />
                <ChangeableMatch match={partidas[1]} />
            </CardSection>
             );
    }

    return (
        <CardSection style={styles.listaPartidas}>
            <Match match={partidas[0]} />
            <Match match={partidas[1]} />
        </CardSection>
    );
};

const styles = StyleSheet.create({
    listaPartidas: { 
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#efefef'
  }    
});

export default ExibirPartidas;

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { CardSection } from './common';
import Match from './Match';
import ChangeableMatch from './ChangeableMatch';

function listaPartidas(partidas, readOnly, exibindoOutroUsuario) {
  const p = [];
  for (let i = 0; i < partidas.length; i++) {
    if (partidas[i].away_team.length && partidas[i].home_team.length) {
      if (readOnly) {
        p.push(<Match match={partidas[i]} />);
      } else {
        p.push(<ChangeableMatch match={partidas[i]} readOnly={exibindoOutroUsuario} />);
      }
    }
  }
  return p;
}

const ExibirPartidas = ({ partidas, readOnly }) => {
  if (partidas === null || (partidas && (partidas.length === 0 || partidas[0].away_team.length === 0))) {
    return (<CardSection style={styles.listaPartidas}>
      <Text>Nenhum jogo</Text>
    </CardSection>);
  }

  if (partidas && partidas[0].home_aposta) {
    return (
      <CardSection style={styles.listaPartidas}>
        {listaPartidas(partidas, false, readOnly)}
      </CardSection>
    );
  }

  return (
    <CardSection style={styles.listaPartidas}>
      {listaPartidas(partidas, true)}
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

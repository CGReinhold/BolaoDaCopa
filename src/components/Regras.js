import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

class Regras extends Component {
  render() {
    return (
      <ScrollView style={{ margin: 10, flex: 1 }}>
        <Text style={styles.texto}>
          O desafio se baseia em dar palpites dos resultados dos jogos de maneira a acertar o resultado do jogo real da copa do mundo 2018 de futebol.
        </Text>
        <Text style={styles.texto}>
          Existe uma premiação bônus para quem acertar a seleção que será campeã da copa.
        </Text>
        <Text style={styles.texto}>
          Se ocorrer algum W.O, será definido um valor de 3 a 0 para a equipe que não causou o W.O. Se por algum motivo, o W.O for causado por ambas as equipes, será considerado o placar de 0 a 0.
        </Text>
        <Text style={styles.subtitle}>
          Resumo de pontos por partida:
        </Text>
        <Table borderStyle={{ borderWidth: 2 }} >
          <Row data={['Pontos', 'Ação']} style={styles.head} textStyle={styles.headText} />
          <Rows textStyle={styles.bodyText} data={[['1', 'Acertar o placar feito pela seleção'], ['1', 'Acertar a equipe vencedora ou acertar que seria empate'], ['2', 'Acertar exatamente o placar']]} />
        </Table>
        <Text style={styles.texto}>          
        </Text>
        <Text style={styles.subtitle}>
          Pontos Bônus:
        </Text>
        <Text style={styles.texto}>
          10 - Acertar o campeão da copa do mundo. Serão somados ao término da grande final.
        </Text>
        <Text style={styles.subtitle}>
          O mecânismo de apostas será divido em 2 fases. Fase de grupos e Mata-mata.
        </Text>
        <Text style={styles.subtitle}>
          Fase de grupos:
        </Text>
        <Text style={styles.texto}>    
          - serão levados em conta os resultados do tempo regulamentar da partida.
        </Text>
        <Text style={styles.texto}>    
          - é possível realizar às apostas até o dia 14/06/18 às 10 horas, horário de Brasilia.
        </Text>
        <Text style={styles.subtitle}>
          Mata a mata:
        </Text>
        <Text style={styles.texto}>    
          - será levado em conta primeiramente o placar da partida, se persistir o empate, será utilizado o placar da prorrogação.
        </Text>
        <Text style={styles.texto}>    
          - Não importa quem passar nos pênaltis. Se a prorrogação terminar empatada, será considerado empate.
        </Text>
        <Text style={styles.texto}>    
          - Será possível realizar as apostas da fase mata-mata até 1 hora antes do inicio na primeira partida da fase. Por exemplo, o primeiro
jogo das oitavas está marcado para o dia 01/07/18 às 15:00. Os usuários podem apostar até as 14:00 horas. Nas quartas, semis e final funciona da mesma maneira.
        </Text>
        <Text style={styles.subtitle} >
        Exemplificação da pontuação:
        </Text>
        <Text style={styles.texto}>    
        Resultado: Brasil 2 x 0 Croácia
        </Text>
        <Text style={styles.texto}>
         </Text>
         <Text style={styles.subtitle}>
           Palpite 1: 
         </Text>         
        <Text style={styles.texto}>
        Brasil 1 x 0 Croácia
        </Text>
        <Text style={styles.subtitle}>
          Calculando pontos: 
         </Text>
        <Text style={styles.texto}>
        1 ponto por acertar o placar da Croácia + 1 ponto por acertar que o Brasil venceria
        </Text>
        <Text style={styles.texto}>
        Total de pontos: 2
        </Text>
        <Text style={styles.texto}>          
        </Text>
        <Text style={styles.subtitle}>
        Palpite 2:
        </Text>        
        <Text style={styles.texto}>
         Brasil 2 x 0 Croácia
        </Text>
        <Text style={styles.subtitle}>
        Calculando pontos: 
        </Text>
        <Text style={styles.texto}>
        1 ponto por acertar o placar da Croácia + 1 ponto por acertar o placar do Brasil + 1 ponto por acertar que o Brasil venceria + 2 pontos por acertar na veia
        </Text>
        <Text style={styles.texto}>
        Total de pontos: 5
        </Text>
        <Text style={styles.texto}>
        </Text>
        <Text style={styles.subtitle}>        
        Palpite 3: 
        </Text>
        <Text style={styles.texto}>
        Brasil 0 x 0 Croácia
        </Text>
        <Text style={styles.subtitle}>        
          Calculando pontos:
        </Text>
        <Text style={styles.texto}>
         1 ponto por acertar o placar da Croácia
        </Text>
        <Text style={styles.texto}>
        Total de pontos: 1
        </Text>
        <Text style={styles.texto}>
        </Text>
        <Text style={styles.subtitle}>        
          Palpite 4:
        </Text>
        <Text style={styles.texto}>
         Brasil 0 x 1 Croácia
        </Text>
        <Text style={styles.subtitle}>        
        Calculando pontos: 
        </Text>
        <Text style={styles.texto}>
        Errou tudo.
        </Text>
        <Text style={styles.texto}>
        Total de pontos: 0
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    texto: { fontSize: 18, marginBottom: 10 },
    head: {
       height: 40,
       backgroundColor: '#f3f3f3'       
    },
    headText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bodyText: {
      fontSize: 18,
      textAlign: 'center'
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10
    }
});

export { Regras };

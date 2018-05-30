import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { CardSection } from './common';
import Match from './Match';

const ListGames = ({ title, jogosPorGruposDaRodada }) => {
                console.log(title);
                console.log(JSON.stringify(jogosPorGruposDaRodada));
                return (
                    <View style={styles.container} >
                        <CardSection style={styles.center}>
                            <Text >{title}</Text>                        
                        </CardSection>
                        <CardSection>
                            <FlatList 
                                    style={styles.container}
                                    data={jogosPorGruposDaRodada}
                                    keyExtractor={(item, index) => item.uid + index.toString()}
                                    renderItem={({ item }) => <View key={item.uid} >
                                                                    <CardSection style={styles.center}>
                                                                        <Text>{item.name}</Text>
                                                                    </CardSection>
                                                                    <CardSection style={styles.listaPartidas}>
                                                                        <Match match={item.partidas[0]} />
                                                                        <Match match={item.partidas[1]} />
                                                                    </CardSection>
                                                                </View>} 
                            />
                        </CardSection>
                    </View>
                );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',    
  },

  center: {
      justifyContent: 'center'
  },

  listaPartidas: { 
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#efefef'
  }
});

export default ListGames;

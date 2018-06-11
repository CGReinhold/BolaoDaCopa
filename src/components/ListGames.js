import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { CardSection } from './common';
import ExibirPartida from './ExibirPartidas';


const ListGames = ({ title, jogosPorGruposDaRodada, readOnly }) => {
  return (
    <View style={styles.container}>
      <CardSection style={styles.center}>
        <Text >{title}</Text>
      </CardSection>
      <CardSection>
        <FlatList 
          keyboardShowPersistTaps
          data={jogosPorGruposDaRodada}
          keyExtractor={(item, index) => item.uid + index.toString()}
          renderItem={({ item }) => (
            <View key={item.uid} >
              <CardSection style={styles.center}>
                <Text>{item.name}</Text>
              </CardSection>
              <ExibirPartida partidas={item.partidas} readOnly={readOnly} />
              <View><Text >{'   '}</Text></View>
            </View>
          )} 
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
  }  
});

export default ListGames;

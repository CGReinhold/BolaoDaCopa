import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Pages } from 'react-native-pages';
import { groupsAndGamesFetch } from '../actions';
import { Spinner } from './common';
import ListGames from './ListGames';

class GamesResults extends Component {
  
    componentWillMount() {
        this.props.groupsAndGamesFetch();
    }

    jogosDaRodada(rodada) {
        const todosJogos = this.props.listaGruposEJogos;
        
        return todosJogos.map(item => {
           const partidasGrupos = item.matches.filter(partidas => partidas.matchday === rodada);
           return { name: item.name, uid: item.uid, partidas: partidasGrupos };
        });       
    }

    render() {
        if (this.props.loading === undefined || this.props.loading) {
            return <Spinner size="large" />;
        }
                
        return (
            <Pages indicatorPosition='bottom' indicatorOpacity={0.40} indicatorColor='rgb(117, 117, 117)' >
                <ListGames title='1ª Rodada' jogosPorGruposDaRodada={this.jogosDaRodada(1)} />
                <ListGames title='2ª Rodada' jogosPorGruposDaRodada={this.jogosDaRodada(2)} />
                <ListGames title='3ª Rodada' jogosPorGruposDaRodada={this.jogosDaRodada(3)} />
            </Pages>
        );
    }
}

const estadoComp = state => {    
    const { loading, listaGruposEJogos } = state.groupsAndGames;
    const { selecoes } = state.selecoes;

    return { loading, listaGruposEJogos, selecoes };
};

export default connect(estadoComp, { groupsAndGamesFetch })(GamesResults);

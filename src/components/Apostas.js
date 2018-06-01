import { connect } from 'react-redux';
import React, { Component } from 'react';
import { myBetsFetch } from '../actions';
import { Spinner } from './common';
import ListGames from './ListGames';

class Apostas extends Component {
    componentWillMount() {
        this.props.myBetsFetch();
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

        const jogosPrimeiraRodada = this.jogosDaRodada(1);
        const apostasUsuario = this.props.myBets;

        const minhasApostasPrimeiraRodada = jogosPrimeiraRodada.map(elemento => {
            const partidasResultadosMinhasApostas = elemento.partidas.map(partida => {
                const apostaPartida = apostasUsuario.filter(p => p.u === partida.name);
                
                if (apostaPartida && apostaPartida.lenght > 0) {
                    return { ...partida, home_aposta: apostaPartida.homeScore ? apostaPartida.homeScore : '0', away_aposta: apostaPartida.awayScore ? apostaPartida.awayScore : '0' };
                }

                return { ...partida, home_aposta: '0', away_aposta: '0' };
            });

            return { ...elemento, partidas: partidasResultadosMinhasApostas };
        });        

        console.log(JSON.stringify(minhasApostasPrimeiraRodada));

        return (<ListGames title='1ª Rodada' jogosPorGruposDaRodada={minhasApostasPrimeiraRodada} />);
    }
}

const estado = state => {
    const { listaGruposEJogos } = state.groupsAndGames;
    
    if (state.bets !== undefined && state.bets.loading !== undefined) {
        const { loading, myBets } = state.bets;
        return { loading, myBets, listaGruposEJogos };
    }
    return { listaGruposEJogos, loading: true };
};

export default connect(estado, { myBetsFetch })(Apostas);

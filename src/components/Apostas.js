import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Pages } from 'react-native-pages';
import { myBetsFetch } from '../actions';
import { Spinner } from './common';
import ListGames from './ListGames';

class Apostas extends Component {
    componentWillMount() {
        this.props.myBetsFetch();
    }

    filtrarJogosMataMata(rodada) {
        let todosJogos = this.props.listaGruposEJogos;

        if (rodada > 3) {
            if (rodada === 4) {
                todosJogos = todosJogos.filter(gruposValidos => gruposValidos.name === 'Oitavas');
            }

            if (rodada === 5) {
                todosJogos = todosJogos.filter(gruposValidos => gruposValidos.name === 'Quartas');
            }

            if (rodada === 6) {
                todosJogos = todosJogos.filter(gruposValidos => gruposValidos.name === 'Semis');
            }

            if (rodada === 7) {
                todosJogos = todosJogos.filter(gruposValidos => gruposValidos.name === 'Final');
            }
        } else {
            todosJogos = todosJogos.filter(gruposValidos => gruposValidos.name !== 'Oitavas' && gruposValidos.name !== 'Quartas' && gruposValidos.name !== 'Semis' && gruposValidos.name !== 'Final');
        }

        return todosJogos;
    }

    jogosDaRodada(rodada) {
        const jogos = this.filtrarJogosMataMata(rodada);
        //const jogos = this.props.listaGruposEJogos;
        return jogos.map(item => {
           const partidasGrupos = item.matches.filter(partidas => partidas.matchday === rodada);
           return { name: item.name, uid: item.uid, partidas: partidasGrupos };
        });       
    }

    findUserBetForMatch(partida) {
            const apostaPartida = this.props.myBets.filter(p => p.u === partida.name.toString());
                
            if (apostaPartida && apostaPartida.length > 0) {
                return { ...partida, home_aposta: apostaPartida[0].homeScore ? apostaPartida[0].homeScore : '0', away_aposta: apostaPartida[0].awayScore ? apostaPartida[0].awayScore : '0' };
            }

            return { ...partida, home_aposta: '0', away_aposta: '0' };
    }

    minhasApostasDaRodada(jogosRodada) {
        if (jogosRodada) {
            return jogosRodada.map(elemento => {
                return { ...elemento, partidas: elemento.partidas.map(partida => this.findUserBetForMatch(partida)) };
            });        
        }
    }

    render() {
        if (this.props.loading === undefined || this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Pages>
                <ListGames title='1ª Rodada' jogosPorGruposDaRodada={this.minhasApostasDaRodada(this.jogosDaRodada(1))} />
                <ListGames title='2ª Rodada' jogosPorGruposDaRodada={this.minhasApostasDaRodada(this.jogosDaRodada(2))} />
                <ListGames title='3ª Rodada' jogosPorGruposDaRodada={this.minhasApostasDaRodada(this.jogosDaRodada(3))} />
                <ListGames title='Mata-Mata' jogosPorGruposDaRodada={this.minhasApostasDaRodada(this.jogosDaRodada(4))} />
                <ListGames title='Mata-Mata' jogosPorGruposDaRodada={this.minhasApostasDaRodada(this.jogosDaRodada(5))} />
                <ListGames title='Mata-Mata' jogosPorGruposDaRodada={this.minhasApostasDaRodada(this.jogosDaRodada(6))} />
                <ListGames title='Mata-Mata' jogosPorGruposDaRodada={this.minhasApostasDaRodada(this.jogosDaRodada(7))} />
            </Pages>
        );
    }
}

const estado = state => {
    const { listaGruposEJogos } = state.groupsAndGames;
    
    //Acho q esse if não é necessário só q to com pressa... TODO: Remover depois, verificar se pode remover
    if (state.bets !== undefined && state.bets.loading !== undefined) {
        const { loading, myBets } = state.bets;
        return { loading, myBets, listaGruposEJogos };
    }
    return { listaGruposEJogos, loading: true };
};

export default connect(estado, { myBetsFetch })(Apostas);

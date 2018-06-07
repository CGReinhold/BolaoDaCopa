import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Picker, View, Text } from 'react-native';
import { Spinner } from './common';
import { selecaoCampeaFetch, setSelecaoCampea } from '../actions';


class EscolherSelecaoCampea extends Component {
    componentWillMount() {
        this.props.selecaoCampeaFetch();
    }

    render() {
        if (this.props.loading === undefined || this.props.loading) {
            return <Spinner size="large" />;
        }

        const bloqueioApostas = Date.UTC(2018, 6, 14, 14, 0, 0, 0);

        if (bloqueioApostas < Date.now()) {
            let nomeSelecao = 'Brasil';
            
            switch (this.props.selecao) {
                case 'BRA':
                    nomeSelecao = 'Brasil';
                    break;
                case 'KSA':
                nomeSelecao = 'Arábia Saudita';
                break;
                case 'EGI':
                nomeSelecao = 'Egito';
                break;
                case 'URU':
                nomeSelecao = 'Uruguai';
                break;
                case 'POR':
                nomeSelecao = 'Portugal';
                break;
                case 'ESP':
                nomeSelecao = 'Espanha';
                break;
                case 'MAR':
                nomeSelecao = 'Marrocos';
                break;
                case 'IRN':
                nomeSelecao = 'Irã';
                break;
                case 'FRN':
                nomeSelecao = 'França';
                break;
                case 'AUS':
                nomeSelecao = 'Austrália';
                break;
                case 'PER':
                nomeSelecao = 'Peru';
                break;
                case 'DEN':
                nomeSelecao = 'Dinamarca';
                break;
                case 'ARG':
                nomeSelecao = 'Argentina';
                break;
                case 'ISL':
                nomeSelecao = 'Islândia';
                break;
                case 'CRO':
                nomeSelecao = 'Croácia';
                break;
                case 'NGA':
                nomeSelecao = 'Nigéria';
                break;
                case 'SUI':
                nomeSelecao = 'Suiça';
                break;
                case 'CRC':
                nomeSelecao = 'Costa Rica';
                break;
                case 'SRB':
                nomeSelecao = 'Sérvia';
                break;
                case 'GER':
                nomeSelecao = 'Alemanha';
                break;
                case 'MEX':
                nomeSelecao = 'México';
                break;
                case 'SWE':
                nomeSelecao = 'Suécia';                
                break;
                case 'KOR':
                nomeSelecao = 'Coréia do Sul';                
                break;
                case 'BEL':
                nomeSelecao = 'Bélgica';                
                break;
                case 'PAN':
                nomeSelecao = 'Panamá';                
                break;
                case 'TUN':
                nomeSelecao = 'Tunísia';                
                break;
                case 'ENG':
                nomeSelecao = 'Inglaterra';                
                break;
                case 'POL':
                nomeSelecao = 'Polônia';                
                break;
                case 'SEN':
                nomeSelecao = 'Senegal';                
                break;
                case 'COL':
                nomeSelecao = 'Colômbia';                
                break;
                case 'JPN':
                nomeSelecao = 'Japão';                
                break;
                default:
                nomeSelecao = 'Brasil';                                    
                    break;
            }
         
            return (
                <View style={{ justifyContent: 'center' }} >
                    <Text>{nomeSelecao}</Text>
                </View>); 
        }

        return (
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 26, marginBottom: 10, fontWeight: 'bold' }}>Pontos bônus!</Text>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>
                    O usuário deve escolher até uma hora antes do inicio da competição qual será a seleção vencedora da copa.
                    Caso acerte, o usuário terá um acrécimo de 10 pontos na pontuação final. Caso o usuário não escolha, será por padrão selecionado o Brasil.
                </Text>
                <Picker
                    selectedValue={this.props.selecao}
                    onValueChange={(itemValue, itemIndex) => {
                        this.props.setSelecaoCampea(itemValue);
                    }}
                >
                    <Picker.Item label="Brasil" value='BRA' />
                    <Picker.Item label="Arábia Saudita" value='KSA' />
                    <Picker.Item label="Egito" value='EGI' />
                    <Picker.Item label="Uruguai" value='URU' />
                    <Picker.Item label="Portugal" value='POR' />
                    <Picker.Item label="Espanha" value='ESP' />
                    <Picker.Item label="Marrocos" value='MAR' />
                    <Picker.Item label="Irã" value='IRN' />
                    <Picker.Item label="França" value='FRA' />
                    <Picker.Item label="Austrália" value='AUS' />
                    <Picker.Item label="Peru" value='PER' />
                    <Picker.Item label="Dinamarca" value='DEN' />
                    <Picker.Item label="Argentina" value='ARG' />
                    <Picker.Item label="Islândia" value='ISL' />
                    <Picker.Item label="Croácia" value='CRO' />
                    <Picker.Item label="Nigéria" value='NGA' />
                    <Picker.Item label="Suiça" value='SUI' />
                    <Picker.Item label="Costa Rica" value='CRC' />
                    <Picker.Item label="Sérvia" value='SRB' />
                    <Picker.Item label="Alemanha" value='GER' />
                    <Picker.Item label="México" value='MEX' />
                    <Picker.Item label="Suécia" value='SWE' />
                    <Picker.Item label="Coréia do Sul" value='KOR' />
                    <Picker.Item label="Bélgica" value='BEL' />
                    <Picker.Item label="Panamá" value='PAN' />
                    <Picker.Item label="Tunísia" value='TUN' />
                    <Picker.Item label="Inglaterra" value='ENG' />
                    <Picker.Item label="Polônia" value='POL' />
                    <Picker.Item label="Senegal" value='SEN' />
                    <Picker.Item label="Colômbia" value='COL' />
                    <Picker.Item label="Japão" value='JPN' />
                </Picker>
            </View>
        );
    }
}

const estado = dados => {
    const { loading, selecao } = dados.selecaoCampea;

    return { loading, selecao };
};

export default connect(estado, { selecaoCampeaFetch, setSelecaoCampea })(EscolherSelecaoCampea);

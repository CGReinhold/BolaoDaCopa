import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Picker, View } from 'react-native';
import { Spinner } from './common';
import { selecaoCampeaFetch, setSelecaoCampea } from '../actions';


class EscolherSelecaoCampea extends Component {
    state = { selecaoCampeaSelecionada: '' }

    componentWillMount() {
        this.props.selecaoCampeaFetch();

        if (this.props.selecao && this.state.selecaoCampeaSelecionada !== this.props.selecao[0].selecaoFifa) {
            this.setState({ selecaoCampeaSelecionada: this.props.selecao[0].selecaoFifa });
        }
    }

    // componentDidMount() {
    //     if (this.props.selecao && this.props.selecao[0].selecaoFifa !== '') {
    //         this.setState({ selecaoCampeaSelecionada: this.props.selecao[0].selecaoFifa });
    //     }
    // }

    render() {
        if (this.props.loading === undefined || this.props.loading) {
            return <Spinner size="large" />;
        }

        if (this.props.selecao && this.state.selecaoCampeaSelecionada !== this.props.selecao[0].selecaoFifa) {
            this.setState({ selecaoCampeaSelecionada: this.props.selecao[0].selecaoFifa });
            return <Spinner size="large" />;
        }

        if (this.props.selecao && this.state.selecaoCampeaSelecionada) {
            return (
                <View>
                    <Picker
                        selectedValue={this.state.selecaoCampeaSelecionada}
                        onValueChange={(itemValue, itemIndex) => {
                            if (this.props.selecao && this.state.selecaoCampeaSelecionada !== itemValue) {
                                this.setState({ selecaoCampeaSelecionada: itemValue });
                            }

                            const t = itemValue;
                            this.props.setSelecaoCampea(t);
                        }}
                    >
                        <Picker.Item label="Brasil" value='BRA' />
                        <Picker.Item label="Rússia" value='RUS' />
                    </Picker>
                    
                </View>
            );
        }
        
        return (
            <View>
                <Picker
                    onValueChange={(itemValue, itemIndex) => { 
                        this.props.setSelecaoCampea(itemValue);
                    }}
                >
                    <Picker.Item label="Brasil" value='BRA' />
                    <Picker.Item label="Rússia" value='RUS' />
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

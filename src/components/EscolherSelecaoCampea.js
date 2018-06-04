import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Picker, View } from 'react-native';
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

        if (this.props.selecao) {
            return (
                <View>
                    <Picker
                        selectedValue={this.props.selecao}
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

        return <Spinner size='large' />
}
}

const estado = dados => {
    const { loading, selecao } = dados.selecaoCampea;

    return { loading, selecao };
};

export default connect(estado, { selecaoCampeaFetch, setSelecaoCampea })(EscolherSelecaoCampea);

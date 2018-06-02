import React from 'react';
import { Picker, View } from 'react-native';

const EscolherSelecaoCampea = () => {
    return (
        <View>
            <Picker >
                <Picker.Item label="Brasil" value='br' />
                <Picker.Item label="Argentina" value='Aa' />
          </Picker>
        </View>
    );
};

export default EscolherSelecaoCampea;

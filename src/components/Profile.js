import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import { FormInput, Button, Spinner } from './common';
import { userFetch, userUpdate, userSave } from '../actions';

class Profile extends Component {

  componentWillMount() {
    this.props.userFetch();
  }

  onButtonPress() {
    const { displayName, telefone, pais, estado, cidade, rua, cep, uid } = this.props;
    this.props.userSave({ displayName, telefone, pais, estado, cidade, rua, cep, uid });
  }

  render() {
    if (this.props.loading) return <Spinner size="small" />;
    return (
      <ScrollView style={styles.container}>
        <FormInput 
          placeholder={'Nome'} 
          onChangeText={value => this.props.userUpdate({ prop: 'displayName', value })} 
          value={this.props.displayName} 
        />
        <FormInput 
          placeholder={'Telefone'} 
          onChangeText={value => this.props.userUpdate({ prop: 'telefone', value })} 
          value={this.props.telefone} 
        />
        <FormInput 
          placeholder={'País'} 
          onChangeText={value => this.props.userUpdate({ prop: 'pais', value })} 
          value={this.props.pais}
        />
        <FormInput 
          placeholder={'Estado'} 
          onChangeText={value => this.props.userUpdate({ prop: 'estado', value })} 
          value={this.props.estado}
        />
        <FormInput 
          placeholder={'Cidade'} 
          onChangeText={value => this.props.userUpdate({ prop: 'cidade', value })} 
          value={this.props.cidade}
        />
        <FormInput 
          placeholder={'Rua'} 
          onChangeText={value => this.props.userUpdate({ prop: 'rua', value })} 
          value={this.props.rua}
        />
        <FormInput 
          placeholder={'CEP'} 
          onChangeText={value => this.props.userUpdate({ prop: 'cep', value })} 
          value={this.props.cep}
        />
        <Button onPress={this.onButtonPress.bind(this)}>Enviar</Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

const mapStateToProps = state => {
  const { displayName, telefone, pais, estado, cidade, rua, cep, uid, loading } = state.user;
  return { displayName, telefone, pais, estado, cidade, rua, cep, uid, loading };
};

export default connect(mapStateToProps, { userFetch, userUpdate, userSave })(Profile);

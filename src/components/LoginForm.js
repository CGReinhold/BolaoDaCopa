import React, { Component } from 'react';
import { Alert, Image, Keyboard, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Spinner } from './common';
import { emailChanged, nameChanged, passwordChanged, createUser, loginUser, changeToRegister } from '../actions';
import Images from '../../images';

class LoginForm extends Component {
  onButtonPress() {
    const { email, name, password } = this.props;

    Keyboard.dismiss();
    if (!this.props.registering) this.props.loginUser({ email, password });
    else this.props.createUser({ email, name, password });
  }

  renderError() {
    if (this.props.error) Alert.alert(this.props.error);
  }

  renderButton() {
    if (this.props.loading) return <Spinner size="small" />;
    else if (this.props.registering) return <Button style={styles.button} onPress={this.onButtonPress.bind(this)}>Cadastrar</Button>;
    return <Button style={styles.button} onPress={this.onButtonPress.bind(this)}>Entrar</Button>;
  }

  renderRegister() {
    if (!this.props.registering) {
      return (
        <TouchableNativeFeedback onPress={() => this.props.changeToRegister()}>
          <Text style={styles.button}>Registrar-se</Text>
        </TouchableNativeFeedback>
      );
    }
  }

  renderScene() {
    return (
      <View style={styles.form}>
        <Image source={Images.logo} />
        {this.props.registering && 
          <Input
            icon={Images.user}
            placeholder="Nome"
            value={this.props.nome}
            onChangeText={text => this.props.nameChanged(text)}
          />
        }
        <Input
          icon={Images.mail}
          placeholder="Email"
          value={this.props.email}
          onChangeText={text => this.props.emailChanged(text)}
        />
        <Input
          icon={Images.password}
          secureTextEntry
          placeholder="Senha"
          value={this.props.password}
          onChangeText={text => this.props.passwordChanged(text)}
        />

        {this.renderError()}
        {this.renderButton()}
        {this.renderRegister()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderScene()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  form: {
    alignItems: 'center',
    height: 280,
    alignSelf: 'stretch',
    marginRight: 50,
    marginLeft: 50
  },
  button: {
    marginTop: 5,
    marginBottom: 5
  }
});

const mapStateToProps = state => {
  const { email, name, password, error, loading, registering } = state.auth;
  return { email, name, password, error, loading, registering };
};

export default connect(mapStateToProps, { emailChanged, nameChanged, passwordChanged, createUser, loginUser, changeToRegister })(LoginForm);

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Spinner } from './common';
import { usersFetch } from '../actions';


class Ranking extends Component {
  componentWillMount() {
    this.props.usersFetch();
  }

  render() {
    if (this.props.loading === undefined || this.props.loading) {
      return <Spinner size="large" />;
    }

    //TODO: exibir aqui uma ListView com os dados de this.props.users
    return (
      <View>
        <Text>teste</Text>
      </View>
    );
  }
}

const estado = dados => {
    const { loading, users } = dados.ranking;
    return { loading, users };
};

export default connect(estado, { usersFetch })(Ranking);

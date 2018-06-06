import { connect } from 'react-redux';
import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Spinner } from './common';
import { usersFetch } from '../actions';


class Ranking extends Component {
  componentWillMount() {
    this.props.usersFetch();
  }

  renderItem = ({ item }) => {
    return (
      <View style={{ margin: 5, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef' }}>
        <Text style={{ fontSize: 20, flex: 3 }}>{item.nome}</Text>
        <Text style={{ fontSize: 20, flex: 1 }}>{item.pontuacao}</Text>
        <Text style={{ fontSize: 20, flex: 1 }}>{item.pontuacaoVeia}</Text>
      </View>
    );
  }

  render() {
    if (this.props.loading === undefined || this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <View>
        <View style={{ margin: 5, flexDirection: 'row', borderBottomWidth: 4, borderBottomColor: '#cfcfcf' }}>
          <Text style={{ fontSize: 22, flex: 3, fontWeight: 'bold' }}>{'Pessoa'}</Text>
          <Text style={{ fontSize: 22, flex: 1, fontWeight: 'bold' }}>{'Pontos'}</Text>
          <Text style={{ fontSize: 22, flex: 1, fontWeight: 'bold' }}>{'PV'}</Text>
        </View>
        <FlatList
          data={this.props.users}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const estado = dados => {
    const { loading, users } = dados.ranking;
    return { loading, users };
};

export default connect(estado, { usersFetch })(Ranking);

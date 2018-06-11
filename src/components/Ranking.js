import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import { FlatList, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Spinner } from './common';
import { usersFetch } from '../actions';


class Ranking extends Component {
  componentWillMount() {
    this.props.usersFetch();
  }

  _selectedItem(user) {
    const { uid, nome } = user;
    Actions.apostas({ uid, title: nome });
  }

  renderItem = ({ item, index }) => {
    const fontWeight = item.pago ? '900' : '300';
    return (
      <TouchableWithoutFeedback onPress={() => this._selectedItem(item)}>
        <View style={{ margin: 5, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef' }}>
          <Text style={{ fontSize: 0, flex: 0 }}>{item.uid}</Text>
          <Text style={{ fontSize: 20, flex: 1, fontWeight }}>{index + 1}</Text>
          <Text style={{ fontSize: 20, flex: 5, fontWeight }}>{item.nome}</Text>
          <Text style={{ fontSize: 20, flex: 2, fontWeight }}>{item.pontuacao}</Text>
          <Text style={{ fontSize: 20, flex: 2, fontWeight }}>{item.pontuacaoVeia}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    if (this.props.loading === undefined || this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <ScrollView>
        <View style={{ margin: 5, flexDirection: 'row', borderBottomWidth: 4, borderBottomColor: '#cfcfcf' }}>
          <Text style={{ fontSize: 0, flex: 0, fontWeight: 'bold' }}>{''}</Text>
          <Text style={{ fontSize: 22, flex: 1, fontWeight: 'bold' }}>{''}</Text>
          <Text style={{ fontSize: 22, flex: 5, fontWeight: 'bold' }}>{'Pessoa'}</Text>
          <Text style={{ fontSize: 22, flex: 2, fontWeight: 'bold' }}>{'Pontos'}</Text>
          <Text style={{ fontSize: 22, flex: 2, fontWeight: 'bold' }}>{'PV'}</Text>
        </View>
        <FlatList
          data={this.props.users}
          renderItem={this.renderItem}
        />
      </ScrollView>
    );
  }
}

const estado = dados => {
    const { loading, users } = dados.ranking;
    return { loading, users };
};

export default connect(estado, { usersFetch })(Ranking);

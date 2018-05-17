import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import moment from 'moment';

class Match extends Component {
  render() {
    const { match } = this.props;

    return (
      <View style={styles.parentView}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textCenter}>{moment(new Date(match.date)).format('DD/MM/YYYY HH:mm')}</Text>
        </View>
        <View style={styles.viewStyle}>
          <Image style={styles.imageStyle} source={{ uri: match.home_team[0].flag }} />
          <Text style={styles.textStyle}>{match.home_team[0].fifaCode}</Text>
          <Text style={styles.textCenter}>{''}</Text>
          <Text style={styles.textCenter}>X</Text>
          <Text style={styles.textCenter}>{''}</Text>
          <Text style={styles.textStyle}>{match.away_team[0].fifaCode}</Text>
          <Image style={styles.imageStyle} source={{ uri: match.away_team[0].flag }} />
        </View>
      </View>
    );
  }
}

const styles = {
  parentView: {
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
    margin: 8,
    justifyContent: 'center',
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 2
  },
  textCenter: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1
  },
  imageStyle: {
    marginRight: 5,
    marginLeft: 5,
    width: 60,
    height: 50,
    flex: 3
  }
};

export default Match;

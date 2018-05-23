import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import moment from 'moment';

class Match extends Component {
  render() {
    const { match } = this.props;

    return (
      <View style={styles.parentView}>
        <View style={styles.viewStyle}>
          <Image style={styles.imageStyle} source={{ uri: match.home_team[0].flag }} />
          <Text style={styles.textStyleHome}>{match.home_team[0].fifaCode}</Text>
          <Text style={styles.resultTextCenter}>{'0'}</Text>
          <Text style={styles.textCenter}>x</Text>
          <Text style={styles.resultTextCenter}>{'0'}</Text>
          <Text style={styles.textStyleAway}>{match.away_team[0].fifaCode}</Text>
          <Image style={styles.imageStyle} source={{ uri: match.away_team[0].flag }} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textCenter}>{moment(new Date(match.date)).format('DD/MM/YYYY HH:mm')}</Text>
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
    paddingTop: 6,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 0
  },
  textStyleAway: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'right',
    paddingRight: 6
  },
  textStyleHome: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 2,
    paddingLeft: 6
  },
  resultTextCenter:
  {
    flex: 1,
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textCenter: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
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

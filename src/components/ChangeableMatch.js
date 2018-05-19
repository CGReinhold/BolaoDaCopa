import { connect } from 'react-redux';
import React from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import moment from 'moment';
import { setBet } from '../actions';

class Match extends React.PureComponent {
  state = { homeScore: null, awayScore: null }

  componentDidMount() {
    const { match, bets } = this.props;
    if (bets && bets.myBets && bets.myBets[0]) {
      const myBet = bets.myBets.filter(bet => bet.u.toString() === match.name.toString());
      if (myBet[0]) {
        if (myBet[0].homeScore) {
          this.setState({ homeScore: myBet[0].homeScore });
        }
        if (myBet[0].awayScore) {
          this.setState({ awayScore: myBet[0].awayScore });
        }
      }
    }
  }

  render() {
    const { match } = this.props;

    //TODO: Descobrir porque está lento quando vai trocar de text input selecionado
    return (
      <View style={styles.parentView}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textCenter}>{moment(new Date(match.date)).format('DD/MM/YYYY HH:mm')}</Text>
        </View>
        <View style={styles.viewStyle}>
          <Image style={styles.imageStyle} source={{ uri: match.home_team[0].flag }} />
          <Text style={styles.textStyle}>{match.home_team[0].fifaCode}</Text>
          <TextInput 
            style={styles.inputStyle} 
            onChangeText={text => { 
              
              this.setState({ homeScore: text }); 
              this.props.setBet({ match: match.name, homeScore: text, awayScore: this.state.awayScore });
            }}
            value={this.state.homeScore}
            keyboardType={'numeric'}
          />
          <Text style={styles.textCenter}>X</Text>
          <TextInput 
            style={styles.inputStyle} 
            onChangeText={text => { 
              this.setState({ awayScore: text }); 
              this.props.setBet({ match: match.name, homeScore: this.state.homeScore, awayScore: text });
            }}
            value={this.state.awayScore}
            keyboardType={'numeric'}
          />
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
  },
  inputStyle: {
    height: 50,
    flex: 2
  }
};

const mapStateToProps = state => {
  const { bets } = state;
  return { bets };
};

export default connect(mapStateToProps, { setBet })(Match);

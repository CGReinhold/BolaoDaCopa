import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import moment from 'moment';
import { setBet } from '../actions';

class Match extends Component {
  state = { homeScore: null, awayScore: null }

  componentDidMount() {
    const { match } = this.props;
    
    if (match) {
          this.setState({ homeScore: match.home_aposta });
          this.setState({ awayScore: match.away_aposta });
    }
  }
  
  render() {
    const { match } = this.props;

    //TODO: Descobrir porque está lento quando vai trocar de text input selecionado
    return (
      <View style={styles.parentView}>
        <View style={styles.viewStyle}>
          <Image style={styles.imageStyle} source={{ uri: match.home_team[0].flag }} />
          <Text style={styles.leftTitle}>{match.home_team[0].fifaCode}</Text>
          <TextInput 
            style={styles.resultTextCenter} 
            onChangeText={text => { 
              this.setState({ homeScore: text }); 
              this.props.setBet({ match: match.name, homeScore: text, awayScore: this.state.awayScore });
            }}
            value={this.state.homeScore}
            keyboardType={'numeric'}
          />
          <Text style={styles.textCenter}>X</Text>
          <TextInput 
            style={styles.resultTextCenter} 
            onChangeText={text => { 
              this.setState({ awayScore: text }); 
              this.props.setBet({ match: match.name, homeScore: this.state.homeScore, awayScore: text });
            }}
            value={this.state.awayScore}
            keyboardType={'numeric'}
          />
          <Text style={styles.rightTitle}>{match.away_team[0].fifaCode}</Text>
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
  leftTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 2,
    paddingLeft: 6
  },
  rightTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'right',
    paddingRight: 6
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
  },
  resultTextCenter:
  {
    flex: 1,
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white'    
  }
  // inputStyle: {
  //   height: 50,
  //   flex: 2
  // }
};

const mapStateToProps = state => {
  const { bets } = state;
  return { bets };
};

export default connect(mapStateToProps, { setBet })(Match);

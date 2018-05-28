import React from 'react';
import { Actions, Drawer, Router, Scene } from 'react-native-router-flux';
import MenuIcon from '../images/menu_burger.png';
import { 
  LoginForm, 
  SplashScreen, 
  DrawerContent,
  Main,
  MyBets, 
  GamesResults
} from './components';

const sceneConfig = {
  cardStyle: {
    backgroundColor: 'white'
  },
  navigationBarStyle: {
    backgroundColor: '#EFEFEF'
  }, 
  titleStyle: {
    color: 'black',
  },
  sceneStyle: {
    backgroundColor: 'white'
  },
  rightButtonTextStyle: {
    color: 'black',
  },
};

const RouterComponent = () => {
  return (
    <Router 
      tintColor='black' 
      backAndroidHandler={() => {
        if (Actions.currentScene === 'login' || Actions.currentScene === 'jogos' || Actions.currentScene === 'splash') {
          return false;
        }
        Actions.pop();
        return true;
      }}
    >
      <Scene key="root" hideNavBar>
        <Scene key="splash" {...sceneConfig} initial>
          <Scene hideNavBar key="splashScreen" component={SplashScreen} />
        </Scene>
        <Scene key="auth" {...sceneConfig}>
          <Scene hideNavBar key="login" component={LoginForm} />
        </Scene>
        <Scene key="main" {...sceneConfig}>
          <Drawer hideNavBar key="drawer" contentComponent={DrawerContent} drawerImage={MenuIcon} drawerWidth={300}>
            <Scene key="jogos" component={Main} title="Jogos" {...sceneConfig} />
          </Drawer>
          <Scene key="apostas" component={MyBets} title="Minhas apostas" {...sceneConfig} />
          <Scene key="ranking" component={GamesResults} title="Ranking" {...sceneConfig} />
          {/*<Scene key="games" component={GamesResults} title="GamesResults" {...sceneConfig} />  */}
        </Scene>
        
      </Scene>
    </Router>
  );
};

export default RouterComponent;

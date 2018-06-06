import React from 'react';
import { Actions, Drawer, Router, Scene } from 'react-native-router-flux';
import MenuIcon from '../images/menu_burger.png';
import { 
  LoginForm, 
  SplashScreen, 
  DrawerContent,  
  GamesResults,
  Apostas,
  EscolherSelecaoCampea,
  Ranking,
  Regras
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
            <Scene key="jogos" component={GamesResults} title="Jogos" {...sceneConfig} />
          </Drawer>
          <Scene key="apostas" component={Apostas} title="Minhas apostas" {...sceneConfig} />
          <Scene key="selecaoCampea" component={EscolherSelecaoCampea} title="Seleção campeã" {...sceneConfig} />
          <Scene key="ranking" component={Ranking} title="Ranking" {...sceneConfig} />
          <Scene key="regras" component={Regras} title="Regras" {...sceneConfig} />
        </Scene>
        
      </Scene>
    </Router>
  );
};

export default RouterComponent;

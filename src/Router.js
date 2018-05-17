import React from 'react';
import { Actions, Drawer, Router, Tabs, Stack, Scene } from 'react-native-router-flux';
import MenuIcon from '../images/menu_burger.png';
import { 
  LoginForm, 
  SplashScreen, 
  DrawerContent,
  Main,
  Profile,
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
        if (Actions.currentScene === 'login' || Actions.currentScene === '_listaConversas' || Actions.currentScene === 'splash') {
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
            <Scene panHandlers={null}>
              <Tabs
                hideNavBar
                key="tabbar"
                tabBarPosition="bottom"
                swipeEnabled
              >
                <Stack
                  key="tab_1"
                  title="Main"
                  tabBarLabel="Jogos"
                  initial
                >
                  <Scene 
                    key="principal"
                    component={Main} 
                    title="Jogos" 
                    {...sceneConfig}
                  />
                </Stack>

                <Stack
                  key="tab_2"
                  title="Minhas apostas"
                >
                  <Scene 
                    key="principal2"
                    component={Main} 
                    title="Minhas apostas" 
                    {...sceneConfig}
                  />
                </Stack>

                <Stack key="tab_3" title="Ranking">
                  <Scene 
                      key="principal"
                      component={Main} 
                      title="Ranking" 
                      {...sceneConfig}
                  />
                </Stack>
              </Tabs>
            </Scene>

            <Scene 
              key="principal"
              component={Main} 
              title="My Collection" 
              {...sceneConfig}
            />
          </Drawer>
          <Scene key="profile" component={Profile} title="Perfil" {...sceneConfig} />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;

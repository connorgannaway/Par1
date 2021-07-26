import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import HoleStack from './routes/HoleStack'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  'nunito-light': require('./assets/fonts/Nunito-Light.ttf'),
})


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded){
    return(
      <HoleStack />
    );
  } else {
    return(
      <AppLoading 
        startAsync={getFonts}
        onFinish={()=> setFontsLoaded(true)}
        onError={console.warn}
      />
    )
  }
}

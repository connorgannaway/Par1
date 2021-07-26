import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Hole from '../screens/Hole';
import Settings from '../screens/Settings';

const {Navigator, Screen} = createStackNavigator();

export default function HoleStack() {
    return(
        <NavigationContainer>
            <Navigator
                headerMode='float'
                initialRouteName='Settings'
                screenOptions={{
                    headerStyle:{
                        backgroundColor:'#bcbcbc'
                    },
                    headerTintColor: '#333'
                }}
            >
                <Screen name='Settings' component={Settings} />
                <Screen name='Hole 1' component={Hole} />
            </Navigator>
        </NavigationContainer>
    );
};
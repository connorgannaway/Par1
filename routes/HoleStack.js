import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Hole from '../screens/Hole';
import Settings from '../screens/Settings';

const {Navigator, Screen} = createStackNavigator();

export default function HoleStack() {
    return(
            <Navigator
                headerMode='float'
                initialRouteName='Hole 1'
                screenOptions={{
                    headerStyle:{
                        backgroundColor:'#bcbcbc'
                    },
                    headerTintColor: '#333'
                }}
            >
                
                <Screen name='Hole 1' component={Hole} />
            </Navigator>
    );
};
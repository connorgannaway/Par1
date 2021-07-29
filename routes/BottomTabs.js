import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import HoleStack from './HoleStack';
import Home from '../screens/Home';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs(){
    return(
        <Tab.Navigator
            initialRouteName='Home'
            activeColor="#41337a"
            inactiveColor='#a5cbc3'
            barStyle={{
                backgroundColor: '#42858c'
            }}
        >
            <Tab.Screen 
                name='Home' 
                component={Home} 
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name='home' color={color} size={26}/>
                    ),                    
                    
                }}
            />
            <Tab.Screen 
            name='Game' 
            component={HoleStack}
            options={{
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name='golf' color={color} size={26}/>
                ),                    
                
            }}
            />
        </Tab.Navigator>
    )
}
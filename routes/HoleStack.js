import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Hole from '../screens/Hole';
import Settings from '../screens/Settings';
import Header from '../shared/header';

const {Navigator, Screen} = createStackNavigator();

export default function HoleStack({navigation}) {
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
                
                <Screen name='Hole 1' component={Hole} initialParams={{holeNumber: 1}} options={{
                    headerTitle: () => {
                        return(
                            <Header navigation={navigation} title='Hole 1' holeNumber={1} />
                        )
                    }
                }}/>
                <Screen name='Hole 2' component={Hole} initialParams={{holeNumber: 2}} options={{
                    headerTitle: () => {
                        return(
                            <Header navigation={navigation} title='Hole 2' holeNumber={2} />
                        )
                    }
                }}/>
                <Screen name='Hole 3' component={Hole} initialParams={{holeNumber: 3}} options={{
                    headerTitle: () => {
                        return(
                            <Header navigation={navigation} title='Hole 3' holeNumber={3} />
                        )
                    }
                }}/>
                <Screen name='Hole 4' component={Hole} initialParams={{holeNumber: 4}} options={{
                    headerTitle: () => {
                        return(
                            <Header navigation={navigation} title='Hole 4' holeNumber={4} />
                        )
                    }
                }}/>
                <Screen name='Hole 5' component={Hole} initialParams={{holeNumber: 5}} />
            </Navigator>
    );
};
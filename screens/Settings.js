import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import FlatButton from '../shared/button'

export default function Settings({navigation}) {
    
    return(
        <View style={[globalStyles.container, {marginVertical:10}]}>
            <View style={{alignContent:'center', alignItems:'center'}}>
                <FlatButton text='Start Game' onPress={() => navigation.navigate('Hole 1', {holeNumber:1})} />
            </View>
        </View>
    )

}
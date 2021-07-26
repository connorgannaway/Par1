import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import {Feather} from '@expo/vector-icons'


export default function Hole({route, navigation}) {

    const holeNumber = route.params.holeNumber
    const [par, setPar] = useState(0)
    const [players, setPlayers] = useState([
        {name:'Henry', strokes:0, key:'0'},
        {name:'David', strokes:0, key:'1'},
        {name:'Jeremy', strokes:0, key:'2'},
        {name:'Sarah', strokes:0, key:'3'},
        {name:'Sarah', strokes:0, key:'4'},
        {name:'Sarah', strokes:0, key:'5'},
        {name:'Sarah', strokes:0, key:'6'},
        {name:'Sarah', strokes:0, key:'7'},
        {name:'Sarah', strokes:0, key:'8'},
        {name:'Sarah', strokes:0, key:'9'},
    ])

    const updatePar = (direction) => {
        if(direction == 'positive'){
            let value = par + 1
            setPar(value)
        } else {
            let value = par - 1
            setPar(value)
        }
    }

    const updateStrokes = (key,direction) => {
        let value = 0
        if(direction == 'positive'){
            value = players[key].strokes + 1
        } else {
            value = players[key].strokes - 1
        }
        let newPlayers = [...players]
        newPlayers[key].strokes = value
        setPlayers(newPlayers)
    }

    const getScoreStyle = (player) => {
        if(player.strokes - par <= 0){
            return {
                color: '#01AB16'
            }
        } else {
            return {
                color: '#ff0000'
            }
        }
    }
    

    return(
        <View style={[globalStyles.container, {marginVertical:10}]}>
            <View style={styles.parContainer}>
                <Text style={[globalStyles.titleText, styles.parItem]}>Par: </Text>
                <Feather name='minus-circle' size={32} style={styles.parItem} onPress={() => updatePar('negative')} />
                <Text style={styles.parItem}>{par}</Text>
                <Feather name='plus-circle' size={32} style={styles.parItem} onPress={() => updatePar('positive')} />
            </View>
            <View style={styles.playerList}>
                <FlatList 
                    data={players}
                    style={{paddingHorizontal:5}}
                    renderItem={({item}) => (
                        <Card>
                            <View style={styles.playerContainer}>
                                <Text style={getScoreStyle(item)}>{item.strokes - par}</Text>
                                <Text style={styles.playerContainerItem}>{item.name}</Text>
                                <Feather name='minus-circle' size={32} style={styles.playerContainerItem} onPress={() => updateStrokes(item.key, 'negative')} />
                                <Text style={styles.playerContainerItem}>{item.strokes}</Text>
                                <Feather name='plus-circle' size={32} style={styles.playerContainerItem} onPress={() => updateStrokes(item.key, 'positive')} />
                            </View>
                        </Card>
                    )}
                />
            </View>
        </View>
    )
};



const styles = StyleSheet.create({
    parContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,        
    },
    parItem:{
        padding:10
    },
    playerList: {
        flex: 1,
    },
    playerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        
    },
    playerContainerItem: {
        padding:10
        
    }
});
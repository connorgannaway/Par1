import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import {Feather} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Hole({navigation, route}) {

    //const [par, setPar] = useState(0)
    const [holeData, setHoleData] = useState([])
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
    const {holeNumber} =  route.params

    //data fetch: https://blog.bitsrc.io/fetching-data-in-react-using-hooks-c6fdd71cb24a
    useEffect(() => {
        fetchPlayers();
        fetchHoleData();
    }, []);

    const fetchPlayers = async () => {
        try {
            let jsonvalue = await AsyncStorage.getItem('players');
            let parsed = jsonvalue != null ? JSON.parse(jsonvalue) : null;
            setPlayers(parsed);
        } catch (e) {
            console.error(e)
        }
    };

    const fetchHoleData = async () => {
        try {
            let jsonvalue = await AsyncStorage.getItem('holes');
            let parsed = jsonvalue != null ? JSON.parse(jsonvalue) : null;
            setHoleData(parsed);
        } catch (e) {
            console.error(e)
        }
    }

    const updatePar = (direction) => {
        if(direction == 'positive'){
            let value = holeData[holeNumber-1].par + 1
            let newHoleData = [...holeData];
            newHoleData[holeNumber-1].par = value
            setHoleData(newHoleData)
        } else {
            let value = holeData[holeNumber-1].par - 1
            let newHoleData = [...holeData];
            newHoleData[holeNumber-1].par = value
            setHoleData(newHoleData)
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
                color: '#01AB16',
                marginLeft: 250,
                position: 'absolute',
                textAlign: 'center',
            }
        } else {
            return {
                color: '#ff0000',
                marginLeft: 250,
                position: 'absolute',
                textAlign: 'center',
            }
        }
    }

    const getScoreKeyword = (player) => {
        let score = player.strokes - par;
        let word = '';
        if (score == '-3'){
            word = 'Double Eagle'
        } else if (score == '-2'){
            word = 'Eagle'
        } else if (score == '-1'){
            word = 'Birdie'
        } else if (score == '0'){
            word = 'Par'
        } else if (score == '1'){
            word = 'Bogey'
        } else if (score == '2'){
            word = 'Double Bogey'
        } else if (score == '3'){
            word = 'Triple Bogey'
        } 

        return (word == '') ? '' : word;
        
    }
    

    return(
        <View style={[globalStyles.container, {marginVertical:10}]}>
            <View style={styles.parContainer}>
                <Text style={[globalStyles.titleText, styles.parItem]}>Par: </Text>
                <Text>{holeNumber}</Text>
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
                                <Text style={styles.playerContainerItem}>{item.name}</Text>
                                <Feather name='minus-circle' size={32} style={styles.playerContainerItem} onPress={() => updateStrokes(item.key, 'negative')} />
                                <Text style={styles.playerContainerItem}>{item.strokes}</Text>
                                <Feather name='plus-circle' size={32} style={styles.playerContainerItem} onPress={() => updateStrokes(item.key, 'positive')} />
                                <Text style={getScoreStyle(item)}>{getScoreKeyword(item)}</Text>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    playerContainerItem: {
        padding:10,
        
        
        
        
    }
});
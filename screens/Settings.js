import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, Alert, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import FlatButton from '../shared/buttons';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function Settings(props) {
    const [courseName, setCourseName] = useState('');
    const [players, setPlayers] = useState([{name:'', key:'0', user:true,}])

    const saveAllObjects = async (holeData) => {
        try {
            let holeJsonValue = JSON.stringify(holeData);
            let playersJsonValue = JSON.stringify(players);
            await AsyncStorage.setItem('courseName',courseName);
            await AsyncStorage.setItem('players', playersJsonValue);
            await AsyncStorage.setItem('holes', holeJsonValue);
        } catch (e) {
            console.error(e);
        }
    }

    const resetHoleData = () => {
        let holeData = [];
        for(let i = 0; i < 18; i++){
            let holeDict = {};
            holeDict['key'] = i;
            holeDict['holeNumber'] = i+1;
            holeDict['par'] =  0;
            for(let j = 0; j< players.length; j++){
                let playerName = players[j].name;
                holeDict[playerName] = 0
            }
            holeData.push(holeDict);
        }
        return holeData;
    }

    const addPlayer = () => {
        let nextKey = '0'
        if(players.length != 0){
            nextKey = (players.length).toString();
        }
        setPlayers([...players,
            {name:'', key:nextKey, user:false,}
        ]);
    }

    const removePlayer = () => {
        if(players.length > 1){
            let newPlayers = [...players];
            newPlayers.pop();
            setPlayers(newPlayers);
        } else {
            Alert.alert("Can't delete self", 'Game must have at least one player', [
                {text: 'Got It'}
            ])
        }
    }

    const updatePlayerName = (text, player) => {
        let newPlayers = [...players];
        newPlayers[player.key].name = text;
        setPlayers(newPlayers)
    }

    const checkIsUserText = (player) => {
        if(player.user == true){
            return '* This is you'
        } else {
            return ''
        }
    }

    const checkNames = () => {
        let pass = true;
        for(let i = 0; i < players.length; i++){
            if(players[i].name.length === 0){
                pass = false
            }
        }
        if(pass == false){
            Alert.alert("Name Length", "Names can't be blank", [{text: 'Got It'}])
        }
        return pass;
    }

    const clearGameAlert = () => {
        let clearGame = false;
        Alert.alert('Clear Current Game', 'Proceeding will clear the current scorecard. Go back and save the game if you wish to.',[
            {text:'Go Back'},
            {text:'Continue', onPress: startGame}
        ])
    }

    const startGameHandler = () => {
        let passNameCheck = checkNames();
        if(passNameCheck == true){
            clearGameAlert()
        } 
        
    }
    const startGame = () => {
        const holeData = resetHoleData();
        saveAllObjects(holeData);
        props.navMethod()
    }



    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[globalStyles.container, {marginVertical:10, marginTop:30, justifyContent: 'center'}]}>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text style={globalStyles.titleText}>Course Name</Text>
                    <TouchableOpacity onPress={props.closeModal} style={{marginLeft:180}}>
                        <Ionicons name='close' size={24} />
                    </TouchableOpacity>
                </View>
                <Text style={globalStyles.subHeader}>Or Select From Previous Courses... (selector not developed)</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder='Course Name'
                    onChangeText={setCourseName}
                />

                <Text style={globalStyles.titleText}>Players</Text>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                    <FlatButton text='Add Player' onPress={addPlayer} />
                    <FlatButton text='Remove Last Player' onPress={removePlayer} />
                </View>
                    <FlatList 
                        style={{flexGrow:1, paddingHorizontal:5}}
                        data={players}
                        renderItem={({item}) => (
                            <Card>
                                <Text>{checkIsUserText(item)}</Text>
                                <TextInput 
                                    style={styles.textInput}
                                    placeholder='Player Name'
                                    onChangeText={(text) => updatePlayerName(text, item)}
                                />
                                
                            </Card>
                        )}
                    />
                
                <FlatButton text='Start Game' onPress={startGameHandler} />


                
            
            </View>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    textInput: {
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    }
})
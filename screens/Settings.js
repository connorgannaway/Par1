import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import FlatButton from '../shared/buttons';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({navigation}) {
    const [courseName, setCourseName] = useState('');
    const [players, setPlayers] = useState([{name:'New Player', key:'0', user:true,}])

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
            {name:'New Player', key:nextKey, user:false,}
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
        console.log('checknames')
        let pass = true;
        for(let i = 0; i < players.length; i++){
            if(players[i].name.length === 0){
                pass = false
                console.log('iteration ')
            }
        }
        if(pass == false){
            Alert.alert("Name Length", "Names can't be blank", [{text: 'Got It'}])
        }
        return pass;
    }

    const startGameHandler = () => {
        const passNameCheck = checkNames();
        if(passNameCheck == true){
            const holeData = resetHoleData();
            saveAllObjects(holeData);
            navigation.navigate('Hole 1', {holeNumber:1});
        } 
        
    }



    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[globalStyles.container, {marginVertical:10, justifyContent: 'center'}]}>
            
                <Text style={globalStyles.titleText}>Course Name</Text>
                <Text style={globalStyles.subHeader}>Or Select From Previous Courses... (selector not developed)</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder='Course Name'
                    onChangeText={setCourseName}
                />

                <Text style={globalStyles.titleText}>Players</Text>
                
                <FlatButton text='Add Player' onPress={addPlayer} />
                <FlatButton text='Remove Last Player' onPress={removePlayer} />
                
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
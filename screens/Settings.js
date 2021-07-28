import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import FlatButton from '../shared/buttons';
import Card from '../shared/card';

export default function Settings({navigation}) {
    const [courseName, setCourseName] = useState('');
    const [players, setPlayers] = useState([{name:'New Player', key:'0', user:true,
    hole1:0,hole2:0,hole3:0,hole4:0,hole5:0,hole6:0,hole7:0,hole8:0,hole9:0,hole10:0,hole11:0,hole12:0,hole13:0,hole14:0,hole15:0,hole16:0,hole17:0,hole18:0,}
    ])

    const addPlayer = () => {
        let nextKey = '0'
        if(players.length != 0){
            nextKey = (players.length).toString();
        }
        setPlayers([...players,
            {name:'New Player', key:nextKey, user:false,
        hole1:0,hole2:0,hole3:0,hole4:0,hole5:0,hole6:0,hole7:0,hole8:0,hole9:0,hole10:0,hole11:0,hole12:0,hole13:0,hole14:0,hole15:0,hole16:0,hole17:0,hole18:0,}
        ]);
    }

    const removePlayer = () => {
        if(players.length > 1){
            let newPlayers = [...players];
            newPlayers.pop();
            setPlayers(newPlayers);
        } else {
            Alert.alert("Can't delete self", 'Game must have at least one player', [
                {text: 'Got it'}
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
                        style={{flex:1, paddingHorizontal:5}}
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
                
                <FlatButton text='Start Game' onPress={() => navigation.navigate('Hole 1', {holeNumber:1})} />


                
            
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
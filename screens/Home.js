import React, {useState} from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import FlatButton from '../shared/buttons';
import Settings from './Settings';

export default function Home(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const navigateToGame = () => {
        setModalOpen(false);
        props.navigation.navigate('Game');
    }

    return(
        <View style={globalStyles.container, {marginTop:40, marginHorizontal:10, justifyContent:'center',}}>
            <Text style={globalStyles.titleText}>Home</Text>
            <FlatButton text='New Game' onPress={() => setModalOpen(true)} />

            <Modal visible={modalOpen} animationType='slide' >
                <Settings navMethod={navigateToGame} closeModal={() => setModalOpen(false)}/>
            </Modal>


        </View>
    )
}
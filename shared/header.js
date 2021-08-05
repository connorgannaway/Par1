import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

export default function Header({navigation, title, holeNumber}) {

    const nextPage = () => {
        let nextString = 'Hole ' + (holeNumber + 1)
        console.log(nextString)
        navigation.navigate(nextString)
    }

    return (
        <View style={styles.header} >
            <View style={styles.headerTitle}>
                <Text style={styles.headerText}>{title}</Text>
                <Ionicons name='chevron-forward' style={styles.icon} size={24} onPress={nextPage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        //width: Dimensions.get('screen').width,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
        margin: 6,
    },
    icon: {
        position: 'absolute',
        left: 200,
    },
    headerTitle: {
        flexDirection: 'row',
    }
})

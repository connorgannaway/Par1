import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header(){
    return(
        <View style={styles.header}>
            <Text style={styles.title}>Par1</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 28,
        backgroundColor: 'coral'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        paddingTop: 15
    }
});
import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Card(props) {
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {width: 3, height: 5},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginBottom: 20,

    },
    cardContent: {
        marginHorizontal: 10,
        marginVertical: 20,
    }
});
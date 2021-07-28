import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
    },
    titleText:{
        fontFamily: 'nunito-bold',
        fontSize: 24,
        color:'#333'
    },
    subHeading:{
        fontFamily: 'nunito-light',
        fontSize: 16,
        color: '#333'
    },
    paragraph:{
        marginVertical:8,
        lineHeight:20,
    },
    input: {
        borderWidth:1,
        borderColor:'#ddd',
        padding:10,
        fontSize:18,
        borderRadius:6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 6,
        textAlign: "center"
    }
})

import React from "react";
import {View, StyleSheet, Text, Image} from 'react-native';

const UserTile =({item}) =>{
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: item.picture.large }} />
            <Text style={styles.title}>{item.name.title} {item.name.first} {item.name.last}</Text>
        </View>
    )
}

// styling
const styles= StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius:15,
        shadowColor:'#000',
        shadowOffset: {width:0.5, height:0.5},
        shadowOpacity:0.7,
        shadowRadius:3,
        marginBottom:15,
        paddingTop: 5,
        paddingBottom: 5
        

    },
    image:{
        height:70,
        width:70,
        borderRadius:70,
        marginLeft:20, 
        marginRight:20
    },
    title:{
        fontWeight: "bold",
        fontSize:18,
        paddingTop:20
    },
    
})

export default UserTile
ChatTextTile

import React from "react";
import { View, StyleSheet, Text, Image } from 'react-native';

const ChatTextTile = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: item.image }} />
            {/* <Text style={styles.title}>{item.name.title} {item.name.first} {item.name.last}</Text> */}

            <Text style={styles.chatText}>{item.text}</Text>
            <Text style={styles.time}>{item.time}</Text>
        </View>
    )
}

// styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        // marginBottom: 10,
        paddingTop: 5,
        paddingBottom: 5,
        width:250,
        marginTop: 10,
        // position: "absolute",
        // right:0
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 70,
        marginLeft: 5,
        marginRight: 20
    },
    chatText: {
        fontWeight: "bold",
        fontSize: 15,
        paddingTop: 7
    },
    time: {
        paddingLeft: 15,
        marginRight: 10,
        paddingTop: 27,
        position: "absolute",
        right: 5
    }

})

export default ChatTextTile
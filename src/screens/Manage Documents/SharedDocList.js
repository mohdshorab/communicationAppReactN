import React from "react";
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useState, useEffect } from "react";

export default function SharedDocList() {
    const [document, setDocument] = useState([]);

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        alert(result.uri);
        console.log(result);
        setDocument(result);
    }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.txt}>Shared Document will be Listed here</Text>
            </View>
            <View style={styles.bottom}>
                <Button
                    style={styles.btn}
                    onPress={() => pickDocument()}
                    title="Click to select Document"
                    color="#841584"
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    body: {
        height: 480,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    bottom: {
        marginTop: 20,
    },
    txt: {
        fontWeight: "bold"
    }

})
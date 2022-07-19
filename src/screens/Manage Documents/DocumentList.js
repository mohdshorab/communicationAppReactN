import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebase/firebaseConfig";
import DocListTile from "../../custom components/DocListTile";
import { FlatList } from "react-native-gesture-handler";



export default function DocumentList() {
    const [document, setDocument] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);
    const [docFromFB, setDocFromFB] = useState();

    useEffect(() => {
        console.log("reading data from realtime FB, docs")
        db.ref("Documents")
            .once("value")
            .then((item) => {
                let doc = [];
                item.forEach((childSnapshot) => {
                    doc.push(childSnapshot.val());
                });
                console.log("doc details : " + doc)
                setDocFromFB(doc);
            })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('currentUserData',
            (_err, result) => {
                console.log(result)
                let arrObj = JSON.parse(result)
                setCurrentUser(arrObj);
            })
    }, [])

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        alert(result.uri);
        console.log(result);
        setDocument(result);
    }

    useEffect(() => {
        let time = getCurrentTime();
        setTime(time);
    }, []);

    useEffect(() => {
        let date = getCurrentDate();
        setDate(date);
    }, []);

    const getCurrentTime = () => {
        let today = new Date();
        let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
        let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
        return hours + ':' + minutes + ':' + seconds;
    }
    const getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    }

    // pushing obj to firebase
    postMessage = () => {
        console.log("checking validation");
        if (!document) {
            Alert.alert("Please select the document first.")
            console.log("Please select the document first.")
        }
        else {
            console.log("pushing obj to firebase");
            const data = {
                id: Number(new Date()),
                docUri: document.uri,
                name: document.name,
                type: document.type,
                uploadedBy: currentUser.name,
                uploadedTime: time,
                uploadedDate: date
            };
            db.ref('Documents').update({ [data.id]: data }).then(() => {
                console.log("Inserted");
            }).catch((error) => {
                console.log(error);
            })
        }
        console.log("postMessage fn ends");
    }




    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <FlatList
                    data={docFromFB}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return <DocListTile item={item} />
                    }}
                />
            </View>
            <View style={styles.bottom}>
                <Button
                    style={styles.btn}
                    title='Select Document'
                    onPress={pickDocument}
                    color="#841584"
                />
                <Button
                    onPress={postMessage}
                    style={styles.btn}
                    title="Upload"
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
        // backgroundColor: "#ffff00",
        width: "100%"
    },
    bottom: {
        marginTop: 20,
    },

})
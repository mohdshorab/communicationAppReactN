import { Text, View, StyleSheet, TextInput } from 'react-native';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { db } from '../../firebase/firebaseConfig';
import ChatTextTile from '../../custom components/ChatTextTile';



// fn component for notification screen
export default function GroupChat() {
    const [chatText, changeChatText] = useState("");
    const [currentUser, setCurrentUser] = useState([]);
    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);
    const [chatFromFB, setChatFromFB] = useState();

    // reading data from realtime db (ChatText)
    useEffect(() => {
        console.log("reading data from realtime db (chatText)");
        db.ref("UserChats")
            .once("value")
            .then((item) => {
                let user = [];
                item.forEach((childSnapshot) => {
                    user.push(childSnapshot.val());
                });
                console.log("printing data " + user)
                setChatFromFB(user);
            })
    }, []); // effect will run only once


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

    useEffect(() => {
        AsyncStorage.getItem('currentUserData',
            (_err, result) => {
                console.log(result)
                let arrObj = JSON.parse(result)
                setCurrentUser(arrObj);
            })
    }, [])

    const validationAndPostToFB = () => {
        if (!chatText) {
            Alert.alert("Please write something");
            console.log("Please write something");
        } else {
            console.log("pushing obj to firebase");
            console.log(currentUser.name);
            const data = {
                id: Number(new Date()),
                name: currentUser.name,
                image: currentUser.image,
                text: chatText,
                time: time,
                date: date
            };
            db.ref('UserChats').update({ [data.id]: data }).then(() => {
                console.log("Chat is pushed to FB");
            }).catch((error) => {
                console.log(error);
            })
        }
    }




    return (
        <View style={styles.container}>
            <FlatList
            data={chatFromFB}
            renderItem={({ item }) => {
                return <ChatTextTile item={item} />
            }}
            />
            <View style={styles.bottom}>
                <TextInput style={styles.input} onChangeText={changeChatText} value={chatText} placeholder="   write your message here ... " />
                <TouchableOpacity style={styles.makeBtn} onPress={validationAndPostToFB}>
                    <Text style={styles.btn}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        // alignItems: 'center',
        position: "absolute",
        top: 0,
        width: '100%'
    },
    input: {
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        width: 250,
        height: 28
    },
    bottom: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 20,
        position: "fixed",
        marginBottom: 10,
        bottom: 0,
        alignItems: 'center',
        marginLeft:18
    },
    makeBtn: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        backgroundColor: 'yellow',
        elevation: 20
    },
    btn: {
        fontWeight: 'bold',
    },
});
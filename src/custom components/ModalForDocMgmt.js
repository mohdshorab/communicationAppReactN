import React, { useEffect, useState } from "react";
import {
    StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Alert, Button
} from 'react-native';
import { db } from "../firebase/firebaseConfig";


const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 150;

const ModalForDocMgmt = (props) => {
    const [docName, setdocName] = useState("");
    const [registeredDocData, setRegisteredDocData] = useState([]);
    const [updatedDocName, setUpdatedDocName] = useState([]);
    let selectedDocID = props.id;
    const closeModal = (bool) => {
        props.changeModalVisible(bool);
        // props.setData(data);
    }

    useEffect(() => {
        console.log("Fetching docs data")
        console.log(selectedDocID)
        db.ref("Documents")
            .once("value")
            .then((item) => {
                let user = [];
                item.forEach((childSnapshot) => {
                    user.push(childSnapshot.val());
                });
                setRegisteredDocData(user);
                console.log(registeredDocData);
            })
    }, []);

    useEffect(() => {
        for (let index = 0; index < registeredDocData.length; index++) {
            if (registeredDocData[index].id == selectedDocID) {
                console.log(registeredDocData[index].name + " - " + selectedDocID)
                setdocName(registeredDocData[index].name)
                // currentUserID = index;
            }
        }
    })

    const updateDataToFB = () => {
        if (!docName) {
            Alert.alert("Doc name can't be empty");
            alert("Doc name can't be empty");
        } else {
            console.log("updating data to firebase")
            db.ref('/Documents/' + selectedDocID)
                .update({
                    name: updatedDocName,
                })
                .then(() => console.log('Data updated.'));
        }
    }


    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        >
            <View style={styles.modal}>
                <View style={styles.textView}>
                    <Text style={[styles.text, { fontSize: 20 }]}>Edit User</Text>
                </View>
                <View style={styles.modalBody}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUpdatedDocName}
                        // value={number}
                        placeholder={docName}
                    // keyboardType="numeric"
                    />
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity onPress={() => closeModal(false, 'Cancel')} style={styles.touchableOpacity} >
                        <Text style={[styles.text, { color: "blue" }]} >Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { updateDataToFB(); closeModal(false, 'Ok'); }} style={styles.touchableOpacity} >
                        <Text style={[styles.text, { color: "blue" }]} >OK</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </TouchableOpacity>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        height: HEIGHT_MODAL,
        width: WIDTH - 80,
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 10
    },
    textView: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        margin: 5,
        fontSize: 16,
        fontWeight: "bold"
    },
    btnView: {
        width: '100%',
        flexDirection: 'row'
    },
    touchableOpacity: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center"
    },
    modalBody: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5
    },
    btn: {
        borderRadius: 10
    }
})

export { ModalForDocMgmt }
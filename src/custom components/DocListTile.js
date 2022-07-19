import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Share, Modal } from 'react-native';
import { db } from "../firebase/firebaseConfig";
import { ModalForDocMgmt } from "./ModalForDocMgmt";
import { useState, useEffect } from "react";


const DocListTile = ({ item }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const changeModalVisible = (bool) => {
        setIsModalVisible(bool);
    }

    const onDelete = async (id) => {
        alert("Deleting Item")
        console.log("Deleting : " + id);
        await db.ref('/Documents/' + id).remove();
    }


    const onShare = async () => {
        console.log("Sharing function is running")
        try {
            const result = await Share.share({
                message:
                    'Share the document',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    };




    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: "https://st2.depositphotos.com/4191945/7819/v/950/depositphotos_78192134-stock-illustration-vector-document-file-logo.jpg" }} />
            <Text style={styles.title}>{item.name}</Text>
            {/* <Text style={styles.time}>{item.uploadedTime}</Text> */}
            <View style={styles.rightFunctionBtn}>
                <TouchableOpacity onPress={()=>changeModalVisible(true)} >
                    <Image style={styles.icon} source={{ uri: "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/write-circle-blue-512.png" }} />
                </TouchableOpacity>
                <Text style={{ marginTop: 20, marginLeft: 5, fontWeight: "900", fontSize: 20, color: "orange" }}> | </Text>
                <TouchableOpacity onPress={() => onDelete(item.id)} >
                    <Image style={styles.icon} source={{ uri: "https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/38-512.png" }} />
                </TouchableOpacity>
                <Text style={{ marginTop: 20, marginLeft: 5, fontWeight: "900", fontSize: 20, color: "orange" }}> | </Text>
                <TouchableOpacity onPress={() => onShare()} >
                    <Image style={styles.icon} source={{ uri: "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/share-android-circle-blue-512.png" }} />
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={isModalVisible}
                    onRequestClose={() => changeModalVisible(false)}
                >
                    <ModalForDocMgmt
                    changeModalVisible={changeModalVisible}
                    id={item.id}
                    />
                </Modal>

            </View>
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
        marginBottom: 15,
        paddingTop: 5,
        paddingBottom: 5


    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 70,
        marginLeft: 5,
        marginRight: 5
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: 15
    },
    time: {
        paddingLeft: 15,
        marginRight: 10,
        paddingTop: 27,
        position: "absolute",
        right: 5
    },
    icon: {
        height: 30,
        width: 30,
        marginTop: 20,
        marginLeft: 5
    },
    rightFunctionBtn: {
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        right: 10,
        paddingBottom: 10
    }

})

export default DocListTile
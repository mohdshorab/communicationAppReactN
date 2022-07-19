import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomModal } from "./CustomModal";

// import { round } from "react-native-reanimated";

const RegisteredUserListTile = ({ item }) => {
    const [currentUser, setCurrentUser] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const changeModalVisible = (bool) => {
        setIsModalVisible(bool);
    }

    useEffect(() => {
        AsyncStorage.getItem('currentUserData',
            (_err, result) => {
                console.log(result)
                let arrObj = JSON.parse(result)
                setCurrentUser(arrObj);
            })
    }, [])

    const onDelete = async (id) => {
        if (id == currentUser.id) {
            console.log("Can't delete current user");
            alert("Can't delete current user");
        } else {
            alert("Deleting Item")
            console.log("Deleting : " + id);
            await db.ref('/RegisteredUsers/' + id).remove();
        }
    }


    return (
        <View style={styles.container}>
            {item.image ?
                <Image style={styles.image} source={{ uri: item.image }} /> :
                <Image style={styles.image} source={{ uri: "https://i.pinimg.com/originals/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.png" }} />
            }
            <Text style={styles.title}>{item.name}</Text>

            <TouchableOpacity onPress={() => changeModalVisible()}  >
                <Image style={styles.icon} source={{ uri: "https://freeiconshop.com/wp-content/uploads/edd/edit-flat.png" }} />
            </TouchableOpacity>
            <Text style={{ marginTop: 20, marginLeft: 20, fontWeight: "900", fontSize: 20, color: "orange" }}> | </Text>
            <TouchableOpacity onPress={() => onDelete(item.id)} >
                <Image style={styles.icon} source={{ uri: "https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/38-512.png" }} />
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                onRequestClose={() => changeModalVisible(false)}
            >
                <CustomModal
                    changeModalVisible={changeModalVisible}
                    // setData={setData}
                    id={item.id}
                />

            </Modal>
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
        marginTop: 15,
        // marginBottom: 15,
        paddingTop: 5,
        paddingBottom: 5


    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 70,
        marginLeft: 10,
        marginRight: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: 20,
        width: 150

    },
    icon: {
        height: 30,
        width: 30,
        marginTop: 20,
        marginLeft: 20
    },

})

export default RegisteredUserListTile
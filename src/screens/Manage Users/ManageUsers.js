import react from "react";
import { View, FlatList, StyleSheet, Modal } from 'react-native';
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import RegisteredUserListTile from "../../custom components/RegisteredUserComp";
// import { CustomModal } from "../../custom components/CustomModal";

// fn component for notification screen
export default function ManageUsers() {
    const [registeredUserData, setRegisteredUserData] = useState([]);


    // reading data from realtime db (registered users)
    useEffect(() => {
        console.log("reading data from realtime db (registered users)");
        db.ref("RegisteredUsers")
            .once("value")
            .then((item) => {
                let user = [];
                item.forEach((childSnapshot) => {
                    user.push(childSnapshot.val());
                });
                console.log("printing data " + user)
                setRegisteredUserData(user);
            })
    }, []); // effect will run only once


    return (
        <View style={styles.container}>
            <FlatList
                data={registeredUserData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <RegisteredUserListTile item={item} />
                }}
            />
        </View>
    );
}
// [0].name
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
    
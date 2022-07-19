import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from "react";
// async storage 
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserTile from "../../custom components/UserTile";
import userApi from "../../apis/Userlist";

const Dashboard = () => {

    const [user, setUser] = useState([])// initial value will be an empty array 
    const [page, setPage] = useState(1)//initial value is 1, and whatever we fetch in scrolling it wil add up
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('currentUserData',
            (_err, result) => {
                console.log(result)
                let arrObj =JSON.parse(result)
                setCurrentUser(arrObj);
            })
    }, [])

    // without using async and await
    function getUsersFromApi() {
        setIsLoading(true);
        console.log("running getUsersFromApi fn")
        userApi.get(`?page=${page}&results=10`)
            .then((response) => {
                // setUser(response.data)
                setUser([...user, ...response.data.results]);
                // console.log(user);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const renderLoader = () => {
        console.log("renderLoader running")
        return (
            isLoading ?
                <View style={styles.loader} >
                    <ActivityIndicator size={"Large"} color="#aaa" />
                </View>
                : <Text>Error</Text>
        )
    }

    const loadMoreItem = () => {
        console.log("loading more item");
        setPage(page + 1);
    }


    // whenever we update the state, it will update the response
    // so we have to call it in a hook so it will be called only once
    useEffect(() => {
        getUsersFromApi();
    }, [page]);//So, every time page changes use effect must run 


    // more pages are not loading
    return (
        <View>
            <Text style={styles.currentUser}>Hey {currentUser.name} ,{'\n'}Welcome to the ChatApp</Text>
            <FlatList
                data={user}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => {
                    return <UserTile item={item} />
                }}
                ListFooterComponent={()=>renderLoader}
                onEndReached={()=>loadMoreItem()}
                onEndReachedThreshold={0.5}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    currentUser: {
        backgroundColor: "white",
        fontWeight: "bold",
        fontSize: 18,
        paddingLeft: 20,
        paddingBottom: 5,
        marginBottom: 16,
        borderBottomWidth: 1
    },
    loader: {
        marginVertical: 16,
        alignItems: "center"
    }
})

export default Dashboard

// email

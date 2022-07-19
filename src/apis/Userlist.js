import axios from 'axios';

export default axios.create({
    baseURL: 'https://randomuser.me/api/'
})

// https://randomuser.me/api/?page=3&results=10
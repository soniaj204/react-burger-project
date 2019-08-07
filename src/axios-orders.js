import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-project-sonia.firebaseio.com/'
});

export default instance;
import axios from 'axios';

const api = axios.create({
    baseUrl : 'http://localhost:8080',
});

api.interceptors.request.use(

    (config) => {
    
        
    }


)
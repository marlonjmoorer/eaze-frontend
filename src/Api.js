import axios from 'axios'
import {store}from './store'


const Api= axios.create({
   baseURL:"http://localhost:8000",
   headers:{
       "Authorization":store.state.token?`Token ${store.state.token}`:"",
       //'Access-Control-Allow-Origin': '*',
       'Content-Type': 'application/json',
    },  
})
Api.interceptors.response.use(null, function(err) {
	if(err.response.status === 401) {
		localStorage.removeItem('token');
		store.commit("LOGOUT")
    }
    console.warn('Error status', err.response.status);
    console.warn('Error status', err.response);
    return Promise.reject(err)
});

export {Api}

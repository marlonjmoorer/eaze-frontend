import axios from 'axios'
import {store}from './store'


export const Api= axios.create({
   baseURL:"https://eaze-app-api.herokuapp.com",
   headers:{
       "Authorization":store.state.token?`Token ${store.state.token}`:"",
       //'Access-Control-Allow-Origin': '*',
       'Content-Type': 'application/json',
    },
   // mode: 'no-cors',
    //withCredentials: true,
    //credentials: 'same-origin',
   
})
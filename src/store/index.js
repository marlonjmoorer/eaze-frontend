import Vuex from 'vuex'
import Vue from "vue"
import { Api } from '../Api';

Vue.use(Vuex)
export const store= new Vuex.Store({
    state:{
        token:localStorage.getItem("token")
    },
    getters:{
        loggedIn:state=> state.token!=null
    },
    mutations:{
        SET_TOKEN(state,token){
            console.log(token)
            localStorage.setItem("token",token)
            state.token=token
        },
        LOGOUT(state){
            state.token=null
        }
    },actions:{
        login({commit}){
            Api.post("/token/",{username:"nolram17",password:"zero1318"}).then(res=>{
                console.log(res.data)
                commit("SET_TOKEN",res.data.token)
            }).catch(err=>{
                console.log(err.response)
            })
        }
    }
})


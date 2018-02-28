import Vuex from 'vuex'
import Vue from "vue"
import { Api } from '../Api';

Vue.use(Vuex)
export const store= new Vuex.Store({
    state:{
        token:localStorage.getItem("token"),
        posts:[]
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
            localStorage.removeItem("token")
        },
        SET_POSTS(state,posts){
            state.posts=posts
        }, 
        
    },actions:{
        login({commit},form){
            return Api.post("/token/",form).then(res=>{
                console.log(res.data)
                return commit("SET_TOKEN",res.data.token)
            })
        },
        loadPostList({commit}){
            Api.get("/post").then(res=>{
                commit("SET_POSTS",res.data)
            })
        },
        getPost({commit},id){
            console.log(id)
            return Api.get(`/post/${id}`).then(res=>{
                return res.data
            })
        },
        publishPost({commit},post){
            return Api.post("/post/",post).then(res=>res.status)
        },
        signup(context,data){
            return Api.post("/users/",data)
        }

    }
})


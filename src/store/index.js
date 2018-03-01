import Vuex from 'vuex'
import Vue from "vue"
import { Api } from '../Api';

Vue.use(Vuex)
export const store= new Vuex.Store({
    state:{
        token:localStorage.getItem("token"),
        posts:[],
        user:localStorage.getItem("user")
    },
    getters:{
        loggedIn:state=> state.token!=null
    },
    mutations:{
        LOGIN_SUCESS(state,{token,user}){
            console.log(token)
            localStorage.setItem("token",token)
            localStorage.setItem("user",user)
            state.token=token
            state.user=user
        },
        LOGOUT(state){
            state.token=state.user=null
            localStorage.removeItem("token")
        },
        SET_POSTS(state,posts){
            state.posts=posts
        }, 
        
    },actions:{
        login({commit},form){
            return Api.post("/login/",form).then(res=>{
                console.log(res.data)
                return commit("LOGIN_SUCESS",res.data)
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


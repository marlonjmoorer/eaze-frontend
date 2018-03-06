import Vuex from 'vuex'
import Vue from "vue"
import { Api } from '../Api';

Vue.use(Vuex)
export const store= new Vuex.Store({
    state:{
        token:localStorage.getItem("token"),
        posts:[],
     
        currentPost:{}
    },
    getters:{
        user:()=>JSON.parse(localStorage.getItem("user")),
        loggedIn:state=> state.token!=null
    },
    mutations:{
        LOGIN_SUCESS(state,{token,user}){
            console.log(token)
            localStorage.setItem("token",token)
            localStorage.setItem("user",JSON.stringify(user))
            state.token=token
          //  state.user=user
        },
        LOGOUT(state){
            state.token=state.user=null
            localStorage.removeItem("token")
        },
        SET_POSTS(state,posts){
            state.posts=posts
        },
        POST_FETCHED(state,post){
            state.currentPost=post
        } 
        
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
        getPost({commit},slug){
            return Api.get(`/post/${slug}`).then(res=>{
                commit("POST_FETCHED",res.data)
            })
        },
        publishPost({commit},form){
            if(form.has("slug")){
                return Api.put(`/post/${form.get("slug")}/`,form).then(res=>res.status)
            }
            return Api.post("/post/",form).then(res=>res.status)
        },
        signup(context,data){
            return Api.post("/users/",data)
        },
        addComment({dispatch},comment){
            return Api.post(`/comments/`,comment).then(res=>{
                console.log(res.data)
                dispatch("getPost",comment.slug)
            })
        }

    }
})


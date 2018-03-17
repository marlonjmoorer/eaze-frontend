import Vuex from 'vuex'
import Vue from "vue"
import { Api } from '../Api';

Vue.use(Vuex)
export const store= new Vuex.Store({
    state:{
        token:localStorage.getItem("token"),
        posts:[],
        currentPost:{},
        profile:{},
        user:JSON.parse(localStorage.getItem("user"))
    },
    getters:{
        //user:()=>JSON.parse(localStorage.getItem("user")),
        loggedIn:state=> state.token!=null,
        authorsFollowing:state=>state.user?state.user.profile.following:[]
    },
    mutations:{
        LOGIN_SUCESS(state,token){
            console.log(token)
            localStorage.setItem("token",token)
            state.token=token
        },
        LOGOUT(state){
            state.token=state.user=null
            localStorage.removeItem("token"),
            localStorage.removeItem("user")
        },
        SET_POSTS(state,posts){
            state.posts=posts
        },
        POST_FETCHED(state,post){
            state.currentPost=post
        }, 
        PROFILE_FETCHED(state,profile){
            state.profile=profile
        },
        USER_FETCHED(state,user){
            state.user=user
            localStorage.setItem("user",JSON.stringify(user))
        }
        
    },actions:{
        login({commit},form){
            return Api.post("/login/",form).then(res=>{
                console.log(res.data)
                const {token , user}= res.data
                commit("LOGIN_SUCESS",token)
                commit("USER_FETCHED",user)
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
        },
        loadProfile({commit},handle){
            return Api.get(handle?`/profile/${handle}`:"/profile").then(res=>{
                commit("PROFILE_FETCHED",res.data)
            })
        },
        updateProfile({commit},profile){
            return Api.patch(`/profile/`,profile).then(res=>{
                commit("PROFILE_FETCHED",res.data)
            })
        },
        loadPostForAuthor({commit},handle){
            return Api.get(`/author/${handle}/posts`).then(res=>{
                commit("SET_POSTS",res.data)
            })
        },
        followAuthor({commit,state},data){
            Api.patch(`/author/${data.handle}/follow`,data).then(res=>{
              //  commit("PROFILE_FETCHED",res.data)
            }).then(()=>{
                return Api.get(`/users/${state.user.id}`).then(res=>{
                    commit("USER_FETCHED",res.data)
                })
            })
        }

    }
})


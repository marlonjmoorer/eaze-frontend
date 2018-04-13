import Vuex from 'vuex'
import Vue from "vue"
import jwtDecode from 'jwt-decode';
import VuexPersist from 'vuex-persist'
import axios from 'axios'
Vue.use(Vuex)
const createStore = () => {

    const Api = axios.create({
      baseURL: "http://localhost:8000",
    })
    
    Api.interceptors.request.use(req => {
        console.log('Fetching')
        return req
    })
    Api.interceptors.response.use(null, function (err) {
        const {response}= err
        if (response&&response.status === 401) {
           store.commit("LOGOUT")
        }
        console.warn('Error status', err.response.status);
        console.warn('Error status', err.response);
        return Promise.reject(err)
      
    });

    const store=new Vuex.Store({
        state: {
            token: '',
            posts: [],
            tags: [],
            currentPost: {},
            profile: {},
            user: ''
        },
        getters: {
            loggedIn: state => !!state.token,
            authorsFollowing: state => state.user
                ? state.user.profile.following
                : []
        },
        mutations: {
            LOGIN_SUCESS(state, token) {
                console.log(token)
                state.token = token
            },
            LOGOUT(state) {
                state.token = state.user = null
            },
            SET_POSTS(state, posts) {
                state.posts = posts
            },
            POST_FETCHED(state, post) {
                state.currentPost = post
            },
            PROFILE_FETCHED(state, profile) {
                state.profile = profile
            },
            USER_FETCHED(state, user) {
                state.user = user
            },
            SET_TAGS(state, tags) {
                state.tags = tags
            }

        },
        actions: {
            nuxtServerInit({commit,dispatch,state}, {req}) {
                // dispatch("loadPostList")
              //  console.log(localStorage)
              
            },

            checkToken({state}) {
                if (state.token) {
                    let jwt = jwtDecode(state.token)
                    console.log(jwt)
                    var current_time = Date.now() / 1000;
                    if (jwt.exp < current_time) {
                        Api
                            .post("/refresh/", {token: state.token})
                            .then(res => {
                                commit("LOGIN_SUCESS", res.data.token)
                            })
                    }
                }
            },
            login({ commit }, form) {
                return Api
                    .post("/login/", form)
                    .then(res => {
                        const {token, user} = res.data
                        commit("LOGIN_SUCESS", token)
                        commit("USER_FETCHED", user)
                    })
            },
            loadPostList({commit, state}) {
                return Api
                    .get("/post")
                    .then(res => {
                        commit("SET_POSTS", res.data)
                    })
            },
            loadTagList({commit}, query) {
                return Api
                    .get("/tags", {
                    params: {
                        q: query
                    }
                })
                    .then(res => {
                        commit("SET_TAGS", res.data)
                    })
            },
            getPost({commit}, slug) {
                return Api
                    .get(`/post/${slug}`)
                    .then(res => {
                        commit("POST_FETCHED", res.data)
                    })
            },
            publishPost({commit}, form) {
                if (form.has("slug")) {
                    return Api.put(`/post/${form.get("slug")}/`, form).then(res => res.status)
                }
                return Api.post("/post/", form)
                    .then(res => res.status)
            },

            signup(context, data) {
                return Api.post("/users/", data)
            },
            addComment({dispatch}, comment) {
                return Api.post(`/comments/`, comment)
                    .then(res => {
                        dispatch("getPost", comment.slug)
                    })
            },
            loadProfile({commit}, handle) {
                return Api.get(handle
                    ? `/profile/${handle}`
                    : "/profile")
                    .then(res => {
                        commit("PROFILE_FETCHED", res.data)
                    })
            },
            updateProfile({commit}, profile) {
                return Api.patch(`/profile/`, profile)
                    .then(res => {
                        commit("PROFILE_FETCHED", res.data)
                    })
            },
            loadPostForAuthor({commit}, handle) {
                return Api.get(`/profile/${handle}/posts`)
                    .then(res => {
                        commit("SET_POSTS", res.data)
                    })
            },
            followAuthor({commit,state}, data) {
                Api.patch(`/profile/${data.handle}/follow`, data)
                    .then(() => {
                        return Api
                            .get(`/users/${state.user.id}`)
                            .then(res => {
                                commit("USER_FETCHED", res.data)
                            })
                    })
            },
            deletePost({state, dispatch}, id) {
                Api.delete(`/post/${id}`)
                    .then((res) => {
                        if (res.status == 204) {
                            dispatch("loadProfile", state.profile.handle)
                        } else {
                            throw new Error("Opps")
                        }
                    })
            }

        }
        
    })
    store.watch(state=>state.token, token=> {
        if (token){
            Api.defaults.headers={
                "Authorization":`JWT ${token}`,
               // 'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }
    })
    return store
}
export default createStore

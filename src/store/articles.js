export const state =()=>({
    postList: [],
    tags: [],
    currentPost: {},
    previewPost:{
        title:"Title",
        body:"testing",
        posted:new Date(),
        image:"",
        author:{"user":"me"},
        tags:[]
    },
    searchResults:{
        people:[],
        posts:[],
        tags:[]
    },
})
export const mutations={
   
    SET_POSTS(state, postList) {
        state.postList = postList
    },
    POST_FETCHED(state, post) {
        state.currentPost = post
    },
    SET_TAGS(state, tags) {
        state.tags = tags
    },
    UPDATE_PREVEIW(state, post){
        state.previewPost=post
    },
    SET_SEARCH_RESULTS(state,{posts,tags}){
        state.searchResults=posts
        state.tagSearchResults=tags
    }
}

export const actions={
    loadPostList({commit, state}) {
        return this.$http
            .get("/posts",{params:{
                draft:false
            }})
            .then(res => {
                commit("SET_POSTS", res.data.results)
            })
    },
    loadTagList({commit}, query) {
        return this.$http.get("/tags", {
            params: {
                search: query
            }
        }).then(res => {
                commit("SET_TAGS", res.data.results)
        })
    },
    getPost({commit}, slug) {
        return this.$http
            .get(`/posts/${slug}`)
            .then(res => {
                commit("POST_FETCHED", res.data)
            })
    },
    loadPostForAuthor({commit}, handle) {
        return this.$http.get(`/profiles/${handle}/posts`)
            .then(res => {
                commit("SET_POSTS", res.data)
            })
    },  
       
}

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
        return this.$server
            .get("/post")
            .then(res => {
                commit("SET_POSTS", res.data.results)
            })
    },
    loadTagList({commit}, query) {
        return this.$server
            .get("/tags", {
            params: {
                q: query
            }
        })
            .then(res => {
                commit("SET_TAGS", res.data.results)
            })
    },
    getPost({commit}, slug) {
        return this.$server
            .get(`/post/${slug}`)
            .then(res => {
                commit("POST_FETCHED", res.data)
            })
    },
    publishPost({commit}, form) {
        if (form.has("slug")) {
            return this.$server.put(`/post/${form.get("slug")}/`, form).then(res => res.status)
        }
        return this.$server.post("/post/", form).then(res => res.status)
    },
    loadPostForAuthor({commit}, handle) {
        return this.$server.get(`/profile/${handle}/posts`)
            .then(res => {
                
                commit("SET_POSTS", res.data)
            })
    }, 
    addComment({dispatch}, comment) {
        return this.$server.post(`/comments/`, comment)
            .then(res => {
                return res.data
            }).catch(console.log)
    },
    loadReplies({commit},commentId){
        return this.$server.get(`/comments/${commentId}/replies`).then(res=>res.data)
            .catch(console.log)
    },
    
}

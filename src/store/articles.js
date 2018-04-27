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
    }
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
    }
}

export const actions={
    loadPostList({commit, state}) {
        return this.$api
            .get("/post")
            .then(res => {
                commit("SET_POSTS", res.data)
            })
    },
    loadTagList({commit}, query) {
        return this.$api
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
        return this.$api
            .get(`/post/${slug}`)
            .then(res => {
                commit("POST_FETCHED", res.data)
            })
    },
    publishPost({commit}, form) {
        if (form.has("slug")) {
            return this.$api.put(`/post/${form.get("slug")}/`, form).then(res => res.status)
        }
        return this.$api.post("/post/", form).then(res => res.status)
    },
    loadPostForAuthor({commit}, handle) {
        return this.$api.get(`/profile/${handle}/posts`)
            .then(res => {
                commit("SET_POSTS", res.data)
            })
    }, 
    addComment({dispatch}, comment) {
        return this.$api.post(`/comments/`, comment)
            .then(res => {
                return res.data
            }).catch(console.log)
    },
    loadReplies({commit},commentId){
        return this.$api.get(`/comments/${commentId}/replies`)
            .catch(console.log)
    }
}

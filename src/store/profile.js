export const state=()=>({
    details: {},
})
export const getters={
    authorsFollowing: state => state.user
        ? state.user.profile.following
        : [],
    handle:state=>state.details? state.details.handle:'',
}
export const mutations={ 
    PROFILE_FETCHED(state, details) {
            state.details = details
    },
}
export const actions={

    loadProfile({commit,dispatch}, handle) {
        return this.$http.get(`/profiles/${handle}`)
            .then(({data}) => {
                commit("PROFILE_FETCHED",data)
            })
    },
    updateProfile({commit}, profile) {
        return this.$http.patch(`/profiles/`, profile)
            .then(res => {
                commit("PROFILE_FETCHED", res.data)
            })
    },
    followAuthor({commit,dispatch}, handle) {
        this.$http.post(`/profiles/${handle}/follow/`)
            .then(() => {
                dispatch("user/tokenLogin",null,{root:true})
            })
    },
    deletePost({state, dispatch}, id) {
        this.$http.delete(`/posts/${id}`)
            .then((res) => {
                if (res.status == 204) {
                    dispatch("loadProfile", state.profile.details.handle)
                } else {
                    throw new Error("Opps")
                }
            })
    }

}



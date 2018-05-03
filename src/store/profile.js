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

    loadProfile({commit}, handle) {
        console.log("fetching profile")
        return this.$server.get(`/profile/${handle}`)
            .then(res => {
                commit("PROFILE_FETCHED", res.data)
            })
    },
    updateProfile({commit}, profile) {
        return this.$server.patch(`/profile/`, profile)
            .then(res => {
                commit("PROFILE_FETCHED", res.data)
            })
    },
    followAuthor({commit,dispatch}, data) {
        this.$server.patch(`/profile/${data.handle}/follow`, data)
            .then(() => {
                dispatch("user/tokenLogin",null,{root:true})
            })
    },
    deletePost({state, dispatch}, id) {
        this.$server.delete(`/post/${id}`)
            .then((res) => {
                if (res.status == 204) {
                    dispatch("loadProfile", state.profile.details.handle)
                } else {
                    throw new Error("Opps")
                }
            })
    }

}



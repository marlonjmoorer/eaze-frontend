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
        return this.$api.get(handle
            ? `/profile/${handle}`
            : "/profile")
            .then(res => {
                commit("PROFILE_FETCHED", res.data)
            })
    },
    updateProfile({commit}, profile) {
        return this.$api.patch(`/profile/`, profile)
            .then(res => {
                commit("PROFILE_FETCHED", res.data)
            })
    },
    followAuthor({commit,state}, data) {
        this.$api.patch(`/profile/${data.handle}/follow`, data)
            .then(() => {
                return this.$api
                    .get(`/users/${state.user.id}`)
                    .then(res => {
                        commit("USER_FETCHED", res.data)
                    })
            })
    },
    deletePost({state, dispatch}, id) {
        this.$api.delete(`/post/${id}`)
            .then((res) => {
                if (res.status == 204) {
                    dispatch("loadProfile", state.profile.details.handle)
                } else {
                    throw new Error("Opps")
                }
            })
    }

}



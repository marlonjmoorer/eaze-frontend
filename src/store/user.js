export const state =()=>({
    token: '',
    userInfo: ''
})
export const  getters={
        loggedIn: state => !!state.token,
        userProfile:state=>state.userInfo?state.userInfo.profile:""
}
export const mutations={
        LOGIN_SUCESS(state, token) {
            console.log(token)
            state.token = token
        },
        LOGOUT(state) {
            state.token = state.user = null
        },
        USER_FETCHED(state, userInfo) {
            state.userInfo = userInfo
        },
}
export const actions={
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
        return this.$api
            .post("/login/", form)
            .then(res => {
                const {token, user} = res.data
                commit("LOGIN_SUCESS", token)
                commit("USER_FETCHED", user)
            })
    },
    signup(context, data) {
        return this.$api.post("/users/", data)
    },
}

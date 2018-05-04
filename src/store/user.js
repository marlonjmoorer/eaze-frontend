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

    tokenLogin({state,commit}){
        console.log("tokenLogin")
        if(state.token){
            this.$server.post("/exchange/",{token: state.token})
            .then(res=>{
                commit("USER_FETCHED", res.data.user)
            }).catch(err=>{
                commit('LOGOUT')
            })
        }
        
    },
   
    login({ commit }, form) {
        return this.$server
            .post("/login/", form)
            .then(res => {
                const {token, user} = res.data
                commit("LOGIN_SUCESS", token)
                commit("USER_FETCHED", user)
            })
    },
    signup(context, data) {
        return this.$server.post("/users/", data)
    },
}

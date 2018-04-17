import Vuex from 'vuex'
import cookie from 'cookie';
import Cookies from 'js-cookie'

export const strict = false
export const actions={
    async nuxtServerInit(store,{req}) {
         try {
             if(req){
                let {eaze} = cookie.parse(req.headers.cookie)
                let state =JSON.parse(eaze)
                console.log(state)
                if(state.user){
                    const {token}=state.user
                    store.commit("user/LOGIN_SUCESS", token)
                   this.$api.defaults.headers={
                       "Authorization":`JWT ${token}`,
                       'Content-Type': 'application/json'
                   }
                } 
             }
         } catch (e) {
            console.log(e)
         }
    },
}
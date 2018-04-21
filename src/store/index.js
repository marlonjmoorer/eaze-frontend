import Vuex from 'vuex'
import cookie from 'cookie';
import Cookies from 'js-cookie'

export const strict = false
export const actions={
    async nuxtServerInit(store,{req}) {
         try {
             if(req &&req.headers.cookie){
                let {eaze} = cookie.parse(req.headers.cookie)
                let state =JSON.parse(eaze)
              
                if(state.user){
                    const {token}=state.user
                  
                    this.$api.defaults.headers={
                        "Authorization":token?`JWT ${token}`:'',
                        'Content-Type': 'application/json'
                    }
                    await store.commit("user/LOGIN_SUCESS", token)
                } 
             }
         } catch (e) {
            console.log(e)
         }
    },
}
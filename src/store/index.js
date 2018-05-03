import Vuex from 'vuex'
import cookie from 'cookie';
import Cookies from 'js-cookie'
import {isTokenExpired} from '../utils';

export const strict = false
export const getters={
    canEditPost:({articles:{currentPost},user:{userInfo}})=>{
        return!!(currentPost&&userInfo)&&currentPost.author&&currentPost.author.handle==userInfo.profile.handle
    }
}
export const actions={
    async nuxtServerInit(store,{req}) {
         try {
             if(req &&req.headers.cookie){
                let {eaze} = cookie.parse(req.headers.cookie)
                let state =JSON.parse(eaze)
                
                if(state.user){
                    const {token}=state.user
                  
                    this.$server.defaults.headers={
                        "Authorization":token?`JWT ${token}`:'',
                        'Content-Type': 'application/json'
                    }
                    await store.commit("user/LOGIN_SUCESS", token)
                    store.dispatch("user/tokenLogin")
                
                } 
             }
         } catch (e) {
            console.log(e)
         }
    },
}
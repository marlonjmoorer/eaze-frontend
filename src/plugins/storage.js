import VuexPersist from 'vuex-persist'
import Cookies from 'js-cookie'
import createMutationsSharer from 'vuex-shared-mutations'
import {isTokenExpired} from '../utils'

export default ({store}) => {
    const {token}=store.state.user
                  
    if(token&&isTokenExpired(token))
    {
        console.log('Remove cookie',process.env.key)
        Cookies.remove(process.env.key)
    }
    new VuexPersist({
        key:process.env.key,
        storage:{
            getItem: (key) => Cookies.getJSON(key),
            setItem: (key, state) => {
                Cookies.set(key,state)
            }
        },
        reducer: state => ({user:{token: state.user.token}}),
    }).plugin(store)
  
    createMutationsSharer({ predicate: ['articles/UPDATE_PREVEIW'] })(store)

}
  
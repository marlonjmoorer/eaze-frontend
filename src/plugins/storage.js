import VuexPersist from 'vuex-persist'
import Cookies from 'js-cookie'
import createMutationsSharer from 'vuex-shared-mutations'
export default ({store,app},inject) => {
    new VuexPersist({
        key:"eaze",
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
  
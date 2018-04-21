
import {checkAuth}from '../utils';


export default ({route, store, error,redirect })=> {
    if(checkAuth(store.getters["user/loggedIn"],route.path)){
        redirect("/")
    }
}
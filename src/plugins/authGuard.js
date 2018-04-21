import {checkAuth} from '../utils';
export default ({route, store, error,redirect })=> {
    store.watch(()=>store.getters["user/loggedIn"],loggedIn=>{
        console.log("status",loggedIn)
        if(checkAuth(loggedIn,route.path)){redirect("/")}
    })
}
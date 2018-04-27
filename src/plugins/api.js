import axios from 'axios'
export default ({store},inject)=>{
    const api = axios.create({
        baseURL: process.env.baseUrl
    })
      
    api.interceptors.request.use(req => {
        console.log('Fetching: ',req.url)
        
        if(!req.headers.Authorization&& store.state.user.token){
            console.log("Adding token")
            let {token}= store.state.user
            req.headers.Authorization=`JWT ${token}`,
            api.defaults.headers={
                "Authorization":`JWT ${token}`,
                'Content-Type': 'application/json'
            }
        }
        return req
    })
    api.interceptors.response.use(null, function (err) {
        const {response}= err
        if (response&&response.status === 401) {
         store.commit("LOGOUT")
        }
        // console.warn('Error status', err.response.status);
        console.warn('Error', err.response);
        return  Promise.reject(err)
    });
    store.watch(state=>state.user.token, token=> {
        if (token){
             api.defaults.headers={
                 "Authorization":`JWT ${token}`,
                 'Content-Type': 'application/json'
             }
        }
    })
    inject("api",api)
}
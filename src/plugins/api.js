import axios from 'axios'


export default ({store,redirect},inject)=>{
    const api = axios.create({
        baseURL: process.env.baseUrl
    })
      
    api.interceptors.request.use(req => {
        console.log('Fetching: ',req.method,req.url)
        
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
        const {response,config}= err
        if (response&&response.status === 401) {
            store.commit("user/LOGOUT")
            if(api.defaults.headers.Authorization){
                config.headers.Authorization=null
                
                console.log("retrying")
                return api.request(config);
            }
        }
        // console.warn('Error status', err.response.status);
        const {status, statusText,headers,data }=response

        console.log('Url',config.url)
        console.warn('Error',statusText);
        console.log('Status :',status)
        console.log('Headers :',headers)
        console.log('Data :', data)
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
    inject("server",api)
}
// import Vuex from 'vuex'
// import Vue from "vue"
// import jwtDecode from 'jwt-decode';
// import axios from 'axios'
// import cookie from 'cookie';
// import userModule from './userModule';
// import profileModule from './profileModule';
// import postModule from './postModule';
// import Cookies from 'js-cookie'

// Vue.use(Vuex)
// const createStore = (context) => {
//     console.log("creating")
    
//     const Api = axios.create({
//       baseURL: "http://localhost:8000",
//     })
    
//     Api.interceptors.request.use(req => {
//         console.log('Fetching: ',req.url)
//         console.log(req.headers)
//        // req.headers.authorization=token
//         return req
//     })
//     Api.interceptors.response.use(null, function (err) {
//         const {response}= err
//         if (response&&response.status === 401) {
//           // store.commit("LOGOUT")
//         }
//        // console.warn('Error status', err.response.status);
//        // console.warn('Error status', err.response);
//         return  Promise.resolve('')
//     });

//     const store=new Vuex.Store({
//         modules:{
//             user:userModule(Api),
//             profile:profileModule(Api),
//             articles:postModule(Api)
//         },
//         actions:{
//             async nuxtServerInit(store,{req}) {
//                  let {eaze} = cookie.parse(req.headers.cookie)
//                  try {
//                     let {user:{token}} =JSON.parse(eaze)
//                     console.log('tk',token)
//                     if(token){
//                        Api.defaults.headers={
//                            "Authorization":`JWT ${token}`,
//                            'Content-Type': 'application/json'
//                        }
//                     } 
//                  } catch (e) {
//                     console.log(e)
//                  }
                
//             },
//         }
//     })
//     store.watch(state=>state.user.token, token=> {
//         console.log("watch",token)
//         if (token){
//              Api.defaults.headers={
//                  "Authorization":`JWT ${token}`,
//                  'Content-Type': 'application/json'
//              }
//         }
//     })
//     return store
// }

// const extractToken=(req=null)=>{
// //   let state=null
// //   if(req){
// //     let {eaze} = cookie.parse(req.headers.cookie)
// //     state=JSON.parse(eaze)
// //     return token
// //   }else{
// //     state=Cookies.getJSON("eaze")
// //     return
// //   }
// //   try{
// //     let {user:{token}}=state
// //     return token
// //   }catch{
// //     return null
// //   }
// }
// export default createStore

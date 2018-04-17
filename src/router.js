// import VueRouter from 'vue-router'
// import Vue from 'vue'
// import Home from './components/Home.vue';
// import SignIn from './components/SignIn.vue';
// import { store } from './store';
// import EditPost from './components/EditPost.vue';
// import ViewPost from './components/ViewPost.vue';
// import Signup from './components/Signup.vue';
// import Profile from './components/Profile.vue';

// Vue.use(VueRouter)
// const NoAuth= (to, from, next)=> {
//     if (store.getters.loggedIn) {
//       next("/")
//     } else {
//       next()
//     }
// }
// const LoginRequired=(to, from, next)=>{
//     if (store.getters.loggedIn) {
//         next()
//     } else {
//         next("/signin")
//     }
// }
  
// export const router = new VueRouter({
//     routes:[
//         {path:"/",component:Home},
//         {
//             path:"/signin",
//             component:SignIn,
//             beforeEnter:NoAuth
//         },
//         {
//             path:"/signup",
//             component:Signup,
//             beforeEnter:NoAuth
//         },
//         {   
//             path:"/new-post",
//             component:EditPost,
//             beforeEnter:LoginRequired
//         },
//         {   
//             path:"/edit-post/:slug",
//             component:EditPost,
//             props:true,
//             beforeEnter:LoginRequired
//         },
//         {   
//             path:"/post/:slug",
//             component:ViewPost,
//             props: true
//         },{
//             path:"/profile",
//             component:Profile,
//             beforeEnter:LoginRequired

//         },
//         {
//             path:"/profile/:handle",
//             component:Profile,
//             props:true

//         }
//     ]
// })
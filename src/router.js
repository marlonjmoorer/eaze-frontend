import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from './components/Home.vue';
import SignIn from './components/SignIn.vue';
import { store } from './store';
import NewPost from './components/NewPost.vue';
import Post from './components/Post.vue';

Vue.use(VueRouter)
const NoAuth= (to, from, next)=> {
    if (store.getters.loggedIn) {
      next("/")
    } else {
      next()
    }
}
  
export const router = new VueRouter({
    routes:[
        {path:"/",component:Home},
        {
            path:"/signin",
            component:SignIn,
            beforeEnter:NoAuth
        },
        {   
            path:"/new-post",
            component:NewPost
        },
        {   
            path:"/post/:postId",
            component:Post,
            props: true
        }
    ]
})
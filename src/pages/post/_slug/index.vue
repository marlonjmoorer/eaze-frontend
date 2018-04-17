<template>
 <b-container>
     <b-row>
         <b-col md="8" sm="12">
            <post-content v-if="post" :post="post"/>
            <comment-form  v-if="post" :post="post"/>
         </b-col>
         <b-col md="4" sm="12">
            
         </b-col>
     </b-row>
 </b-container>
  
</template>

<script>
import {mapActions,mapState} from 'vuex'
import PostContent from '@/components/PostContent.vue';
import CommentForm from '../../../components/CommentForm.vue';


export default {
    props:["slug"],
    components:{
        CommentForm,
        PostContent
    },
    async asyncData ({ params,store }) {
       if(params.slug){
            await  store.dispatch("articles/getPost",params.slug)
            const {currentPost}= store.state.articles
            return{post:currentPost}
       }  
       return{}
    },
    data:()=>({
        commentBody:""
    }),
    computed:{
        posted_date:function(){
            var options = {  
                weekday: "long", year: "numeric", month: "short",  
                day: "numeric", hour: "2-digit", minute: "2-digit"  
            };  
           return new Date(this.post.posted).toLocaleDateString("en-US",options)
        }
    }
    
}
</script>

<style scoped>
.banner{
   /*  max-width: 500px; */
    max-height: 300px;
}
img{
    width: 100%;
     height: 200px !important;
   
}
body{
    background: white
}
</style>

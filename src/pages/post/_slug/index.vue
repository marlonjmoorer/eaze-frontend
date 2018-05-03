<template>
 <b-container class="page">
     <b-row>
         <b-col md="8" sm="12">
            <post-content v-if="post" :post="post"/>
            <comment-form  v-if="post&&loggedIn" :slug="post.slug" @reply="onReply"/>
            <comment-list :comments="post_comments" :slug="post.slug" class="mt-2"/>
         </b-col>
         <b-col md="4" sm="12">
            
         </b-col>
     </b-row>
 </b-container>
  
</template>

<script>
import {mapActions,mapState,mapGetters} from 'vuex'
import PostContent from '@/components/PostContent.vue';
import CommentForm from '@/components/CommentForm.vue';
import CommentList from '@/components/CommentList.vue';

export default {
    components:{
        CommentForm,
        PostContent,
        CommentList
    },
   
    async fetch ({ params,store }) {
       if(params.slug){
            await  store.dispatch("articles/getPost",params.slug)
       }  
    },
    data:()=>({
        commentBody:""
    }),
    computed:{
        ...mapState("articles",{
            post:'currentPost'
        }),
        ...mapGetters("user",["loggedIn"]),
        post_comments(){
                return this.post.comments.filter(c=>!(c.parent))
        },
        posted_date:function(){
            var options = {  
                weekday: "long", year: "numeric", month: "short",  
                day: "numeric", hour: "2-digit", minute: "2-digit"  
            };  
           return new Date(this.post.posted).toLocaleDateString("en-US",options)
        },
    },methods:{
        ...mapActions("articles",['getPost']),
        onReply(){
            this.getPost(this.post.slug)
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
.container{
      background: white 
}
</style>

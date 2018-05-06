<template>
 <b-container class="page">
     <b-row>
         <b-col >
            <post-content v-if="post" :post="post"/>
            <template v-if="!post.draft">
                <h4 class="mt-3" >Comments:</h4>
                <comment-form  v-if="post&&loggedIn" :postId="post.id" @reply="onReply"/>
                <comment-list  :comments="post_comments" :slug="post.slug" class="mt-2"/>
            </template>
            
         </b-col>
         <b-col sm="2">
            <b-row class="mt-5">
                <b-col>
                    <b-btn :to="`/post/${post.slug}/edit`" >Edit</b-btn>
                </b-col>
            </b-row>
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
   
    async fetch ({ params,store,redirect }) {
       if(params.slug){
            await  store.dispatch("articles/getPost",params.slug)
       }
       console.log(store)
       const {canEditPost} =store.getters
       const {currentPost}=store.state.articles
       if(currentPost.draft&&!canEditPost){
           redirect('/404')
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

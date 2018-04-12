<template>
 <b-container>
     <b-row>
         <b-col md="8" sm="12">
            <post-content :post="post||{}"/>
             <b-form @submit.prevent="postComment" >
                <b-form-group 
                        label="Comment">
                    <b-form-textarea 
                        v-model="commentBody"
                        :rows="3"
                        :max-rows="100">
                    </b-form-textarea>
                </b-form-group>
                <b-button type="submit" variant="info">Submit</b-button>
            </b-form>
             <b-form-group >
            <comment-list :comments="post.comments" class="mt-2">

            </comment-list>
             </b-form-group>

         </b-col>
         <b-col md="4" sm="12">
            
         </b-col>
     </b-row>
 </b-container>
  
</template>

<script>
import {mapActions,mapState} from 'vuex'
import CommentList from './CommentList.vue';
import PostContent from './PostContent.vue';

export default {
    props:["slug"],
    components:{
        CommentList,
        PostContent
    },
    data:()=>({
        commentBody:""
    }),
    created(){
        this.getPost(this.slug)
    },methods:{
        ...mapActions(['getPost',"addComment"]),
        postComment(){
            if(this.commentBody){
                let data={
                    slug:this.slug,
                    body:this.commentBody
                }
                console.log(data)
                this.addComment(data)
                this.commentBody=""
            }
        }
    },
    computed:{
        ...mapState({post:"currentPost"}),
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

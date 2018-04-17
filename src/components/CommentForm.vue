<template>
   <div>
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
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import CommentList from '@/components/CommentList.vue';
export default {
    components:{CommentList},
    props:["post"],
    data:()=>({
        commentBody:""
    }),
    computed:{
        ...mapActions("articles",['getPost',"addComment"]),
    },
    postComment(){
            if(this.commentBody){
                let data={
                    slug:this.post.slug,
                    body:this.commentBody
                }
                console.log(data)
                this.addComment(data)
                this.commentBody=""
            }
    }

};
</script>

<style>

</style>

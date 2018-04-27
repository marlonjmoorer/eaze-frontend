<template>
    <b-form @submit.prevent="postComment" >
                <b-form-group>
                    <b-form-textarea 
                        v-model="commentBody"
                        :max-rows="100">
                    </b-form-textarea>
                </b-form-group>
                <b-button class="right" size="sm" type="submit" variant="info">Send</b-button>
    </b-form>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    props:["slug","commentId"],
     name:'comment-form',
    data:()=>({
        commentBody:""
    }),
    methods:{
        ...mapActions("articles",['getPost',"addComment"]),
        postComment(){
                if(this.commentBody){
                    let data={
                        slug:this.slug,
                        body:this.commentBody,
                        parent:this.commentId
                    }
                    console.log(data)
                    this.addComment(data).then(comment=>{
                         this.$emit('reply',comment);
                    })
                    this.commentBody=""
                }
        }
    }

};
</script>

<style>

</style>

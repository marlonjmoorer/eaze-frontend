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
        ...mapActions("articles",['getPost']),
        postComment(){
            if(this.commentBody){
                let data={
                    slug:this.slug,
                    body:this.commentBody,
                    parent:this.commentId
                }
                console.log(data)
                this.$http.post(`/comments/`,data).then(res=>{
                    this.$emit('reply',res.data);
                })
                this.commentBody=""
            }
        }
    }

};
</script>

<style>

</style>

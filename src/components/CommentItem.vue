<template>
  <div>
        <div class="d-flex w-100 justify-content-between">
            <b-link :to="`/profile/${comment.profile.handle}`"><h5 class="mb-1">{{comment.profile.handle}}</h5></b-link>
            <small class="text-muted">{{comment.created}}</small>
        </div>
        <p class="mb-1">
        {{comment.body}}
        </p>
        <b-btn class="mb-2" size="sm" variant="primary" @click="openComment=!openComment" pill>Reply </b-btn>
        <b-btn class="mb-2 ml-1" size="sm" v-if="comment.hasReplies||replies.length>0"  v-b-toggle="`reply-${comment.id}`" >
             View Replies  
        </b-btn>
        
        <comment-form v-show="openComment" :slug="slug" :commentId="comment.id" @reply="onReply" ></comment-form>
       
         <b-collapse @shown="getReplies(comment.id)" @hidden="openReplies=false" :visible="openReplies"  :id="`reply-${comment.id}`">
            <hr/>
            <comment-list :comments="replies" :slug="slug"></comment-list>
        </b-collapse>
</div>

</template>

<script>
import CommentForm from './CommentForm.vue';
import CommentList from './CommentList.vue';

import {mapActions,mapState} from 'vuex'
export default {
    props:['comment','slug'],
    components:{CommentForm,CommentList},
    data:()=>({
        replies:[],
        openComment:false,
        openReplies:false
    }),
    name:'comment-item',
    methods:{
        ...mapActions("articles",["loadReplies"]),
        getReplies(id){
            if(this.replies.length<1){
                this.loadReplies(id).then(res=>{
                    this.replies=res.data
                })
            }
            
        },
        onReply(comment){
            console.log('replied')
            this.open=false
            this.replies.push(comment)
            this.openReplies=true  
            this.openComment=false         
           // this.$root.$emit("bv::toggle::collapse",`reply-${this.comment.id}`)
            // this.loadReplies(id).then(res=>{
            //     //this.$root.$emit("bv::toggle::collapse",`reply-${id}`)
            //     console.log(res)
            //     this.replies=res.data
            // })
        }
    }

}
</script>

<style>

</style>

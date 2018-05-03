<template>
  <b-list-group>
    <b-list-group-item :key="comment.id" v-for="(comment) in comments" class="flex-column align-items-start">
        <comment-item :slug="slug" :comment="comment" ></comment-item>
   </b-list-group-item>   
  
</b-list-group>

</template>

<script>
import CommentForm from './CommentForm.vue';
import {mapActions,mapState} from 'vuex'
export default {
    props:['comments','slug'],
    components:{
        CommentForm,
        CommentItem:() => import('./CommentItem.vue')
    },
    name:'comment-list',

}
</script>

<style>

</style>

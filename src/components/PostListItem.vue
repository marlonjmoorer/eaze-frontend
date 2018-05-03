<template>
  <b-card   
        bg-variant=""
        tag="article"
        footer-bg-variant="info"
        class="mb-2">
          <b-row>
            <b-col>
              <b-media right-align  vertical-align="center">
              <b-img slot="aside" width="100" height="100"  :src="post.image||'http://via.placeholder.com/350x150'" />
              <h2 class="align-middle"  >
                  <nuxt-link :to="`/post/${post.slug}`">{{post.title}}</nuxt-link>
              </h2> 
              <p class="body"  v-html="post.body"></p>
            </b-media>
            </b-col>
          </b-row>
          <b-row align-h="end" v-if="canEdit">
            <b-col sm="2">
                <b-dropdown id="ddown1" variant="light"  right text="" >
                  <b-dropdown-item :to="`/post/${post.slug}/edit`">Edit Post</b-dropdown-item>
                  <b-dropdown-item @click="onDelete">Delete Post</b-dropdown-item>
                  <b-dropdown-item>Third Action</b-dropdown-item>
                </b-dropdown>
            </b-col>
          </b-row>    
          
                
        <div slot="footer" v-if="!canEdit" >
          <b-popover 
                ref="pop" 
                :target="`${post.id}`"
                placement="top"
                 > 
                  <b-media 
                    @mouseover="show=true"
                    @mouseout="show=false"
                    @mouseleave="close" slot="title" right-align  vertical-align="center">
                    <h5>{{post.author.user}}</h5>
                    <b-img slot="aside" width="55" height="55"  :src="post.author.photo||'http://via.placeholder.com/350x150'" />
                    <follow-button :profile="post.author"/>
                  </b-media>
                  <p 
                    @mouseover="show=true"
                    @mouseout="show=false"
                    @mouseleave="close" 
                    :to="`/post/${post.slug}`" >
                        {{post.author.about}}
                  </p> 
                   
                 
          </b-popover> 
          <b-button 
          :to="`/profile/${post.author.handle}`"
           class="ml-2 text-white"
          variant="link"
          :id="`${post.id}`"  
           @mouseleave.native="close"  
           @mouseover.native="open" >
             {{post.author.user}}
          </b-button>
        </div>
  </b-card>
</template>

<script>
import FollowButton from './FollowButton.vue';
import {mapActions}from "vuex"
export default {
    props:['post','canEdit'],
    components:{FollowButton},
    data:()=>({
      show: false
    }),
    methods:{
        ...mapActions('articles',['deletePost']),
        open(){
          this.$refs.pop.$emit('open')
        },
        close(){
          setTimeout(()=>{
           if(!this.show){
              this.$refs.pop.$emit('close')
           }
          },400) 
        },
        onDelete(){
          if(confirm(`Are you sure you want to delete ${this.post.slug}? `))
          {
            this.deletePost(this.post.id)
          }
        }
    },created(){
     
     
    }
}
</script>

<style>

.frame{
     height: 150px !important;
}
.frame img{
  width: 100%;
  height: 100%;
}
.card-footer img{
    width: 33px;
    height: 33px;
}
.body{
    overflow:hidden;
    text-overflow:ellipsis;
    width:100%;
    height: 50px;
    display:block;
}
</style>

<template>
  <div>
    <b-card 
          :img-src="post.imageUrl"
          img-alt="Card Image"
          bg-variant="dark"
          text-variant="white">
            <h3 slot="header"
                class="mb-0">{{post.title}}</h3>
    <p class="card-text">
      {{post.body}}
    </p>
  </b-card>
  
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    props:["postId"],
    data:()=>({post:{}}),
    created(){
        console.log(this.postId)
        this.getPost(this.postId).then(post=>this.post=post)
    },methods:{
        ...mapActions(['getPost'])
    }
    
}
</script>

<style>
.card >img{
    height: 200px;
}
</style>

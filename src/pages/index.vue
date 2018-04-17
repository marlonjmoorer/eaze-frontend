<template>
  <div>
    <div class="banner" >
        <div class="banner-logo">
          <h1 class="logo text-white" >EAZE</h1>
        </div>
    </div>
    <b-container>
      <b-row >
        <b-col sm="8">
          <b-row>
            <b-col :key="post.id" v-for="post in posts"  sm="12" md="12"  >
                <post-list-item :post="post" />
             </b-col>   
          </b-row>
        </b-col>
        <b-col sm="4">
             <b-card border-variant="info"
                  header="Categories"
                  header-bg-variant="info"
                  header-text-variant="white"
                  align="center">
               <b-badge href="#" :key="i" class="mr-1" v-for="(tag,i) in tags" >
                {{tag.name}}
              </b-badge>
            </b-card>

        </b-col>
                   
      </b-row>
      
    </b-container>
    
  </div>

</template>

<script>
import { mapActions, mapState } from "vuex";
import PostListItem from '@/components/PostListItem.vue';

export default {
  components:{PostListItem},
  async asyncData ({ store }) {
    await Promise.all([store.dispatch("articles/loadPostList"),store.dispatch("articles/loadTagList")])
  
    const {tags,postList}= store.state.articles
    console.log(postList)
    return{tags,posts:postList}
  },
  methods: {
    //...mapActions(["loadPostList","loadTagList"])
  },
  created(){

  }
};
</script>

<style scoped>
.banner{
  height: 35vh;
  width: 100%;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;               
  background:linear-gradient(
      #17a2b852, 
      #17a2b852
    ),
     url('https://upload.wikimedia.org/wikipedia/commons/0/02/Moscow-City_%2836211143494%29.jpg')
    no-repeat center;
  background-size:cover;  
}
.banner .banner-logo{
  background-color: #dc3545;
  padding:10px 80px;
}
.banner-logo h1{
font-size: 3.4em
}
img{
  height: 35vh;
  width: 100%;
}
.main-container{
  background-color: white;
  height: 100vh;
  padding: 30px
}
.card-img{
  height: 200px;
}
</style>

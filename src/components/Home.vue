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
      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </b-card>
        </b-col>
                   
      </b-row>
      
    </b-container>
    
  </div>

  


</template>

<script>
import { mapActions, mapState } from "vuex";
import PostListItem from './PostListItem.vue';

export default {
  data: () => ({}),
  components:{PostListItem},
  computed: {
    ...mapState(["posts"])
  },
  methods: {
    ...mapActions(["loadPostList"])
  },
  created() {
    this.loadPostList();
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
  background-size:     cover;                 
  background-repeat:   no-repeat;
  background-position: center center;   
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgqG5nHhkyV-q-MR9BSPZ2Aj-VWvAyM3Akt1E-oE55fx0ah9fpHQ')
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

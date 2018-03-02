<template>
  <div>
     <b-card overlay
          img-src="https://lorempixel.com/900/250/sports/6/"
          img-alt="Card Image"
          text-variant="white"
          title="Image Overlay"
          sub-title="Subtitle">
    <p class="card-text">
      Some quick example text to build on the card and make
      up the bulk of the card's content.
    </p>
  </b-card>
    <b-container>
      <b-row>
        <b-col :key="post.id" v-for="post in posts"  sm="6" md="4"  >
             <post-list-item :post="post" />
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

<style>
#banner{
  height: 35vh;
  width: 100%;
}
</style>

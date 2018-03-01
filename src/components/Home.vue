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
        <b-col :key="p.id" v-for="p in posts"  sm="6">
              <b-card   bg-variant="dark"
                    :img-src="p.image||'http://via.placeholder.com/350x150'"
                    img-alt="Image"
                    img-top
                    tag="article"
                    text-variant="white"
                    class="mb-2">
                <p class="card-text">
                  {{p.title}}
                </p>                
              <b-button href="#" :to="`/post/${p.id}`" variant="primary">Go somewhere</b-button>
            </b-card>
        </b-col>              
      </b-row>   
    </b-container>
    
  </div>

  


</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({}),
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

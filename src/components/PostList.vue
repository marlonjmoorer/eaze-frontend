<template>
   <b-row>
        <b-col :key="post.id" v-for="post in posts"  sm="12" md="12"  >
            <post-list-item :post="post" />
        </b-col>   
    </b-row>
</template>
<script>
import PostListItem from './PostListItem.vue';
import { mapActions, mapState } from "vuex";
export default {
  components:{PostListItem},
  computed: {
    ...mapState(["posts"])
  },
  methods: {
    ...mapActions(["loadPostList"])
  },
  created

}
</script>

<style>

</style>

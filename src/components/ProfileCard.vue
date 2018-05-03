<template>
  <b-card 
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <b-img width="80" height="80" :src="profile.photo||'http://via.placeholder.com/350x150'"/>
    <h4 class="my-2"><b-link :to="`/profile/${profile.handle}`" >{{profile.handle}}</b-link> </h4>
    <p class="card-text">
      {{profile.about}}
    </p>
    <follow-button class="card-link" :profile="profile"/>
  </b-card>
</template>

<script>
import FollowButton from '../components/FollowButton.vue';
export default {
    props:['profile'],
    components:{FollowButton}

}
</script>

<style>

</style>

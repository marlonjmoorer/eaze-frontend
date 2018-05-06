<template>
   <b-media 
        right-align  
        vertical-align="center">
            <h5>{{author.handle}}</h5>
    <b-img slot="aside" width="55" height="55"  :src="author.photo||'http://via.placeholder.com/350x150'" />
    <follow-button  :profile="author"/>
    </b-media>
</template>

<script>
import FollowButton from './FollowButton.vue';

export default {
    props:["author"],
    components:{FollowButton}

}
</script>

<style>

</style>

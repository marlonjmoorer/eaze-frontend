<template>
<div>
    <nav-bar/>
    <nuxt/>
</div>
  
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    components:{NavBar},
}

</script>

<style>
html,body{
  width: 100vw;

}
body{
      height: 100%;
  /* background:#e0e0db */
  background-image:  url('~/assets/city.jpg') ;
   background-repeat: no-repeat;
  background-size:cover;  
 
}

</style>

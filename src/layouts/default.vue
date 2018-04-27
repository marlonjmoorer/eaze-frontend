<template>
<div>
    <nav-bar/>
    <nuxt/>
    <div class="footer">

    </div>
</div>
  
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    components:{NavBar},
    head:{
        script: [
        //    { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }, 
        //    { src: 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.8.0/js/froala_editor.pkgd.min.js' },
        //    { src: 'https://use.fontawesome.com/releases/v5.0.6/js/all.js' }
        ],
     
    }
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
.footer{
    height: 200px;
}

</style>

<template>
<div>
    <no-ssr>
        <!-- <vuenut :store="$store.state"/> -->
    </no-ssr>
    <nav-bar/>
    <nuxt/>
    <div class="footer">
    </div>
</div>
  
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
export default {
    components:{NavBar},
    head:{
        script: [
        //    { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }, 
        //    { src: 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.8.0/js/froala_editor.pkgd.min.js' },
        //    { src: 'https://use.fontawesome.com/releases/v5.0.6/js/all.js' }
        ],
     
    },
    methods:{
        ...mapActions("user",["tokenLogin"])
    },
    computed:{
        ...mapGetters("user",["loggedIn","userInfo"])
    },
    created(){
        if(this.loggedIn&&!this.userInfo){
            this.tokenLogin()
        }        
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
    /* height: 200px; */
}

</style>

<template>
  <div id="app">
      <nav-bar/>
      <router-view></router-view>
  </div>
</template>

<script>
import {mapActions,mapMutations,mapGetters} from "vuex"
import {Api} from "./Api"
import NavBar from './components/NavBar.vue';
export default {
  name: 'app',
  components:{NavBar},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  watch:{
    loggedIn(val,oldVal){
      if(oldVal&&!val){
        this.$router.push("/")
      }
    }
  },
  computed:{
    ...mapGetters(["loggedIn"])
  },
  methods:{
    ...mapActions(["checkToken"])
  },
  created(){
     this.checkToken()
  }
 
}
</script>


<style>
html,body{
  width: 100vw;
  height: 100%;
}
body{
  /* background:#e0e0db */
}

</style>

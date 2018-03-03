<template>
  <div id="app">
      <nav-bar/>
      <router-view></router-view>
  </div>
</template>

<script>
import {mapActions,mapMutations} from "vuex"
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

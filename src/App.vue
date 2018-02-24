<template>
  <div id="app">
     <b-alert show>Default Alert</b-alert>
     <button @click="login">Login</button>
      <button @click="LOGOUT">Login</button>
  </div>
</template>

<script>
import {mapActions,mapMutations} from "vuex"
import {Api} from "./Api"
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
      ...mapActions(["login"]),
      ...mapMutations(["LOGOUT"])
  },
  created(){
   
  }
}
</script>

<style>


</style>

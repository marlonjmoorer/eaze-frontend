<template>
  <b-navbar toggleable="md" type="dark" variant="dark">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#" to="/" >NavBar</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    
    <b-nav-form class="ml-5" >
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" variant="outline-info" type="submit">Search</b-button>
    </b-nav-form>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown v-if="loggedIn" right >
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#" @click="LOGOUT" >Signout</b-dropdown-item>
        <b-dropdown-item href="#" to="/new-post" >Create Post</b-dropdown-item>
      </b-nav-item-dropdown>
      <template v-else>
         
         <b-button to="/signin" size="sm" class="text-info" variant="link" >
                Signin
                 <i class="fas fa-sign-in-alt"></i>
         </b-button> 
         <b-button  to="/signup" size="sm" variant="outline-info" >
                Signup
                <i class="fas fa-user-plus"></i>
         </b-button>
      </template>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

</template>

<script>

import {mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    data:()=>({
        
    }),
    computed:{
        ...mapGetters(["loggedIn"])
    },methods:{
        ...mapMutations(['LOGOUT']),
        ...mapActions(['login'])
    }
}
</script>

<style>

</style>

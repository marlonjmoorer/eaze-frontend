<template>
  <b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#" to="/" >
    <img height="30" width="30" src="data:image/jpeg;base64,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" class="d-inline-block align-top" alt="BV">
      aze
  </b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    
    <b-nav-form class="ml-5" >
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" variant="" type="submit">Search</b-button>
    </b-nav-form>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown v-if="loggedIn" right  >
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em class="text-white">{{user.full_name}}</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#" @click="LOGOUT" >Signout</b-dropdown-item>
        <b-dropdown-item href="#" to="/new-post" >Create Post</b-dropdown-item>
      </b-nav-item-dropdown>
      <template v-else>
         
         <b-button to="/signin" size="sm" class="mr-1"  >
                Signin
                 <i class="fas fa-sign-in-alt"></i>
         </b-button> 
         <b-button  to="/signup" size="sm"  >
                Signup
                <i class="fas fa-user-plus"></i>
         </b-button>
      </template>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

</template>

<script>

import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
export default {
    data:()=>({
        
    }),
    computed:{
        //...mapState(["user"]),
        ...mapGetters(["loggedIn","user"])
    },methods:{
        ...mapMutations(['LOGOUT']),
        ...mapActions(['login'])
    }
}
</script>

<style>

</style>

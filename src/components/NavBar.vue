<template>

  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#" to="/" >
      <img height="30" width="30" :src="require('../assets/icon.png')" class="d-inline-block align-top" alt="BV">
        aze
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      
      <b-nav-form class="ml-5" >
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" variant="" type="submit">Search</b-button>
      </b-nav-form>
      
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown v-if="loggedIn" right  >
          <template slot="button-content">
            <em class="text-white">{{userInfo.full_name}}</em>
          </template>
          <b-dropdown-item href="#" to="/profile" >Profile</b-dropdown-item>
          <b-dropdown-item href="#" @click="LOGOUT" >Signout</b-dropdown-item>
          <b-dropdown-item href="#" to="/post/new/edit" >Create Post</b-dropdown-item>
        </b-nav-item-dropdown>
        <template v-else>
          
            <b-popover target="signin"
                      placement="bottomleft"
                      triggers="click">
                        <template slot="title">
                        <b-btn  class="close" aria-label="Close">
                          <span class="d-inline-block" aria-hidden="true">&times;</span>
                        </b-btn>
                       Sign In
                      </template>
                       <sign-in-form/>
          </b-popover>
          <b-button id="signin"  size="sm" class="mr-1"  >
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
import SignInForm from './SignInForm.vue';

import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
export default {
    components:{SignInForm},
    computed:{
        ...mapState("user",["userInfo"]),
        ...mapGetters("user",["loggedIn"])
    },methods:{
        ...mapMutations("user",['LOGOUT']),
       
    }
}
</script>

<style>

</style>

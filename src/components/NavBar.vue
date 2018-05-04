<template>

  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#" to="/" >
      <img height="30" width="30" :src="require('../assets/icon.png')" class="d-inline-block align-top" alt="BV">
        aze
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
        <b-nav-form @submit.prevent="search" v-if="$route.name!='search'"  class="ml-5" >
          <b-form-input size="sm" v-model="query" class="mr-sm-2" name=""  type="text" placeholder="Search"/>
          <b-button  type="submit" size="sm" class="my-2 my-sm-0" variant="" >Search</b-button>
        </b-nav-form>
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown v-if="loggedIn" right  >
          <template slot="button-content">
            <em class="text-white">{{userInfo.profile?userInfo.profile.handle:""}}</em>
          </template>
          <b-dropdown-item href="#" :to="`/profile/${userInfo.profile?userInfo.profile.handle:''}`" >Profile</b-dropdown-item>
          <b-dropdown-item href="#" @click="LOGOUT" >Signout</b-dropdown-item>
          <b-dropdown-item href="#" to="/post/new/edit" >Create Post</b-dropdown-item>
        </b-nav-item-dropdown>
        <template v-else>
            <b-popover  target="signin"
              placement="bottomleft"
              triggers="click">
                <template slot="title">
                <b-btn  class="close" @click="$root.$emit('bv::hide::popover')" aria-label="Close">
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
          <b-button v-b-modal="'signup'" size="sm"  >
                  Signup
                  <i class="fas fa-user-plus"></i>
          </b-button>

          <b-modal id="signup" 
          lazy 
          @show="$root.$emit('bv::hide::popover')" 
          title="Signup"
          hide-footer >
            <signup-form/>
          </b-modal>
        </template>
      </b-navbar-nav>

      </b-collapse>
  </b-navbar>

</template>

<script>
import SignInForm from './SignInForm.vue';
import SignupForm from './SignupForm.vue';

import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
export default {
    components:{SignInForm,SignupForm},
    data:_=>({
      query:''
    }),
    computed:{
        ...mapState("user",["userInfo"]),
        ...mapGetters("user",["loggedIn"])
    },methods:{
        ...mapMutations("user",['LOGOUT']),
       search(){
         console.log("searching")
         this.$router.push({ path: '/search', query: { q: this.query }})
       }
    }
}
</script>

<style>

</style>

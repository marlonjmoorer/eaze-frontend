<template>
    <b-button size="sm" v-if="visible"  :disabled="loading" variant="outline-info" @click="follow()" :pressed="following" >
    {{following?"UnFollow":"Follow"}}
    </b-button>
</template>

<script>
import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
export default {
    props:["profile"],
    data:()=>({
        loading:false
    }),
    computed:{
        ...mapGetters("user",["userProfile","loggedIn"]),
        ...mapGetters("profile",["authorsFollowing"]),
        following:function(){
            return  this.userProfile? this.userProfile.following.includes(this.profile.id):false
        },
        visible:function(){
            return this.profile&&this.loggedIn&&this.profile.handle!=this.userProfile.handle
        }
    },
    methods:{
        ...mapActions("profile",["followAuthor"]),
        follow(){
            this.followAuthor(this.profile.handle)
            this.loading=true
        }
    },watch:{
        userProfile(){
            this.loading=false
        },
    }
}
</script>

<style>

</style>

<template>
    <b-button variant="outline-info" @click="follow()" :pressed="following" >{{following?"Following":"Follow"}}</b-button>
</template>

<script>
import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
export default {
    computed:{
        
        ...mapState(['profile','posts',"user"]),
        following:function(){
            return this.user.profile.following.includes(this.profile.id)
        }
    },
    methods:{
        ...mapActions(["followAuthor"]),
        follow(){
            this.followAuthor({
                handle:this.profile.handle,
                add:!this.following,
                id:this.profile.id
            })
        }
    }
}
</script>

<style>

</style>

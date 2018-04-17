<template>
    <div v-if="visible" >
        <b-button   variant="outline-info" @click="follow()" :pressed="following" >
        {{following?"Following":"Follow"}}
        </b-button>
    </div>  
</template>

<script>
import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
export default {
    props:["profile"],
    data:()=>({
        loading:false
    }),
    computed:{
        //...mapState(['posts',"user"]),
        ...mapGetters("user",{
            user:"userProfile"
        }),
        ...mapGetters("profile",["authorsFollowing"]),
        following:function(){
            return  this.user? this.user.following.includes(this.profile.id):false
        },
        visible:function(){
            console.log(this.$store.state.user.userInfo)
            return this.profile&&this.profile.handle!=this.user.handle
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

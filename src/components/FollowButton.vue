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
        ...mapState(['posts',"user"]),
        following:function(){
            return this.user.profile.following.includes(this.profile.id)
        },
        visible:function(){
            return this.profile&&this.profile.handle!=this.user.profile.handle
        }
    },
    methods:{
        ...mapActions(["followAuthor"]),
        follow(){
            this.followAuthor({
                handle:this.profile.handle,
                add:!this.following,
                id:this.profile.id
            }).then(()=>{
               
               
            })
        }
    }
}
</script>

<style>

</style>

<template>
   <b-col>
        <div class="mt-5">
          <h3>Preview :</h3>
           <post-content :post="post"/>
        </div>
    </b-col>
</template>

<script>
import PostContent from '@/components/PostContent.vue';
export default {
    components:{PostContent},

    async asyncData ({ params,store }) {
        
        return {post:store.state.articles.previewPost}
    },
    layout: 'blank',
    data:()=>({
       post: {
                title:"Title",
                body:"testing",
                posted:new Date(),
                image:"",
                author:{"user":"me"},
                tags:[]
        }
    }),
    computed:{
        // previewPost:function(){
        //     return{
        //         title:"Title",
        //         body:"testing",
        //         posted:new Date(),
        //         image:"",
        //         author:{"user":"me"},
        //         tags:[]
        //     }
        // },
    },
    created(){
        this.$store.watch(state=>state.articles.previewPost,data=>{
            this.post=data
        })
    }


}
</script>

<style>

</style>

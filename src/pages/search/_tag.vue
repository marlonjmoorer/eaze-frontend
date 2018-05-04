

<template>
        <b-container class="bg-white mt-3 wrapper">
            <b-row>
                <b-col class="py-4">
                    <h4 class="py-4"> 
                        Tagged with  <b-badge class="mr-1"  href="#"  >
                            {{tag.name}}
                        </b-badge>
                    </h4>
                    <hr/>
                    <tag-button :key="tag.id" :tag="tag" v-for="tag in related" />
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <template v-if="loading">
                        <b-row  align-h="center" >
                            <b-col >
                            Loading....
                             <b-progress :value="100" variant="danger" :animated="true" class="mb-3"></b-progress>
                            </b-col>  
                        </b-row>
                    </template>
                    <template v-else-if="noResults"  >
                         <b-row  align-h="center" >
                            <b-col >
                                <b-img fluid center src="https://cdn.dribbble.com/users/163617/screenshots/2386158/no-results_1x.jpg"/>
                            </b-col>  
                        </b-row>
                    </template>
                    <b-card v-else no-body>
                       
                                <b-row>
                                    <b-col sm="6" :key="post.id" v-for="post in searchResults.posts" >
                                        <post-list-item :post="post" />
                                    </b-col>
                                </b-row>
                            
                    </b-card>
                   
                </b-col>
            </b-row>
        </b-container>
       
</template>

<script>

import PostListItem from '@/components/PostListItem.vue';
import TagButton from '@/components/TagButton.vue';

import  {mapState,mapActions} from 'vuex';
export default {
    components:{
        PostListItem,
        TagButton
    },
    async asyncData ({store,params:{tag}}){
        await Promise.all([
           store.dispatch("search/search",{query:tag,areas:["post","tags"]}),
           store.dispatch("search/getRelatedTags"),
        ])
        const {searchResults,related}=store.state.search
        const match= searchResults.tags.find(t=>t.slug==tag)
        return{tag:match,related}
    },
    data:()=>({
        query:null,
        loading:false,
    }),
    methods:{
        ...mapActions("search",['search']),
        
    },
    computed:{
        ...mapState("search",["searchResults"]),
        ...mapState("articles",["tags"]),
        noResults(){
            let {posts}=this.searchResults
            return posts.length==0 
        },
        // related(){
        //     return this.tags.filter(t=>t!=this.tag)
        // }
       
    },
    mounted(){
        console.log('update')
        let {tag}=this.$route.query
        this.query=tag
        
    }

}
</script>

<style>
.wrapper{
    height: 100%;
}
.full{
    height: 100vh;
}
</style>

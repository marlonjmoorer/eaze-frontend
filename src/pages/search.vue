

<template>
        <b-container class="bg-white mt-3 wrapper">
            <b-row>
                <b-col class="py-4">
                     <b-input-group >
                     <b-form-input 
                        type="text"
                        v-model="query"
                        @change="search(query)"
                        placeholder="Search"/>
                        <b-input-group-append>
                            <b-btn variant="info" @click="search(query)" ><i class="fas fa-search"></i></b-btn>
                        </b-input-group-append>
                     </b-input-group>
                </b-col>
            </b-row>
            <b-row v-if="searchResults.posts.length>0">
                <b-col>
                    <b-row>
                        <b-col>
                            <h3>Articles</h3>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="6" :key="post.id" v-for="post in searchResults.posts" >
                            <post-list-item :post="post" />
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row class="py-5" v-if="searchResults.people.length>0">
                <b-col>
                    <b-row>
                         <b-col><h3>People</h3></b-col>
                        
                    </b-row>
                    <b-row>
                        <b-col
                            sm="4"
                            :key="profile.id"
                            v-for="profile in searchResults.people">
                                <profile-card :profile="profile" /> 
                        </b-col>
                    </b-row>
                </b-col>
                
            </b-row>
            <b-row class="py-5" v-if="searchResults.tags.length>0">    
                <b-col>
                    <b-row>
                        <b-col>
                            <h3>Categories</h3>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col >
                           <h3>
                            <b-badge href="#" :key="i" class="mr-1" v-for="(tag,i) in searchResults.tags " >
                             {{tag.name}}
                            </b-badge>
                            </h3>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row  v-if="noResults" align-h="center" >
                <b-col >
                    <b-img fluid center src="https://cdn.dribbble.com/users/163617/screenshots/2386158/no-results_1x.jpg"/>
                </b-col>  
            </b-row>
        </b-container>
       
</template>

<script>

import PostListItem from '../components/PostListItem.vue';
import ProfileCard from '../components/ProfileCard.vue';

import  {mapState,mapActions} from 'vuex';
export default {
    components:{
        PostListItem,
        ProfileCard
    },
    async fetch({store,query:{q}}){
       store.dispatch("search/search",q)
    },
    data:()=>({
        query:null
    }),
    methods:{
        ...mapActions("search",['search']),
    },
    computed:{
        ...mapState("search",["searchResults"]),
        noResults(){
            let {posts,tags,people}=this.searchResults
            return posts.length==0 && tags.length==0 &&people.length==0
        }
    },
    mounted(){
        console.log('update')
        let {q}=this.$route.query
        this.query=q
        
    }

}
</script>

<style>
.wrapper{
    height: 100%;
}
</style>

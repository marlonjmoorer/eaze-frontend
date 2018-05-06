

<template>
        <b-container class="bg-white mt-3 wrapper">
            <b-row>
                <b-col class="py-4">
                     <b-input-group >
                     <b-form-input 
                        type="text"
                        v-model="query"
                        @change="onSearch"
                        placeholder="Search"/>
                        <b-input-group-append>
                            <b-btn variant="info" @click="onSearch" ><i class="fas fa-search"></i></b-btn>
                        </b-input-group-append>
                     </b-input-group>
                    
                    <b-form-group  label="Filters">
                        <label class="mr-2"><input type="checkbox" value="posts" v-model="areas"/> Articles</label> 
                        <label class="mr-2"><input type="checkbox" value="tags" v-model="areas" />Categories </label> 
                        <label class="mr-2"><input type="checkbox" value="profiles" v-model="areas"/> People</label>
                    </b-form-group>
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
                        <b-tabs pills card vertical>
                            <b-tab  v-if="searchResults.posts.length>0" title="Articles" active>
                                <b-row>
                                    <b-col sm="6" :key="post.id" v-for="post in searchResults.posts" >
                                        <post-list-item :post="post" />
                                    </b-col>
                                </b-row>
                            </b-tab>
                            <b-tab title="People"  v-if="searchResults.people.length>0">
                                <b-row>
                                    <b-col
                                        sm="4"
                                        :key="profile.id"
                                        v-for="profile in searchResults.people">
                                            <profile-card :profile="profile" /> 
                                    </b-col>
                                </b-row>
                            </b-tab>
                            <b-tab title="Categories"  v-if="searchResults.tags.length>0"> 
                               <div class="full" >
                                   <h3 class="tags">
                                       <tag-button :key="tag.id" :tag="tag" v-for="tag in searchResults.tags" />
                                   </h3>
                                </div>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                   
                </b-col>
            </b-row>
        </b-container>
       
</template>

<script>

import PostListItem from '@/components/PostListItem.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import TagButton from '@/components/TagButton.vue';

import  {mapState,mapActions} from 'vuex';
export default {
    components:{
        PostListItem,
        ProfileCard,
        TagButton
    },
    async asyncData({store,query:{q}}){
       const areas=["posts","tags","profiles"]
       await store.dispatch("search/search",{query:q,areas})
       return {areas}
    },
    data:()=>({
        query:null,
        loading:false,
        //areas:["posts","tags","profiles"],
    }),
    methods:{
        ...mapActions("search",['search']),
        onSearch(){
            this.$router.push({ path: '/search', query: { q: this.query }})
            this.loading=true
            const data={
                query:this.query,
                areas:this.areas
            }
            this.search(data).then(()=>this.loading=false)
        }
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
.full{
    height: 100vh;
}
.tags{
    display: flex;
    justify-content: center;
}
</style>

<template>
  <div>
    <b-popover
        :target="target"
        placement="bottom"
        triggers="click">
        <template slot="title">
            <b-btn  class="close" @click="$root.$emit('bv::hide::popover')" aria-label="Close">
                <span class="d-inline-block" aria-hidden="true">&times;</span>
            </b-btn>
            Tags
        </template>
        <div>
            <b-form-group  label-for="query"
                            class="mb-1"
                            description="Search for a tag">   
                <b-form-input  @keyup.native="searchTags()" id="query"  size="sm" v-model="query" />
            </b-form-group>
            
        </div>
    </b-popover>
    
    
    <b-popover
        target="query"
        triggers="focus"
        placement="right"
        id="query"
        > 
        <span v-if="!query">
        Type something to start search
        </span>
        <!-- <span v-else-if="results.length==0" >
            No Results
        </span> -->
        <template v-else-if="results.length>0">
        <b-list-group>
        <b-list-group-item
            href="#"
            @click="appendTag(tag)"
            v-for="(tag,i) in results"
            :key="i" >
            {{tag.name}}
            </b-list-group-item>
        </b-list-group>
        </template>
        <span  v-else-if="results.length==0" >
            No Results
        </span>
    </b-popover>
    </div>  
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex'
export default {
    props:['target','addedTags','onAdd'],
    data:()=>({
        query:''
    }),
    computed:{
        ...mapState("articles",["tags"]),
        results:function(){
            return this.tags&&this.query? this.tags.filter(tag=>tag.name.toLowerCase().includes(this.query)):[]
        }
    },methods:{
        ...mapActions("articles",["loadTagList"]),
        searchTags(){
            
            if(this.query){
                this.loadTagList(this.query)
            }
        },
        appendTag(tag){
            this.$root.$emit('bv::hide::popover','query')
            const exist= this.addedTags.includes(tag)
            if(!exist){
                this.addedTags.push(tag)
            }
        }
    }


};
</script>

<style>

</style>

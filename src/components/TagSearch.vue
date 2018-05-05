<template>
  <div>
    <b-popover
        :target="target"
        placement="bottom"
        triggers="click">
        <template slot="title">
            <b-btn  class="close" aria-label="Close">
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
            <b-alert show class="small">
                <strong>Current Tags:</strong><br/>
                <b-badge href="#"  :key="i" class="mr-1" v-for="(tag,i) in addedTags" >
                    {{tag.name}}  <b-badge @click="addedTags.splice(i,1)">x</b-badge>
                </b-badge>
            </b-alert>
        </div>
    </b-popover>
    
    
    <b-popover
        target="query"
        triggers="focus"
        placement="bottom"
        > 
        <span v-if="results.length==0">
        Type something to start search
        </span>
        <template v-else>
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
            console.log("object")
            if(this.query){
                this.loadTagList(this.query)
            }
        },
        appendTag(tag){
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

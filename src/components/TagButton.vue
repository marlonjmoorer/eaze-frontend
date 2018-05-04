<template>
    <b-badge class="mr-1" @click="onTagSearch(tag)" href="#"  >
        {{tag.name}}
    </b-badge>
</template>

<script>
export default {
    props:['tag'],
    
    methods:{
        onTagSearch(tag){
            console.log("searching")
         this.$router.push({ path: `/search/${tag.slug}` })
        }
    }
}
</script>

<style>

</style>

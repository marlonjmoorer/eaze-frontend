<template>
<div>
    <h1 class="mt-4">{{post.title}}</h1>
    <p class="lead">
        by <a href="#">{{post.author}}</a>
    </p>
    <hr/>
        {{dateString}}
    <hr/>
    <b-row v-if="post.image" >
        <b-col class="banner">
                <b-img :src="post.image" fluid alt="Responsive image"  />
        </b-col>
        <hr/>
    </b-row>
    <p v-html="post.body"></p>
    <hr/>
</div>
   
</template>

<script>
export default {
props:['post'],
computed:{
     dateString:function(){
            var options = {  
                weekday: "long", year: "numeric", month: "short",  
                day: "numeric", hour: "2-digit", minute: "2-digit"  
            };  
           return new Date(this.post.posted).toLocaleDateString("en-US",options)
    }
}
}
</script>

<style>

</style>

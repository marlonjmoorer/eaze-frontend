<template>
  <b-card   bg-variant=""
            :img-src="post.image||'http://via.placeholder.com/350x150'"
            img-alt="Image"
            img-top
            tag="article"
            footer-bg-variant="info"
            class="mb-2">
            <b-row>
                <b-col>

                </b-col>
                <b-col>
                    
                </b-col>
            </b-row>
                <b-link router-tag='h2' :to="`/post/${post.slug}`" class="card-text">
                   {{post.title}}
                </b-link>                
            <div slot="footer">
               <b-img left src="https://lorempixel.com/125/125/technics/8/" alt="left image" />
                <b-link   class="ml-2 text-white" :to="`/post/${post.slug}`" >
                   {{post.author}}
                </b-link>  
            </div>
  </b-card>
</template>

<script>
export default {
    props:['post'],

}
</script>

<style>
article{
  
}
article .card-img-top{
    max-height: 200px !important;
}
.card-footer img{
    width: 33px;
    height: 33px;
}
</style>

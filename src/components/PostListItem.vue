<template>
  <b-card   bg-variant=""
            tag="article"
            footer-bg-variant="info"
            class="mb-2">
          
              <!--   <b-col sm="7">
                    <b-link router-tag='h2' :to="`/post/${post.slug}`" class="card-text">
                        {{post.title}}
                    </b-link> 
                </b-col>
                <b-col sm="5" class="frame">
                    <img  :src="post.image||'http://via.placeholder.com/350x150'" />
                </b-col> -->
                 
              <b-media right-align vertical-align="center">
                <b-img slot="aside" width="100" height="100"  :src="post.image||'http://via.placeholder.com/350x150'" />
                <b-link router-tag='h2' class="align-middle" :to="`/post/${post.slug}`" >
                    {{post.title}}
                </b-link> 
                <p></p>
              </b-media>
                   
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
.frame{
     height: 150px !important;
}
.frame img{
  width: 100%;
  height: 100%;
}
.card-footer img{
    width: 33px;
    height: 33px;
}

</style>

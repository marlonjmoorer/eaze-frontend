
<template>
  <b-container fluid >
    <b-row>
      <b-col>
        <b-card 
          class="mt-5"
          bg-variant="white"
          header-bg-variant="info"
          header-text-variant="white">
          <b-row slot="header"
                class="mb-0">
                <b-col>
                  <h6 >New Post</h6>
                </b-col>
                <b-col  md="6">
                  <b-button-group>
                    <b-button 
                         @click="openPreview"
                          variant="outline-light"
                          ref="button">
                        Preveiw
                    </b-button>
                    <b-button id="tags"
                      variant="outline-light"
                      ref="button">
                        Tags
                    </b-button>
                  
                  </b-button-group>
                  <tag-search :target="'tags'" :addedTags="post.addedTags" />
                </b-col>
            </b-row>
            <input type="file" v-show="false" ref="fileInput" @change="handleFileChange" accept="image/*"/>
            <b-form-group >
                <b-form-input :required='true' v-model="post.title" placeholder="Title" ></b-form-input>
            </b-form-group>
            <b-dropdown id="ddown1" text="Add" dropup  class="m-md-2">
              <b-dropdown-item @click="getFile"> 
                <i class="fas fa-image"></i> Image File
              </b-dropdown-item>
              <b-dropdown-item @click="post.image.external=true"> 
                <i class="fas fa-link"></i> Image Url
              </b-dropdown-item>
            </b-dropdown>
            <b-form-group v-if="post.image.external">
              <b-form-input placeholder="Url" v-model="post.image.url" />
            </b-form-group>
              <span v-if="post.image.file" variant="primary">
                {{post.image.file.name}} <b-badge href="#" @click="post.image.file=null" variant="danger">X</b-badge>
              </span>
             
              <b-form-group label="Body" >
                <no-ssr>
                 <froala :tag="'textarea'" v-model="post.body"></froala>
                 </no-ssr> 
                  <!-- <vue-html5-editor :content="content" @change="updateContent" :height="500"></vue-html5-editor> -->
              </b-form-group> 
              <b-button @click="submit(false)" variant="success">Publish</b-button>
              <b-button v-if="post.isDraft" @click="submit(true)" variant="info">Save as Draft</b-button>
               
            
          </b-card>
  
      </b-col>
    </b-row>
    
  </b-container>
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex'
import PostContent from '@/components/PostContent.vue';
import TagSearch from '@/components/TagSearch.vue';


export default {
  components:{PostContent,TagSearch},
  async asyncData ({ params,store }) {

    let defaultPost={
        title:"",
        image:{
          url:"",
          file:null,
          external:false
        },
        body:'',
        addedTags:[],
        existingImage:"",
        isDraft:true,
        posted:new Date(),
        
        author:{user:"none"}
      }

     if(params.slug&&params.slug!="new"){
        await  store.dispatch("articles/getPost",params.slug)
        const {currentPost}= store.state.articles
        defaultPost.title=currentPost.title,
        defaultPost.body=currentPost.body,
        defaultPost.isDraft=currentPost.draft,
        defaultPost.addedTags=currentPost.tags
        defaultPost.author=currentPost.author
        defaultPost.posted= currentPost.posted
        defaultPost.slug=params.slug
        if(currentPost.image){
             defaultPost.existingImage=defaultPost.image.url=currentPost.image
             defaultPost.image.external=true
        }
       
     }
     return {post:defaultPost, previewWindow:null}
    
  },
  watch:{
    image:{
      handler: function (val, oldVal) { 
        if(val.external){
           this.image.file=null
        }else{
          if(val.file){
            this.image.url=null
          }
        }
      },
      deep: true
    },
    post:{
      handler:function(val, prev){
          console.log(val,prev)
          this.$store.commit("articles/UPDATE_PREVEIW",val)
      },
      deep: true
    }
  },
  computed:{
    ...mapState(["currentPost","user"]),
    previewUrl:function(){
      return this.image.url||(this.image.file?URL.createObjectURL(this.image.file):"");
    },
    previewPost:function(){
      return{
        title:this.title||"Title",
        body:this.content,
        posted:new Date(),
        image:this.previewUrl,
        author:{"user":"ME"},
        tags:this.addedTags
      }
    },
  },
  methods:{
     ...mapActions("articles",['publishPost','getPost',"loadTagList"]),
     submit(saveAsDraft){

       const {title,body,isDraft,addedTags,slug}=this.post
       if(title&& body){
         console.log(this)
         let form= new FormData()
         form.append("title",title) 
         form.append("body",body)
         form.append("tags",JSON.stringify(addedTags))
         if(saveAsDraft&&isDraft){
           form.append("draft",saveAsDraft)
         }
         if(slug){
           form.append("slug",slug)
         }
        

         this.prepareImages(form).then(this.publishPost).then(status=>{
           if(status==201){
             this.$router.push('/') 
           }
           if(status==200){
             this.$router.push(`/post/${slug}`)
           }
         })
       } 
     },
     getFile(){
       this.image.external=false
       this.$refs.fileInput.click()
     },
     handleFileChange(e){
       console.log(e)
       this.image.file=e.target.files[0]
     },
     prepareImages(form){
         if(this.post.image.file){
           form.set("image",this.image.file)
         }else if(this.post.image.url&&this.post.existingImage!=this.post.image.url)
         {
            return fetch(this.image.url).then(res=>res.blob()).then(blob=>{
                    console.log(blob)
                    var file = new File([blob],`${this.post.title}.${blob.type.split("/")[1]}`);
                    form.set("image",file)
                    return form
            })
         }
         return Promise.resolve(form)
    },
    openPreview(){
      if(!this.previewWindow){
        
        var previewWindow=window.open(`/post/${this.post.slug}/preview`,'','height=1000,width=750')
        previewWindow.onbeforeunload=()=>{
          this.previewWindow=null
          previewWindow.onload=null
          previewWindow.onbeforeunload=null
        }
        previewWindow.onload=()=>{
          this.$store.commit("articles/UPDATE_PREVEIW",this.post)
        }
        this.previewWindow=previewWindow
      }
    }
    
  },
  created(){
   
    
  }
}
</script>

<style scopped>
img.preview{
  width: 100%;
  height: 250px;
}

</style>
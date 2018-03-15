


<template>
  <b-container fluid >
    <b-row>
      <b-col v-show="showPreview">
        <div class="mt-5">
          <h3>Preview :</h3>
          <post-content :post="previewPost"/>
        </div>
        
      </b-col>
      <b-col>
        <b-card 
          class="mt-5"
          bg-variant="white"
          header-bg-variant="info"
          header-text-variant="white">
          <b-row slot="header"
                class="mb-0">
                <b-col><h6 >New Post</h6></b-col>
                <b-col md="3">
                  <b-form-checkbox 
                    v-model="showPreview"
                    >
                    Preview
                  </b-form-checkbox>
                </b-col>
            </b-row>
            <input type="file" v-show="false" ref="fileInput" @change="handleFileChange" accept="image/*"/>
            <b-form-group >
                <b-form-input :required='true' v-model="title" placeholder="Title" ></b-form-input>
            </b-form-group>
            <b-dropdown id="ddown1" text="Add" class="m-md-2">
              <b-dropdown-item @click="getFile"> 
                <i class="fas fa-image"></i> Image File
              </b-dropdown-item>
              <b-dropdown-item @click="image.external=true"> 
                <i class="fas fa-link"></i> Image Url
              </b-dropdown-item>
            </b-dropdown>
            <b-form-group v-if="image.external">
              <b-form-input placeholder="Url" v-model="image.url" />
            </b-form-group>
              <span v-if="image.file" variant="primary">
                {{image.file.name}} <b-badge href="#" @click="image.file=null" variant="danger">X</b-badge>
              </span>
             
             <!--  <b-row class="mb-3">
                <b-img class="preview" v-if="previewUrl" :src="previewUrl" alt="Responsive image" />
              </b-row> -->

              <b-form-group>
                  <vue-html5-editor :content="content" @change="updateContent" :height="500"></vue-html5-editor>
              </b-form-group> 
              <b-button @click="submit(false)" variant="success">Publish</b-button>
              <b-button v-if="isDraft" @click="submit(true)" variant="info">Save as Draft</b-button>
               
            
          </b-card>
  
      </b-col>
    </b-row>
    
  </b-container>
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex'
import DeltaToHtml from 'quill-delta-to-html'
import PostContent from './PostContent.vue';

export default {
  components:{PostContent},
  props:['slug'],
  data:()=>({
      title:"",
      image:{
        url:"",
        file:null,
        external:false
      },
      config:{
         placeholder: 'Body',
      },
      content:'',
      showPreview:false,
      existingImage:"",
      isDraft:true
  }),
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
  },
  computed:{
    ...mapGetters(["user"]),
    ...mapState(["currentPost"]),
    previewUrl:function(){
      return this.image.url||(this.image.file?URL.createObjectURL(this.image.file):"");
    },
    previewPost:function(){
      return{
        title:this.title||"Title",
        body:this.content,
        posted:new Date(),
        image:this.previewUrl,
        author:{"user":this.user.full_name}
      }
    }
  },
  methods:{
     ...mapActions(['publishPost','getPost']),
     updateContent(html){
       this.content=html
     },
     submit(draft){

       if(this.title&& this.content){
         console.log(this)
         let form= new FormData()
         form.append("title",this.title) 
         form.append("body",this.content)
         if(draft&&this.isDraft){
           form.append("draft",draft)
         }
         if(this.slug){
           form.append("slug",this.slug)
         }

         this.prepareImages(form).then(this.publishPost).then(status=>{
           if(status==201){
             this.$router.push('/') 
           }
           if(status==200){
             this.$router.push(`/post/${this.slug}`)
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
         if(this.image.file){
           form.set("image",this.image.file)
         }else if(this.image.url&&this.existingImage!=this.image.url)
         {
            return fetch(this.image.url).then(res=>res.blob()).then(blob=>{
                    console.log(blob)
                    var file = new File([blob],`${this.title}.${blob.type.split("/")[1]}`);
                    form.set("image",file)
                    return form
            })
         }
         return Promise.resolve(form)
     }
  },
  created(){
    if(this.slug){
     this.getPost(this.slug).then(()=>{
       this.$nextTick(() => {
          console.log (this.currentPost)
          this.title=this.currentPost.title
          this.content=this.currentPost.body
          this.isDraft= this.currentPost.draft
          if(this.currentPost.image){
            this.existingImage=this.image.url=this.currentPost.image
            this.image.external=true
            
          }
       });
     })
    }
  }
}
</script>

<style scopped>
img.preview{
  width: 100%;
  height: 250px;
}

</style>

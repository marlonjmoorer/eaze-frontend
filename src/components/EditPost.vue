


<template>
  <b-container>
    <b-card 
          class="mt-5"
          bg-variant="white"
          header="New Post"
          header-bg-variant="info"
          header-text-variant="white">
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
              
              <b-row class="mb-3">
                <b-img v-if="previewUrl" :src="previewUrl" alt="Responsive image" />
              </b-row>

              <b-form-group>
                  <quill v-model="content" :config=config></quill>
              </b-form-group> 
              <b-button @click="submitPost" variant="success">Publish</b-button>
              <b-button variant="info">Save as Draft</b-button>
               
            
  </b-card>
  
  </b-container>
</template>

<script>
import {mapActions} from 'vuex'
import Renderer,{Document} from 'quilljs-renderer'
import DeltaToHtml from 'quill-delta-to-html'
Renderer.loadFormat('html');
export default {
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
     
      content:null
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
    body:function(){
      if(this.content){
 
          var converter = new DeltaToHtml(this.content.ops,{});
          var html = converter.convert();
          console.log(html)
          return html
        /*  console.log(this.content.ops);
        var doc = new Document(this.content.ops);
        console.log(doc.convertTo('html'));
        return doc.convertTo('html') */
      }
    },
    previewUrl:function(){
      return this.image.url||(this.image.file?URL.createObjectURL(this.image.file):"");
    }
  },
  methods:{
     ...mapActions(['publishPost']),
     submitPost(){

       if(this.title&& this.body){
         console.log(this)
         let form= new FormData()
         form.append("title",this.title) 
         form.append("body",this.body)
         this.sendPost(form).then(status=>{
           if(status==201){
             this.$router.push('/') 
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
     sendPost(form){
         if(this.image.file){
           form.set("image",this.image.file)
           return this.publishPost(form)
         }else if(this.image.url)
         {
            return fetch(this.image.url).then(res=>res.blob()).then(blob=>{
                    console.log(blob)
                    var file = new File([blob],`${this.title}.${blob.type.split("/")[1]}`);
                    form.set("image",file)
                    return this.publishPost(form)
            })
         }
     }
  },
  mounted(){
    console.log(this.$refs)
  },
  created(){
    console.log(this)
  }
}
</script>

<style scopped>
img{
  width: 100%;
  height: 250px;
}
</style>

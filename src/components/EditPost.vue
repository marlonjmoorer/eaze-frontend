

<template>
  <b-container>
    <b-card 
          class="mt-5"
          bg-variant="white"
          header="New Post"
          header-bg-variant="info"
          header-text-variant="white">
            <b-form-group >
                <b-form-input :required='true' v-model="title" placeholder="Title" ></b-form-input>
            </b-form-group>
              <label type="label" class="btn btn-info" for="image" variant="info">
                 <i class="fas fa-image"></i> Add Header Image
                 <b-form-file id="image" v-show="false" accept="image/*" v-model="image.file" placeholder="Image File" ></b-form-file>
              </label>
              <span v-if="image.file" variant="primary">
                {{image.file.name}} <b-badge href="#" @click="image.file=null" variant="danger">X</b-badge>
              </span>
              <b-row class="mb-3">
                <b-img v-if="image.file" :src="previewUrl" alt="Responsive image" />
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
      previewUrl:null,
      content:null
  }),
  watch:{
    image:{
      handler: function (val, oldVal) { 
        console.log("W")
        if(val.external){
          this.previewUrl=val.url
        }else{
          if(val.file){
            this.previewUrl= URL.createObjectURL(val.file);
          }
        }
      },
      deep: true
    },
  },
  computed:{
    body:function(){
      if(this.content){
        var doc = new Document(this.content.ops);
        console.log(doc.convertTo('html'));
        return doc.convertTo('html')
      }
    }
  },
  methods:{
     ...mapActions(['publishPost']),
     submitPost(){
       console.log("object")
       if(this.title&& this.body){
         console.log(this)
         let form= new FormData()
         form.append("title",this.title) 
         form.append("body",this.body)
         
         if(this.image.file){
           form.append("image",this.image.file)
         }
         
         this.publishPost(form).then(status=>{
           if(status==201){
             this.$router.push('/') 
           }
         })
       } 
     }
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

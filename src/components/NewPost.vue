<template>
  <b-container>
    <b-card 
          class="mt-5"
          bg-variant="dark"
          header="New Post"
          text-variant="white">
              <b-row>
                <b-img v-if="previewUrl" :src="previewUrl" alt="Responsive image" />
              </b-row>
              <b-row>
                <b-col>
                    <b-button-group class="mb-3">
                      <b-button @click="submitPost" variant="success">Publish</b-button>
                      <b-button variant="info">Save as Draft</b-button>
                    </b-button-group>
                </b-col>
               
              </b-row>
             
              <b-form-group
               label="Image">
                  <b-form-input v-if="image.external" v-model="image.url" placeholder="Image Url" ></b-form-input>
                  <b-form-file v-else accept="image/*" v-model="image.file" placeholder="Image File" ></b-form-file>
                  
                  <b-form-checkbox id="checkbox1"
                     v-model="image.external"
                    >
                    External
                  </b-form-checkbox>
              </b-form-group>
             
              <b-form-group
                  label="Title *" >
                  <b-form-input :required='true' v-model="title" ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Body *">
                <b-form-textarea id="textarea1"
                      v-model="body"
                      :required='true'
                      placeholder="Enter something"
                      :rows="10"
                      :max-rows="1000">
                  </b-form-textarea>
              </b-form-group>
             
               
            
  </b-card>
  
  </b-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
 data:()=>({
   title:"",
   body:"",
   image:{
     url:"",
     file:null,
     external:false
   },
   previewUrl:null
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
  methods:{
     ...mapActions(['publishPost']),
     submitPost(){
       console.log("object")
       if(this.title&& this.body){
         console.log(this)
         let form= new FormData()
         form.append("title",this.title) 
         form.append("body",this.body)
         
         if(this.image.external){
           form.append("imageUrl",this.image.url)
         }
         else{
           form.append("imageFile",this.image.file)
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

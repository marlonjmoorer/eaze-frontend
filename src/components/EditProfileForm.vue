<template>
    <form  @submit.prevent="submit">
        <b-row>
            <b-col>
                <form-field
                    label="Website:"
                    placeholder="Website"
                    :model.sync="updatedProfile.website"
                    :validation="$v.updatedProfile.website"/>
                
               <form-field
                    type="textarea"
                    label="About:"
                    placeholder="About"
                    :model.sync="updatedProfile.about"
                    :validation="$v.updatedProfile.about"
                    />
                <hr>
                <b-btn id="link" variant="link">
                 Add Social Link
                </b-btn>
                <b-popover target="link"
                        placement="left"
                        title="Select a type"
                        triggers="focus">
                       <h4>
                            <b-badge :key="i" v-for="(t,i) in types" href="#" @click="addLink(t)" variant="secondary"><i :class="`fab fa-${t.link_type}`"></i></b-badge>
                        </h4>
                </b-popover>
                <b-input-group :key="i" v-for="(link,i) in updatedProfile.links"  >
                    <b-input-group-text slot="prepend">
                        <span><i :class="`fab fa-${link.link_type}`"></i></span>
                    </b-input-group-text>
                    <b-form-input :class="{ 'deleted': link.delete }" :disabled="link.delete" v-model="link.url" ></b-form-input>
                    <b-input-group-addon append  >
                        <b-btn v-if="!link.delete" @click="removeLink(i)" variant="danger"><span> <i class="fas fa-trash"></i></span></b-btn>
                        <b-btn  v-else @click="addLink(link)" variant="success"><span><i class="fas fa-undo"></i></span></b-btn>
                    </b-input-group-addon>
                    <!-- <b-input-group-addon append v-else>
                        <b-btn  @click="addLink(link)" variant="success"><i class="fas fa-undo"></i></b-btn>
                    </b-input-group-addon> -->
                </b-input-group>
            </b-col>
             <b-col align-self="center" >
                 <b-row>
                <b-img 
                rounded="circle" 
                thumbnail 
                fluid 
                class="avi mx-auto" 
                :src="preview||'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX7825622.jpg'" ></b-img> 
                 </b-row>
                  <b-row>
                      <label for="photo" class="btn btn-info mx-auto">
                    <i class="fas fa-camera"></i>
                    Upload new  photo
                    <input id="photo" @change="updatedProfile.photo=$event.target.files[0]" type="file" v-show="false" />
                </label>
                 </b-row>
              
               
            </b-col>
        </b-row>
        <b-row>
            <b-col>
             <b-button type="submit" variant="primary">Submit</b-button>
            </b-col>
        </b-row>
    </form>
    
   
</template>

<script>
import {mapActions} from 'vuex'
import { required, url,email,maxLength,minLength } from "vuelidate/lib/validators"
import FormField from './FormField.vue';
export default {
    components:{FormField},
    props:['profile'],
    data(){
        return{
            updatedProfile:{...this.profile},
            types:[
                { link_type:"facebook",url:""},
                { link_type:"twitter",url:""},
                { link_type:"instagram",url:""},
                { link_type:"youtube",url:""},
            ]
        }
    },
    computed:{
        preview:function(){
            if(! this.updatedProfile.photo){return''}
            if(typeof this.updatedProfile.photo==="string"){
                 return  this.updatedProfile.photo
            }else{
                return URL.createObjectURL(this.updatedProfile.photo)
            }
        },
        activeLinks:function(){
            return this.updatedProfile.links.filter(link=>!link.delete)
        },
    },
    methods:{
        ...mapActions("profile",["updateProfile"]),
        addLink(type){
            if(type.delete){
                type.delete=false
                const index=this.updatedProfile.links.indexOf(type)
                this.$set(this.updatedProfile.links,index,type)
            }else if(this.updatedProfile.links.length<6)
                this.updatedProfile.links.push(type)
        },
        removeLink(i){
            let link=this.updatedProfile.links[i]
            if("id" in this.updatedProfile.links[i]){
                link.delete=true
                this.$set(this.updatedProfile.links,i,link)
            }else{
                this.updatedProfile.links.splice(i,1)
            } 
        },
        submit(){

            if(!this.$v.$invalid){
                const form=new FormData()
                const data= this.updatedProfile
                form.append("about",data.about)
                form.append("website",data.website)
                form.append("links", JSON.stringify(data.links))
                
                if((data.photo instanceof File)){
                    form.append("photo",data.photo)
                }

                this.updateProfile(form).then(res=>{
                    
                })
            }
            
        }
         
    },
    watch:{
        profile(val){
            this.updatedProfile={...val}
        }
    },
    validations:{
        updatedProfile: 
            { 
             website:{
                 url
             },
             about:{
                maxLength:maxLength(140),
                required 
             }
        }
       
    }

}
</script>

<style>
.deleted{
    text-decoration: line-through;
}
</style>

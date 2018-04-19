<template>
    <div>
        <b-row>
            <b-col>
                 <b-form-group 
                    label="Website:">
                    <b-form-input id="exampleInput1"
                                type="text"
                                 v-model="updatedProfile.website"
                                placeholder="Website">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="exampleInputGroup1"
                    label="About:">
                     <b-form-textarea id="textarea1"
                     placeholder="Enter something"
                     v-model="updatedProfile.about"
                     :rows="3"
                     :max-rows="6">
                    </b-form-textarea>
                    
                </b-form-group>
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
                    <b-form-input :disabled="link.delete" v-model="link.url" ></b-form-input>
                    <b-input-group-addon append v-if="!link.delete" >
                        <b-btn  @click="removeLink(i)" variant="danger"><i class="fas fa-trash"></i></b-btn>
                        
                    </b-input-group-addon>
                    <b-input-group-addon append v-else>
                        <button class="btn-success btn" @click="addLink(link)" variant="success">yo</button>
                    </b-input-group-addon>
                </b-input-group>
            </b-col>
             <b-col >
                <b-img 
                rounded="circle" 
                thumbnail 
                fluid 
                class="avi" 
                :src="preview||'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX7825622.jpg'" ></b-img> 
                <label for="photo" class="btn btn-info">
                    <i class="fas fa-camera"></i>
                    Upload new  photo
                    <input id="photo" @change="updatedProfile.photo=$event.target.files[0]" type="file" v-show="false" />
                </label>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
             <b-button type="submit" @click="submit" variant="primary">Submit</b-button>
            </b-col>
        </b-row>
    </div>
    
   
</template>

<script>
import {mapActions} from 'vuex'
export default {
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
           /*  if(this.photoFile){
                return URL.createObjectURL(this.photoFile)
            } */
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
         
    },
    watch:{
        profile(val){
            this.updatedProfile={...val}
        }
    },

}
</script>

<style>

</style>

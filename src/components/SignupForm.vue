<template>
  <form @submit="onSubmit" >
        <b-alert :show="!!(errors)" dismissible variant="danger">
           <p v-for="err in formErrors" :key="err">
               {{ err}}
           </p>
        </b-alert>
         <b-alert :show="!!(success)" dismissible variant="success">
           <span>Signup Sucessful!</span>
        </b-alert>
        <b-row>
            <b-col>
                    <form-field
                        :model.sync="first_name"
                        placeholder="First Name"
                        :validation="$v.first_name"
                    />
            </b-col>
            <b-col>
               <form-field
                        :model.sync="last_name"
                        placeholder="Last Name"
                        :validation="$v.last_name"
                    />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
               <form-field
                    type="email"
                    :model.sync="email"
                    placeholder="Email"
                    :validation="$v.email"
                />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <form-field
                    type="password"
                    :model.sync="password"
                    placeholder="Password"
                    :validation="$v.password"
                />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
              <form-field
                    type="password"
                    :model.sync="confirm_password"
                    placeholder="Confirm Password"
                    :validation="$v.confirm_password"
                />
            </b-col>
        </b-row>
      
      <b-button type="submit" variant="info">Submit</b-button>
  
  </form>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { required, minLength, email,sameAs } from "vuelidate/lib/validators"
import FormField from './FormField.vue';
export default {
    components:{FormField},
    data:()=>({
        first_name:'' ,
        last_name:'',
        email:'',
        password:'',
        confirm_password:'',
       errors:null,
       success:false
    }),
    
    computed:{
        formErrors(){
            return this.errors?
            Object.values(this.errors).map((value)=>`${value.join()}`):[]
        }
    },
    methods:{
        ...mapActions('user',['signup']),
        onSubmit(e){
            if(!this.$v.$invalid){
               let {email ,password,first_name,last_name}=this
                let data={
                    email,
                    password,
                    first_name,
                    last_name
                }
                
                this.signup(data).then(res=>{
                    if(res.data&&res.data.id){
                        this.success=true
                       e.target.reset()
                       this.$v$.$reset()
                    }
                }).catch(err=>{
                    if(err.response){
                        this.errors=err.response.data
                    }
                })
            }
           
           
        }
    },
     validations:{
           first_name:{required},
           last_name:{required},
           email:{required,email},
           password:{required},
           confirm_password:{required,sameAs: sameAs('password')}
    }
    
}
</script>

<style>

</style>

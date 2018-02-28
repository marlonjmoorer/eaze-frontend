<template>
<form-wrapper header="Signup" :submit="onSubmit" >
        <b-row>
            <b-col>
                <b-form-group >
                    <b-form-input
                        placeholder="First Name"
                        required
                        v-model="first_name"
                    />
                    <div class="invalid-feedback">
                        First Name is required.
                    </div>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group >
                    <b-form-input
                        placeholder="Last Name"
                        required
                        v-model="last_name"
                    />
                    <div class="invalid-feedback">
                       Last Name is required.
                    </div>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group >
                    <b-form-input
                        type="email"
                        placeholder="Email"
                        required
                        v-model="email"
                        :state="validField('email')"
                    />
                    <div v-if="!email" class="invalid-feedback">
                       Email is required.
                    </div>
                    <div v-if="email && !validEmail" class="invalid-feedback">
                       Please enter a valid email address
                    </div>
                    <div v-if="errors" class="invalid-feedback">
                            {{errorsFor("email")[0]}}
                    </div>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group >
                    <b-form-input
                        placeholder="Password"
                        v-model="password"
                        required 
                        type="password"
                        :state="validField('password')"
                    />
                    <div v-if="!password" class="invalid-feedback">
                       Passwod is required.
                    </div>
                    <div v-if="errors" class="invalid-feedback">
                            {{errorsFor("password")[0]}}
                    </div>
                    
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group >
                    <b-form-input
                        placeholder="Confirm password"
                        required
                        type="password"
                        v-model="confirm"
                        :class="{'is-invalid':validated&&confirm!=password}"
                    />
                    <div class="invalid-feedback">
                        Passwords must match.
                    </div>
                    
                </b-form-group>
            </b-col>
        </b-row>
      
      <b-button type="submit" variant="info">Submit</b-button>
  
  <!-- Modal Component -->
  <b-modal v-model="success" modal-tile="Success" >
    <h3>You signup was successful!</h3>
     <div slot="modal-footer" class="w-100">
         <b-btn size="sm" to="/signin" class="float-right" variant="primary" @click="success=false">
           Go to Signin
         </b-btn>
    </div>
  </b-modal>
</form-wrapper>

   
</template>

<script>
import {mapActions} from 'vuex'
import FormWrapper from './FormWrapper.vue';
export default {
    extends:{...FormWrapper},
    components:{FormWrapper},
    data:()=>({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        confirm:"",
        success:false,
       
    }),
    computed:{
        validEmail:function(){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
        },
        passwordsMatch:function(){
            return this.confirm==this.password
        },
        valid:function(){
            return this.validEmail
            &&this.email
            &&this.first_name
            &&this.last_name
            &&this.password
            &&this.confirm
            &&this.passwordsMatch
        },
        

        

    },
    methods:{
        ...mapActions(['signup']),
        onSubmit(){
           
           
            if(this.valid){
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
                    }
                }).catch(err=>{
                    if(err.response.data){
                        this.errors=err.response.data
                    }
                })

            }
        }
    }

}
</script>

<style scopped>


</style>

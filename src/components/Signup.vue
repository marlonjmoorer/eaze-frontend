<template>
<div>
     <b-alert  :show="errors.length>0" 
         variant="danger" 
         dismissible
          @dismissed="errors=[]"
             >
             <ul>
                 <li v-for="err in errors" :key="err" >
                    {{err}}
                </li>
             </ul>
    </b-alert>
    <div class="wrapper" >
   
    <b-card bg-variant="dark"
            text-variant="white-text"
            header="Signup"
            header-tag="header"
            header-bg-variant="dark"
            header-text-variant="white">
   
    <b-form :validated="validated" @submit.prevent="submit" novalidate="" >
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
                    />
                    <div v-if="!email" class="invalid-feedback">
                       Email is required.
                    </div>
                    <div v-if="email && !validEmail" class="invalid-feedback">
                       Please enter a valid email address
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
                        required type="password"
                    />
                    <div class="invalid-feedback">
                       Passwod is required.
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
      
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
   </b-card>
   

  <!-- Modal Component -->
  <b-modal v-model="success" modal-tile="Success" >
    <h3>You signup was successful!</h3>
     <div slot="modal-footer" class="w-100">
         <b-btn size="sm" to="/signin" class="float-right" variant="primary" @click="success=false">
           Go to Signin
         </b-btn>
    </div>
  </b-modal>
</div>
</div>

   
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data:()=>({
        validated:false,
        
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        confirm:"",
        success:false,
        errors:[]

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
        }

    },
    methods:{
        ...mapActions(['signup']),
        submit(){
            this.validated=true
            this.errors=[]
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
                        this.errors=Object.values(err.response.data).map(e=>e[0])
                    }
                })

            }
        }
    }

}
</script>

<style scopped>
    
    .wrapper{
        height: 75vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .card{
        width: 45%;
        
    }

</style>

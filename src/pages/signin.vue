<template>
    <form-wrapper header="Signin" :submit="onSubmit" :validated="validated" >
      <b-row>
          <b-col>
              <div v-if="errors" class="text-danger">
                    {{errorsFor("non_field_errors")[0]}}
                </div>
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
        
        <b-button type="submit" variant="info">Signin</b-button>
</form-wrapper>
  

</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import FormWrapper from '@/components/FormWrapper.vue'
export default {
    extends:{...FormWrapper},
    components:{FormWrapper},
    data:()=>({
        email: '',
        password: '',
    }),
    computed:{
        ...mapGetters(['loggedIn'])
    },
    methods:{
        ...mapActions(['login']),

        onSubmit(){
            
            let {email ,password}=this
            if(email&&password){
                let data={
                    email,
                    password
                }
                this.login(data).then(()=>{
                    if(this.loggedIn){
                        this.$router.push('/') 
                    }
                }).catch(err=>{
                        if(err.response.data){
                            this.errors=err.response.data
                        }
                })  
            }
           
        }
    },
    created(){
        
    }
    
}
</script>

<style>

</style>

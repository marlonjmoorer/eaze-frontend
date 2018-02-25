<template>
  <b-container>
      <b-row>
          <b-col>
              <b-card class="mt-5" bg-variant="dark" text-variant="white" >
               <b-form @submit.prevent="submit" >
                    <b-form-group id="exampleInputGroup1"
                                    label="Username:"
                                    label-for="exampleInput1"
                                    >
                        <b-form-input id="exampleInput1"
                                    type="text"
                                    v-model="form.username"
                                    required
                                    placeholder="Username">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup2"
                                    label="Password"
                                    label-for="exampleInput2">
                        <b-form-input id="exampleInput2"
                                    type="password"
                                    v-model="form.password"
                                    required
                                    placeholder="Password">
                        </b-form-input>
                    </b-form-group>
                  
                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
                </b-card>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    data:()=>({
        form: {
            username: '',
            password: '',
      },
    }),
    computed:{
        ...mapGetters(['loggedIn'])
    },
    methods:{
        ...mapActions(['login']),
        submit(){

            console.log(this.form)
            this.login(this.form).then(()=>{
                if(this.loggedIn){
                    this.$router.push('/') 
                }
            })
        },
        checkLogin(){
            this.$router.push('Home') 
        }
    },
    
}
</script>

<style>

</style>

<template>

    <form id ="signinForm" @submit.prevent="onSubmit">
        <b-alert :show="!!(errors)" dismissible variant="danger">
            <span v-for="err in errors" :key="err">
                {{err}}
            </span>
        </b-alert>
     
        <form-field
            type="email"
            placeholder="Email"
            :model.sync="email"
            :validation="$v.email"/>
        <form-field
            type="password"
            placeholder="Password"
            :model.sync="password"
            :validation="$v.password"/>         
        <b-button type="submit" variant="info">Signin</b-button>
    </form>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { required, minLength, email } from "vuelidate/lib/validators"
import FormField from './FormField.vue';

export default {
    components:{FormField},
    validations:{
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)   
        }
    },
    data:()=>({
        errors:null,
        email: '',
        password: '',
    }),
    computed:{
        ...mapGetters("user",['loggedIn'])
    },
    methods:{
        ...mapActions("user",['login']),
        onSubmit(){
            if(!this.$v.$invalid){
                let {email ,password}=this
                let data={
                    email,
                    password
                }
                this.errors=null
                this.login(data).then(()=>{
                    if(this.loggedIn){
                        this.$router.push('/') 
                    }
                }).catch(err=>{
                        if(err.response){
                            let{ non_field_errors}=err.response.data
                            this.errors=non_field_errors
                        }
                })  
            }
           
        }
    },

    
}
</script>

<style scoped>

</style>

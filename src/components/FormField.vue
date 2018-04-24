<template>
    <b-form-group ref="field" >
        <b-form-input
            :type="type||'text'"
            :placeholder="placeholder"
            @input="handleChange"
            :state="inputState"
        />
    <b-form-invalid-feedback :key="i" v-for="(err,i) in errors" >
        {{err}}
    </b-form-invalid-feedback>
    </b-form-group>
</template>

<script>
import { parseError}from '../utils';

export default {
    props:["model","type","placeholder","validation"],
    computed:{
        inputState(){
            return !this.validation.$dirty?null: !this.validation.$error
        },
        errors(){
            return this.validation.$flattenParams().map(e=>{
                if(!this.validation[e.name])    
                  return parseError(e)
            })
        }
    },
    methods:{
        handleChange(value){
            console.log(value)
            this.validation.$touch()
            this.$emit('update:model',value)
        }
    },
    mounted(){
        console.log(this.validation)
       const {$el}=this.$refs.field
       const form= $el.closest('form')
       if(form){
           form.addEventListener("submit", (e)=>{
               e.preventDefault();
               
                this.validation.$touch()
            });
       }
    }
}
</script>

<style>

</style>

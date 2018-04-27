<template>
    <b-form-group ref="field" :label="label" >
        <component :is="element"
            :type="type||'text'"
            :placeholder="placeholder"
            @input="handleChange"
            :state="inputState"
            :value="model"
            :rows="3"
            :max-rows="6"
        />
    <b-form-invalid-feedback :key="i" v-for="(err,i) in errors" >
        {{err}}
    </b-form-invalid-feedback>
    </b-form-group>
</template>

<script>
import { parseError}from '../utils';

export default {
    props:["model","type","placeholder","validation","label"],
    computed:{
        inputState(){
            return this.validation?!this.validation.$dirty?null: !this.validation.$error:null
        },
        errors(){
            return this.validation?this.validation.$flattenParams().map(e=>{
                if(!this.validation[e.name])    
                  return parseError(e)
            }):[]
        },
        element(){
            switch(this.type){
                case "textarea":
                    return"b-form-textarea"
                default:
                   return "b-form-input"
            }
            return "div"
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

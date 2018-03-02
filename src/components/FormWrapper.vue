<template>
   <div class="wrapper" >
        <b-card bg-variant="white"
            text-variant="white-text"
            :header="header"
            header-tag="header"
            header-bg-variant="info"
            header-text-variant="white">
        <b-form :validated="validated" @submit.prevent="setSubmitted" novalidate="" >
       <slot>
          
       </slot>
        </b-form>
       </b-card>
   </div>
</template>

<script>
export default {
    props:["header","submit"],
    data:()=>({
        validated:false,
         errors:null,
        
    }),
    methods:{
        errorsFor(key){
            if(this.errors&&this.errors[key]){
                return this.errors[key]
            }else{
                return []
            }
        },
        validField(key){
           return !this.validated ? '':!(this.errors&&this.errors[key])
        },
        setSubmitted(){
            this.validated=true
            this.errors=null
            this.submit()
        }
    }

}
</script>

<style scoped>
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

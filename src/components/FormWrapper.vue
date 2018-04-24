
<script>
export default {
    data:()=>({
        validated:false,
         errors:null,
    }),
    methods:{
        hasErrors(key){
            return this.errors&& key in this.errors
        },
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
        }
    }

}
</script>


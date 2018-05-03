import decode from 'jwt-decode'

const checkAuth=(loggedIn,url)=>{
    console.log("url",url)
    console.log("loggedIn",loggedIn)

   var cases=[]
   if (!loggedIn) {
       cases=[
           ///^\/profile/,
           /^\/post\/(.*)\/(edit|preview)/
       ]
   }else{
       cases=[
           /^\/signup/,
       ]
   }
   return cases.reduce((redirect,reg)=>{
       console.log(url,"matches :", (reg.test(url)||redirect))
       return reg.test(url)||redirect
   },false) 
}
//Validate helpers
const errorMessages={
    email:"Must be valid email",
    required:"This field is required",
    "url":"Invalid url"
}
const parseError=(error)=>{
    const {name, params}= error
    switch(name)
     {
           case 'sameAs':
                return `Must be same as ${params.eq}`
            case 'minLength':
                return `This field requires a minimal lenght of ${params.min}`
            default:
               return errorMessages[name]
     }
}

const isTokenExpired=(token)=>{
    console.log(decode(token))
    decode(token).exp < new Date().getTime()
}

export {checkAuth,parseError,isTokenExpired}
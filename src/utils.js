const checkAuth=(loggedIn,url)=>{
    console.log("url",url)
    console.log("loggedIn",loggedIn)

   var cases=[]
   if (!loggedIn) {
       cases=[
           /^\/profile/,
           /^\/post\/(.*)\/(edit|preview)/
       ]
   }else{
       cases=[
           /^\/signup/,
       ]
   }
   var r= cases.reduce((redirect,reg)=>{
       console.log(url,"matches :", (reg.test(url)||redirect))
       return reg.test(url)||redirect
   },false) 
   console.log(r)
   return r
}
export {checkAuth}
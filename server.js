const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const {Builder,Nuxt}= require('nuxt')
const hostile = require('hostile');
const servers = require('reverse-proxy-mapping');
let app = express();
app.use(serveStatic(__dirname));

const port = process.env.PORT || 5000;
const host = process.env.HOST ||'dev.eaze.com'||'127.0.0.1'


//process.env.NODE_ENV = 'production';
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)


app.use(nuxt.render)
app.listen(port,async()=>{

  if (config.dev) {
     await new Builder(nuxt).build()
  }
  hostile.set('127.0.0.1',host,()=>{
    servers.add(80,{
      [host]: `http://127.0.0.1:${port}`,
    })
    servers.startAll()
    console.log(`Server is listening on http://${host}`)
  })
})



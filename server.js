const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const {Builder,Nuxt}= require('nuxt')
let app = express();
app.use(serveStatic(__dirname));

const port = process.env.PORT || 5000;
const host = process.env.HOST || '127.0.0.1'


//process.env.NODE_ENV = 'production';
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)


app.use(nuxt.render)
app.listen(port,async()=>{

  if (config.dev) {
   await new Builder(nuxt).build()
  }
  console.log(`Server is listening on http://${host}:${port}`)
})

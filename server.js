const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const {Builder,Nuxt}= require('nuxt')
let app = express();
app.use(serveStatic(__dirname));

const port = process.env.PORT || 5000;
const host = process.env.HOST || '127.0.0.1'

let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)
app.listen(port,host,()=>
console.log('Server is listening on http://localhost:5000'))

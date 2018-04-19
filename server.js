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

// if (config.dev) {
//   const builder = new Builder(nuxt)
//   builder.build()
// }
const isProd = process.env.NODE_ENV === 'production'

const promise = (isProd ? Promise.resolve() :  new Builder(nuxt).build())
promise.then(() => {
  app.use(nuxt.render)
  app.listen(5000)
  console.log('Server is listening on http://localhost:5000')
}).catch((error) => {
  console.error(error)
  process.exit(1)
})
// app.use(nuxt.render)

// app.listen(port,host, () => {
//   console.log('Listening on port ' + port)
// });
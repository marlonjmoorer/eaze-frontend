const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
module.exports = {
    srcDir: 'src/',
    buildDir: 'dist',
    plugins: [
        {src:'~/plugins/storage.js',ssr:false},
        {src:'~/plugins/vendor.js',ssr:false},
        {src:'~/plugins/bootstrap.js'},
        {src:'~/plugins/api.js'}
    ],
    css: [
        'bootstrap/dist/css/bootstrap.css',
        'bootstrap-vue/dist/bootstrap-vue.css',
        'froala-editor/css/froala_editor.pkgd.min.css',
        'froala-editor/css/froala_style.min.css',
        'font-awesome/css/font-awesome.css'
       
    ],
    build:{
        extend (config, { isClient,isServer }) {
            // Extend only webpack config for client-bundle
            if (isClient) {
               config.resolve.alias['vue'] = 'vue/dist/vue.common'
               config.plugins.push(
                new webpack.ProvidePlugin({
                  $: "jquery",
                  jQuery: "jquery"
                }))
            }
            if (isServer) {
                config.externals = [
                  nodeExternals({
                    whitelist: [
                      //  /^vue/,
                        /^bootstrap-vue/,
                      
                    ]
                  })
                ]
              }
        }
    },
    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:8000'
    }
    // render: {
    //     bundleRenderer: {
    //       shouldPreload: (file, type) => {
    //         return ['script', 'style', 'font'].includes(type)
    //       }
    //     }
    // }
}
module.exports = {
    srcDir: 'src/',
    plugins: [
        {src:'~/plugins/storage.js',ssr:false},
        {src:'~/plugins/vendor.js',ssr:false},
    ],
    css: [
        'bootstrap/dist/css/bootstrap.css',
        'bootstrap-vue/dist/bootstrap-vue.css',
    ],
    build:{
        extend (config, { isClient }) {
            // Extend only webpack config for client-bundle
            if (isClient) {
              console.log(config)
              config.resolve.alias['vue'] = 'vue/dist/vue.common'
            }
        }
    }
    // render: {
    //     bundleRenderer: {
    //       shouldPreload: (file, type) => {
    //         return ['script', 'style', 'font'].includes(type)
    //       }
    //     }
    // }
}
module.exports = {
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('styl').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('stylus-resources-loader')
                .loader('stylus-resources-loader')
                .options({
                    // Provide path to the file with resources（这里是你.scss文件所在路径）
                    resources: './static/css/*.styl',
                })
                .end()
        })
    }
}
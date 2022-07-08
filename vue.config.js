const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  devServer: {
    proxy: {
      "^/tiles": {
        target: "http://localhost:8090"
      },
      "^/data": {
        target: "http://localhost:8080"
      },
      "^fonts": {
        target: "http://localhost:8080"
      }
    }
  }
})

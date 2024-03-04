const { defineConfig } = require('@vue/cli-service')
export default defineConfig({
 transpileDependencies: true,
 
// 关闭eslint校验
 lintOnSave: false,
////配置代理跨域
 devServer: {
 proxy: {
'/api': {
 target:'http://127.0.0.1:4523/m1/2651493-0-default',
 
 changeOrigin:true
 },
 },
},
})
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
import router from './router'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.directive('int', {
  inserted(el) {
    el.addEventListener('input', event => {
      console.log(event);
      
      const value = event.target.value;
      event.target.value = value.replace(/\D/g, ''); // 只保留数字
    });
  }
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  const tok = sessionStorage.getItem("tok")
 
  //tooken为要获取的cookie的属性名称
  if(!token && to.name!=='login'&&to.name!='wu') //如果token不存在，说明当前用户未登录，应该跳到登录页
  {
  next({name:'login'}) //这貌似也是一种跳转路由的方法
  }
 else if(token && to.name ==='login'&&!tok){  //token存在,说明用户登录，此时跳转至首页
  next({name:'admin'})}
 else if(token && to.name ==='login'&&tok){  //token存在,说明用户登录，此时跳转至首页
  next({name:'trea'})}
 else if(tok&&token&&to.name==='admin'||tok&&token&&to.name==='xiaoyou'||tok&&token&&to.name==='guanli'||tok&&token&&to.name==='user'||tok&&token&&to.name==='center'||tok&&token&&to.name==="tree"){}
 else if(token&&to.name==='trea'&&!tok){
  next()
 }
 else{
  next();
 }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

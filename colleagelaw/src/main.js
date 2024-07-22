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
      event.target.value = value.replace(/\D/g, ''); 
    });
  }
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  const tok = sessionStorage.getItem("tok")


  if (!token && to.name !== 'login' && to.name != 'wu') 
  {
    next({ name: 'login' }) 
  }
  else if (token && to.name === 'login' && !tok) {  
    next({ name: 'admin' })
  }
  else if (token && to.name === 'login' && tok) {  
    next({ name: 'trea' })
  }
  else if (tok && token && to.name === 'admin' || tok && token && to.name === 'xiaoyou' || tok && token && to.name === 'guanli' || tok && token && to.name === 'user' || tok && token && to.name === 'center' || tok && token && to.name === "tree") { }
  else if (token && to.name === 'trea' && !tok) {
    next()
  }
  else {
    next();
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

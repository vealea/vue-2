import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    networkSuccess: true //是否断网
  },
  mutations: {
    changeNetworkSuccess(state,val){ //改变状态
      state.networkSuccess = val
    }
  },
  actions: {

  }
})



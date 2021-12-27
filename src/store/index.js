import 'es6-promise/auto'
import { createStore } from 'vuex'
import * as user from '@/store/modules/user.js'
const store = createStore({
  
 /* 
    getPosts: ({commit}) => {
      return new Promise((resolve, reject) => {
        commit;
        instance.get('/post')
        .then(function(response) {
          commit('setStatus', '')
          resolve(response)
        })
        .catch(function(error) {
          commit('setStatus', 'error_posts')
          reject(error)
        })
      })
    }
  },*/
  modules: {
    user
  }
})


export default store
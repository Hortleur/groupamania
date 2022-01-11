import 'es6-promise/auto'
import { createStore } from 'vuex'
import * as user from '@/store/modules/user.js'
const store = createStore({
  modules: {
    user
  }
})


export default store
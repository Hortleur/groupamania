import 'es6-promise/auto'
import { createStore } from 'vuex'
import * as user from '@/store/modules/user.js'
import post from './modules/post'
const store = createStore({
  modules: {
    user,
    post
  }
})


export default store
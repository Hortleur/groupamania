import { createStore } from 'vuex'

const axios = require('axios');
const instance = axios.create({
  baseURL: "http://localhost:3000/api/auth"
})

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    createAccount: ({commit}, userInfo) => {
      commit;
      instance.post('/signup', userInfo)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  modules: {
  }
})

import 'es6-promise/auto'
import { createStore } from 'vuex'

const axios = require('axios');
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
  }
})


const store = createStore({
  state: {
    status:'',
    user:{
      id: -1,
      token:''
    }
  },
  mutations: {
    setStatus: function(state, status){
      state.status = status
    },
    logUser: function(state, user){
      state.user = user
    }
  },
  actions: {
    login: ({commit}, userInfo) => {
      return new Promise((resolve, reject) => {
        commit('setStatus');
        instance.post('/login', userInfo)
        .then(function (response) {
          commit('setStatus', '');
          commit('logUser', response.data)
        resolve(response);
      })
      .catch(function (error) {
        commit('setStatus', 'error_log');
        reject(error);
      })
    })},
    createAccount: ({commit}, userInfo) => {
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/signup', userInfo)
        .then(function (response) {
          commit('setStatus', 'created');
        resolve(response);
      })
      .catch(function (error) {
        commit('setStatus', 'error_create');
        reject(error);
      })
    })},
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
  },
  modules: {
  }
})


export default store
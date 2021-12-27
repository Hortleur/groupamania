const axios = require('axios');
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
  }
})

export const state = {
    status:'',
    user:{
      id: -1,
      token:''
    }
}

export const mutations = {
    setStatus: function(state, status){
      state.status = status
    },
    logUser: function(state, user){
      state.user = user
    }
  }

export const actions = {
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
    })}
}
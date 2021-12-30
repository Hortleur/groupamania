const axios = require('axios')

const state = {
    posts:[],
};

const getters = {
    allPosts: state => state.posts,
};

const actions = {
    async fetchPosts({ commit }) {
        const res = await axios.get('http://localhost:3000/api/post', {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
              }
        })
        commit('setPosts', res.data.data)
    },
};

const mutations = {
    setPosts: (state, posts) => (state.posts = posts),
};

export default {
    state,
    getters,
    actions,
    mutations
}
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    music:{
        title: '比较幸福',
        artist: '董又霖',
        src:'https://music.163.com/song/media/outer/url?id=924680166.mp3'
    },
    userid:'2047254383'
  },
  mutations: {
    setMusic(state, payload) {
      state.music = payload
    },
    setUserid(state, payload) {
      state.userid = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

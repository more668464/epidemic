import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import userManage from './modules/userManage'
import hospital from './modules/hospital'
import category from './modules/category'
import article from './modules/article'
import epidemic from './modules/epidemic'
import role from './modules/role'
import privilege from './modules/privilege'




Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    //注册子仓库
    userManage,
    hospital,
    category,
    article,
    epidemic,
    role,
    privilege
  },
  getters
})

export default store

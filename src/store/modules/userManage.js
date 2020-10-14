import { pageQuery, deleteById, saveOrUpdate } from '@/api/userManage';
import { Notification } from 'element-ui';

export default {
    namespaced: true,
    state: {
        userTotalData: { list: [], total: 0 },
    },
    getters: {
        userData: state => state.userTotalData.list,
        total: state => state.userTotalData.total
    },
    mutations: {
        change_userTotalData(state, data) {
            state.userTotalData = data
        }
    },
    actions: {
        async pageQuery({ commit }, data) {
            let res = await pageQuery(data);
            if ('username' in data) {
                commit('change_userTotalData', res.data)
            }
        },
        //删除
        async deleteById({ commit, dispatch, state }, data) {
            let res = await deleteById({ id: data.id })
            if (res.status == 200) {
                Notification({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                })
            };
            dispatch('pageQuery', data.param)
        },
        //保存
        async saveOrUpdate({ dispatch }, data) {
            let res = await saveOrUpdate(data);
        }
    }
}
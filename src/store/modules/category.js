import { findAll, deleteById, saveOrUpdate } from '@/api/category';
import { Notification } from 'element-ui';

export default {
    namespaced: true,
    state: {
        categoryAll: [],
    },
    getters: {
        categoryAll: state => state.categoryAll,
    },
    mutations: {
        change_categoryAll(state, data) {
            state.categoryAll = data
        }
    },
    actions: {
        //分页
        async findAll({ commit }, data) {
            let res = await findAll(data);
            commit('change_categoryAll', res.data)

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
            dispatch('findAll', data.param)
        },
        //保存
        async saveOrUpdate({ dispatch }, data) {
            let res = await saveOrUpdate(data);
        }
    }
}
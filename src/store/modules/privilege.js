import { findAll, deleteById, saveOrUpdate } from '@/api//privilege';
import { Notification } from 'element-ui';

export default {
    namespaced: true,
    state: {
        privilegeData: [],
    },
    getters: {
        privilegeData: state => state.privilegeData
    },
    mutations: {
        change_PrivilegeData(state, data) {
            state.privilegeData = data
        }
    },
    actions: {
        //分页
        async findAll({ commit }) {
            let res = await findAll();
            commit('change_PrivilegeData', res.data)

        },

        async deleteById({ dispatch }, data) {
            let res = await deleteById({ id: data })
            if (res.status == 200) {
                Notification({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                })
            };
            dispatch('findAll')
        },

        async saveOrUpdate({ dispatch }, data) {
            let res = await saveOrUpdate(data);
            dispatch('findAll')
        }

    }
}
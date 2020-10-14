import { findAll, deleteById, saveOrUpdate } from '@/api/role';
import { Notification } from 'element-ui';


export default {
    namespaced: true,
    state: {
        rolelData: [],
    },
    getters: {
        rolelData: state => state.rolelData
    },
    mutations: {
        change_RolelData(state, data) {
            state.rolelData = data
        }
    },
    actions: {
        //分页
        async findAll({ commit }) {
            let res = await findAll();
            commit('change_RolelData', res.data)
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
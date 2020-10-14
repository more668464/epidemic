import { pageQuery, deleteById, saveOrUpdate } from '@/api/epidemic';
import { Notification } from 'element-ui';


export default {
    namespaced: true,
    state: {
        epidemicTotalData: { list: [], total: 0 },
    },
    getters: {
        epidemicData: state => state.epidemicTotalData.list,
        total: state => state.epidemicTotalData.total
    },
    mutations: {
        change_epidemicTotalData(state, data) {
            state.epidemicTotalData = data
        }
    },
    actions: {
        //分页
        async pageQuery({ commit }, data) {
            let res = await pageQuery(data);
            commit('change_epidemicTotalData', res.data)

        },
        //删除
        async deleteById({ dispatch }, data) {
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
import { pageQuery, deleteById, saveOrUpdate } from '@/api/hospital';
import { Notification } from 'element-ui';

export default {
    namespaced: true,
    state: {
        hospitalTotalData: { list: [], total: 0 },
    },
    getters: {
        hospitalData: state => state.hospitalTotalData.list,
        total: state => state.hospitalTotalData.total
    },
    mutations: {
        change_hospitalTotalData(state, data) {
            state.hospitalTotalData = data
        }
    },
    actions: {
        //分页
        async pageQuery({ commit }, data) {
            let res = await pageQuery(data);
            commit('change_hospitalTotalData', res.data)

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
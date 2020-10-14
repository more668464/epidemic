import { pageQuery, deleteById, saveOrUpdate } from '@/api/article';
import { Notification } from 'element-ui';

export default {
    namespaced: true,
    state: {
        articleTotalData: { list: [], total: 0 },
    },
    getters: {
        articleData: state => state.articleTotalData.list,
        total: state => state.articleTotalData.total
    },
    mutations: {
        change_articleTotalData(state, data) {
            state.articleTotalData = data
        }
    },
    actions: {
        //分页
        async pageQuery({ commit }, data) {
            let res = await pageQuery(data);
            commit('change_articleTotalData', res.data)

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
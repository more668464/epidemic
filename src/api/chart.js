import axios from "@/utils/request"

//分页
export function pageQuery(params) {
    return axios.get('/article/pageQuery', { params })
}
//新增
export function saveOrUpdate(params) {
    return axios.post('/article/saveOrUpdate', params)
}
// 删除
export function deleteById(params) {
    return axios.get('/article/deleteById', { params })
}
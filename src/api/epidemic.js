import axios from "@/utils/request"

//分页
export function pageQuery(params) {
    return axios.get('/epidemic/pageQuery', { params })
}
//新增
export function saveOrUpdate(params) {
    return axios.post('/epidemic/saveOrUpdate', params)
}
// 删除
export function deleteById(params) {
    return axios.get('/epidemic/deleteById', { params })
}
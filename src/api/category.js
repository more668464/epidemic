import axios from "@/utils/request"

//分页
export function findAll(params) {
    return axios.get('/category/findAll', { params })
}
//新增
export function saveOrUpdate(params) {
    return axios.post('/category/saveOrUpdate', params)
}
// 删除
export function deleteById(params) {
    return axios.get('/category/deleteById', { params })
}
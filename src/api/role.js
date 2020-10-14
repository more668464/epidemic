import axios from '@/utils/request'
// 查找所有
export function findAll() {
    return axios.get('/role/findAll')
}
export function deleteById(params) {
    return axios.get('/role/deleteById', { params })
}

export function saveOrUpdate(params) {
    return axios.post('/role/saveOrUpdate', params)
}
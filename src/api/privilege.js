import axios from '@/utils/request'
// 查找所有
export function findAll() {
    return axios.get('/privilege/findAll')
}
export function deleteById(params) {
    return axios.delete('/privilege/deleteById', { params })
}

export function saveOrUpdate(params) {
    return axios.post('/privilege/saveOrUpdate', params)
}
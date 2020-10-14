//封装所有的api
import request from '@/utils/request'
export function pageQuery(params) {
    return request({
        url: '/baseUser/pageQuery',
        method: 'get',
        //axios get带参到params
        params

    })
}
export function deleteById(params) {
    return request({
        url: '/baseUser/deleteById',
        method: 'get',
        //axios get带参到params
        params

    })
}
export function saveOrUpdate(data) {
    return request({
        url: '/baseUser/saveOrUpdate',
        method: 'post',
        //axios post带参到data  
        data
    })
}
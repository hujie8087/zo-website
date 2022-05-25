import request from '../utils/request';

export const fetchData = (query) => {
    return request({
        url: './news',
        method: 'get',
        params: query,
    });
};
export const fetchLogin = (query) => {
    return request({
        url: './api/login',
        method: 'post',
        data: query,
    });
};
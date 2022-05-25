import request from '../utils/request';

export const fetchData = (query) => {
    return request({
        url: './api/getProducts',
        method: 'get',
        params: query,
    });
};
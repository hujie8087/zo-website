import Vue from 'vue'
import axios from 'axios'

const service = axios.create({
  timeout: 5000,
  baseURL: '/api',
})
service.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    console.log(err)
  }
)

service.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

Vue.prototype.$http = service

export const http = service

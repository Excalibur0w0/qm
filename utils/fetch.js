const axios = require('axios')
const api = require('../config/api')

const baseUrl = api.corsApi + api.baseApi

const service = axios.create({
  baseURL: baseUrl
  // timeout: 6000,                  // 请求超时时间
})

service.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else return response
  }
  ,
  error => {
    console.log(error)
    return false
  }
)

module.exports = service

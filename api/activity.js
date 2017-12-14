const fetch = require('../utils/fetch')

exports.load = (params) => {
  return fetch.get('/activity/list', { params: params })
}

exports.getNewById = (params) => {
  return fetch.get('/activity/info', { params: params })
} 

exports.joinActivity = (params) => {
  return fetch({
    url: '/joins/add',
    method: 'post',
    data: params
  })
}
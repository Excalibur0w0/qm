const fetch = require('axios')

exports.SendMsg = (params) => {
  return fetch({
    url: 'https://api.mysubmail.com/message/xsend.json',
    method: 'post',
    data: params
  })
}
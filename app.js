const activitySev = require('./api/activity')
const baseInfo = require('./config/base')
const sendSev = require('./api/send')

let oks = [] //已经存在的活动

const getActivities = () => {
  return new Promise((reslove, reject) => {
    activitySev.load({status: 1, page: 1}).then(res => {
      console.log(res)
      if (res.code === 200) {
        console.log('执行中...' + new Date())
        reslove(res.data)
      } else reject(res)
    })
  })
}

setInterval(async () => {
  let activies = await getActivities()
  let canActivies = []
  let commonParams = {
    role: '',
    is_leave: '2'
  }
  
  if (activies.length > 0) {
    canActivies = Array.of()
    for (let index in activies) {
      if (activies[index].id > baseInfo.last) {
        let isCan = true
        for (let i in oks) {
          if (!oks) {
            canActivies.push(activies[index])
            return
          }
          if (oks[i].id === activies[index].id) {
            isCan = false
            break
          }
        }
        if (isCan) canActivies.push(activies[index])
        else continue
      }
    }
    let stus = baseInfo.stus
    for (let i = 0; i < canActivies.length; i++){
      for (let index in stus) {
        sendSev.SendMsg({
          appid: 16885,
          to: stus[index].mobile,
          project: 'pKCE33',
          vars: {"title": canActivies[i].subject, "time": ':' + canActivies[i].created},
          signature: '56de976ca469a194b138fcd00df0d5ed'}
        )
      }
      oks.push(canActivies[i])
    }
  } else console.log('执行中...' + new Date())
}, 500)
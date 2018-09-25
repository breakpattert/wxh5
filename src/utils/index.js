function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export default class Utils {
  static formatTime (date) {
    date = new Date(parseInt(date))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    // const hour = date.getHours()
    // const minute = date.getMinutes()
    // const second = date.getSeconds()
    const t1 = [year, month, day].map(formatNumber).join('/')
    // const t2 = [hour, minute, second].map(formatNumber).join(':')
    // console.log(`${t1} ${t2}`)
    return `${t1}`
  }
  static tabbarinit () {
    return [
      {
        'current': 0,
        pagePath: '/pages/home/home',
        text: '首页',
        iconPath: '/static/images/icon_index_default.png',
        selectedIconPath: '/static/images/icon_index.png'
      },
      {
        'current': 0,
        pagePath: '/pages/nearly/nearly',
        text: '附近',
        iconPath: '/static/images/icon_nearby_default.png',
        selectedIconPath: '/static/images/icon_nearby.png'
      },
      // {
      //   'current': 0,
      //   pagePath: '/pages/user/user',
      //   text: '国粉',
      //   iconPath: '/static/images/icon_fans_default.png',
      //   selectedIconPath: '/static/images/icon_fans.png'
      // },
      {
        'current': 0,
        pagePath: '/pages/news/news',
        text: '消息',
        iconPath: '/static/images/icon_news_default.png',
        selectedIconPath: '/static/images/icon_newss.png'
      },
      {
        'current': 0,
        pagePath: '/pages/user/user',
        text: '我的',
        iconPath: '/static/images/icon_mine_default.png',
        selectedIconPath: '/static/images/icon_mine.png'
      }
    ]
  }

  static PromiseAll (...restArgs) {
    return new Promise((resolve, reject) => {
      Promise.all(restArgs).then((results) => {
        resolve(results)
      })
    })
  }
}

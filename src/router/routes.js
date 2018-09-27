module.exports = [

  {
    alias: '/',
    path: '/pages/home/home',
    name: 'home',
    meta: {
      nav: true
    }
  },
  {
    path: '/pages/nearly/nearly',
    name: 'nearly',
    meta: {
      nav: true
    },
    config: {
      navigationBarTitleText: '附近',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/nearly/bigSale',
    name: 'bigSale',
    config: {
      navigationBarTitleText: '大牌促销',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/user/user',
    name: 'user',
    meta: {
      nav: true
    },
    config: {
      navigationBarTitleText: '我的',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/user/userInfo',
    name: 'userInfo',
    config: {
      navigationBarTitleText: '个人信息',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/user/myPay',
    name: 'myPay',
    config: {
      navigationBarTitleText: '待付款',
      enablePullDownRefresh: false
    }
  },

  {
    path: '/pages/user/myOrder',
    name: 'myOrder',
    config: {
      navigationBarTitleText: '我的订单',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/user/myLike',
    name: 'myLike',
    config: {
      navigationBarTitleText: '我的收藏'
    }
  },
  {
    path: '/pages/user/myFooter',
    name: 'myFooter',
    config: {
      navigationBarTitleText: '我的足迹'
    }
  },
  {
    path: '/pages/user/myPublish',
    name: 'myPublish',
    config: {
      navigationBarTitleText: '我的发布'
    }
  },
  {
    path: '/pages/user/myFocus',
    name: 'myFocus',
    config: {
      navigationBarTitleText: '我的关注'
    }
  },
  {
    path: '/pages/user/myMsg',
    name: 'myMsg',
    meta: {
      nav: true
    },
    config: {
      navigationBarTitleText: '我的消息'
    }
  },
  {
    path: '/pages/user/myAdress',
    name: 'myAdress',
    config: {
      navigationBarTitleText: '地址管理'
    }
  },
  {
    path: '/pages/user/myCar',
    name: 'myCar',
    config: {
      navigationBarTitleText: '购物车'
    }
  },
  {
    path: '/pages/login/loginIndex',
    name: 'loginIndex',
    config: {
      navigationBarTitleText: '天天逛街',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/login/login',
    name: 'login',
    config: {
      navigationBarTitleText: '登录',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/login/loginPhone',
    name: 'loginPhone',
    config: {
      navigationBarTitleText: '手机快捷登录',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/login/register',
    name: 'register',
    config: {
      navigationBarTitleText: '手机注册',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/login/bindPhone',
    name: 'bindPhone',
    config: {
      navigationBarTitleText: '手机号绑定',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/login/goAuth',
    name: 'goAuth',
    config: {
      navigationBarTitleText: '天天逛街',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/news/news',
    name: 'news',
    config: {
      navigationBarTitleText: '消息',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/goodsDetail/index',
    name: 'goodsDetail',
    config: {
      navigationBarTitleText: '商品详情',
      enablePullDownRefresh: false
    }
  },

  {
    path: '/pages/goodsDetail/goodsDetailRate',
    name: 'goodsDetailRate',
    config: {
      navigationBarTitleText: '商品评价',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/home/GoCity',
    name: 'GoCity',
    config: {
      enablePullDownRefresh: false
    }
  },
  {

    path: '/pages/busineshop/shop',
    name: 'shop',
    config: {
      navigationBarTitleText: '店铺详情',
      enablePullDownRefresh: false
    }

  },
  {
    path: '/pages/user/orderdetil',
    name: 'orderdetil',
    config: {
      navigationBarTitleText: '订单详情',
      enablePullDownRefresh: false,
      usingComponents: {
      }
    }
  },
  {
    path: '/pages/voucher/voucher',
    name: 'voucher',
    config: {
      navigationBarTitleText: '我的券包',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/searchshop/searchShop',
    name: 'searchShop',
    config: {
      navigationBarTitleText: '天天逛街',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/searchshop/searchresult',
    name: 'searchresult',
    config: {
      navigationBarTitleText: '天天逛街',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/busineshop/shoplist',
    name: 'shoplist',
    config: {
      navigationBarTitleText: '本周逛哪·万象城',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/user/editAdress',
    name: 'editAdress',
    config: {
      navigationBarTitleText: '编辑地址',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/user/map',
    name: 'map',
    config: {
      navigationBarTitleText: '店铺地址',
      enablePullDownRefresh: false
    }

  },
  // {
  //   path: '/pages/voucher/two_dimension',
  //   name: '卡券二维码',
  //   config: {
  //     navigationBarTitleText: '卡券二维码',
  //     enablePullDownRefresh: false,
  //     usingComponents: {
  //     }
  //   }
  // },
  {
    path: '/pages/news/newsdetil',
    name: 'newsdetil',
    config: {
      navigationBarTitleText: '消息详情',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/recommend/recommendone',
    name: 'recommendone',
    config: {
      navigationBarTitleText: '天天逛街'
    }
  },
  {
    path: '/pages/user/setting',
    name: 'setting',
    config: {
      navigationBarTitleText: '系统设置'
    }
  },
  {
    path: '/pages/login/userProtect',
    name: 'userProtect',
    config: {
      navigationBarTitleText: '天天逛街用户协议',
      enablePullDownRefresh: false
    }
  }

]

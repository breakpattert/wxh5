import { MessageBox, Toast, Indicator } from 'mint-ui'
/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor () {
    this.isLoading = false
  }
  /**
   * 弹出提示框
   */

  // static success (title, duration = 500) {
  //   setTimeout(() => {
  //     wx.showToast({
  //       title: title,
  //       icon: 'success',
  //       mask: true,
  //       duration: duration
  //     })
  //   }, 300)
  //   if (duration > 0) {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve()
  //       }, duration)
  //     })
  //   }
  // }

  /**
   * 弹出确认窗口
   */
  static confirm (message, title = '提示') {
    return new Promise((resolve, reject) => {
      MessageBox.confirm(message, title).then(res => {
        if (res === 1) {
          resolve('confirm')
        } else {
          resolve('cancel')
        }
      })
    })
  }

  static toast (message, onHide, iconClass = 'icon icon-success', duration = 500) {
    setTimeout(() => {
      Toast({
        message,
        position: 'middle',
        iconClass,
        duration
      })
    }, 300)

    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 500)
    }
  }
  /**
   * 弹出加载提示
   */
  static loading (text = '加载中...') {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    Indicator.open({
      text,
      spinnerType: 'fading-circle'
    })
  }

  /**
   * 加载完毕
   */
  static loaded () {
    if (Tips.isLoading) {
      Tips.isLoading = false
      Indicator.close()
    }
  }

  // static share (title, url, desc) {
  //   return {
  //     title: title,
  //     path: url,
  //     desc: desc,
  //     success: function (res) {
  //       Tips.toast('分享成功')
  //     }
  //   }
  // }

  static alert (message, title = '提示') {
    let Text = typeof message === 'object' ? JSON.stringify(message) : message
    if (!Text) {
      return
    }
    MessageBox.alert(message, title).then(res => {
      console.log(res)
    })
  };
}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false

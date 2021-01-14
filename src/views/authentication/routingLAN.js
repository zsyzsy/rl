import { Dialog } from 'vant'

export default function initialization(router) {
  router.beforeEach((to, from, next) => {
    const tokenId = sessionStorage.getItem('tokenId')
    if (tokenId && tokenId !== 'undefined') {
      if (to.query.tokenId) {
        // sessionStorage.setItem('orderId', to.query.orderId)
        // sessionStorage.setItem('faceType', to.query.faceType)
        sessionStorage.setItem('tokenId', to.query.tokenId)
      }
      next()
    } else if (to.query.tokenId) {
      // sessionStorage.setItem('orderId', to.query.orderId)
      // sessionStorage.setItem('faceType', to.query.faceType)
      sessionStorage.setItem('tokenId', to.query.tokenId)
      next()
    } else {
      Dialog.alert({
        title: '温馨提示',
        message: '用户凭证失效'
      })
      next(false)
    }
  })
}


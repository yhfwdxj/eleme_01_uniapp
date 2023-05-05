// const baseUrl = 'http://localhost:8001/'
const baseUrl = 'https://elm.cangdu.org/'

export const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + options.url,
      method: options.method || 'get',
      data: options.data || {},
      header: options.header || {},
      withCredentials: true,
      success: (res) => {
        return resolve(res.data)
      },
      fail(err) {
        return reject('err')
      },
      complete: () => {
        uni.hideToast()
      }
    })
  })
}
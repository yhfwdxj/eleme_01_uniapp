const baseUrl = 'https://elm.cangdu.org/v2/'

export const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + options.url,
      method: 'get' || options.method,
      data: options.data || {},
      header: options.header || {},
      success: (res) => {
        return resolve(res.data)
      },
      fail(err) {
        return reject('err')
      }
    })
  })
}

import Mock from 'better-mock/dist/mock.mp'

Mock.mock('/mock/login', 'post', (data) => {
  let {
    username,
    password
  } = data.body
  if (password !== '123456') {
    return {
      code: '400',
      message: '密码错误'
    }
  } else {
    return Mock.mock({
      code: '200',
      message: '登录成功',
      username,
      'user_id|10000-100000': 1,
      avatar: '/img/default/default.jpg"',
      'money|1-100.2': 1,
      'card|1-10': 1,
      'envelope|1-10': 1
    })
  }
})


//"/img/default/default.jpg"
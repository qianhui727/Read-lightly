import axios from '../utils/request'
import md5 from 'md5'

// 登录
export const $login = async (params) => {
  // 密码加密传输
  params.password = md5(md5(params.password).split('').reverse().join(''))

  // api接口获取数据
  let { data } = await axios({
    url: 'http://127.0.0.1:7100/news_latest',
    type: "get"
  })
  // let { data } = await axios.get('adminApi/Login', { params })
  // console.log(data);
  if (data.success) {
    // 在浏览器缓存中存储token,登录成功后的每一次请求头都会带有token
    sessionStorage.setItem('token', data.token);
  }
  return data;
}
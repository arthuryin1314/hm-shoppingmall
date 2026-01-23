import request from '@/utils/request'

export const getPicCode = () => {
  return request.get('http://smart-shop.itheima.net/index.php?s=/api/captcha/image')
}
export const sendSmsCode = (captchaCode, captchaKey, mobile) => {
  return request.post('http://smart-shop.itheima.net/index.php?s=/api/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}
export const login = (mobile, smsCode) => {
  return request.post('http://smart-shop.itheima.net/index.php?s=/api/passport/login', {
    form: { // 关键：新增 form 外层包裹
      isParty: false,
      partyData: {},
      mobile, // 等价于 mobile: mobile
      smsCode // 等价于 smsCode: smsCode
    }
  })
}

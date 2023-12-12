import $http from "@/api/requestBase.js"

const api = {
	//账号密码登录
	login:"api/v1/login",
	//验证码登录
	smsLogin:"api/v1/login-sms",
	//注册
	register:"api/v1/register",
	//获取验证码
	smsCode:"api/v1/get-login-sms-captcha",
}
// 使用示例
export const login = (data) => {
	return $http.post(api.login, data)
}

export const sms_login = (data) => {
	return $http.post(api.smsLogin, data)
}

export const sms_send_code = (data) =>{
	return $http.get(api.smsCode,data)
}
import $http from "@/api/requestBase.js"

const api = {
	//账号密码登录
	login:"api/v3/wechat/wluser/login",
	//验证码登录
	smsLogin:"api/v3/wechat/wluser/code",
	//注册
	register:"api/v3/wechat/wluser/register",
	//获取验证码
	smsCode:"api/v3/wechat/wluser/code",
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
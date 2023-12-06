import $http from "@/api/requestBase.js"

const api = {
	login:"api/v1/login",
	register:"api/v1/register"
}
// 使用示例
export const login = (data) => {
	return $http.post(api.login, data)
}

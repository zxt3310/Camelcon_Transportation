import $http from "zhouWei-request/js_sdk/requestConfig.js"

// 使用示例
export const login = (data) => {
	return $http.post('api/login', data)
}

import $http from "@/api/requestBase.js"

const orderApi = {
	get:"api/v3/wechat/wluser/request/sql/3100",
	create:"api/v3/wechat/wluser/submit/order/3100"
}
// 获取所有订单
export const getOrder = () => {
	return $http.post(orderApi.get)
}
// 创建订单
export const createOrder = (data)=>{
	return $http.post(orderApi.create,data)
}
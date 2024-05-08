import $http from "@/api/requestBase.js"

const orderApi = {
	get:"api/v3/wechat/wluser/request/sql/3100",
	create:"api/v3/wechat/wluser/submit/order/3100",
	boxs:"api/v3/wechat/wluser/request/sql/31001"
}
// 获取所有订单
export const getOrder = (status) => {
	return $http.post(orderApi.get,{"iStatus":status})
}
// 创建订单
export const createOrder = (data)=>{
	return $http.post(orderApi.create,data)
}

// 获取盒子
export const getBoxs = (cOrderId) => {
	return $http.post(orderApi.boxs,{"cOrderId":cOrderId})
}
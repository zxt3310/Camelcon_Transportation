import $http from "@/api/requestBase.js"

const orderApi = {
	get:"api/v1/query-order-list",
	create:"api/v1/add-order"
}
// 获取所有订单
export const getOrder = () => {
	return $http.get(orderApi.get, {page:1,size:999})
}
// 创建订单
export const createOrder = (data)=>{
	return $http.post(orderApi.create,data)
}
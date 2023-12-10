import $http from "@/api/requestBase.js"

const address = {
	add:"api/v1/add-user-address",
	update:"api/v1/update-user-address",
	delete:"api/v1/delete-user-address",
	get:"api/v1/query-user-address-list"
}
// 使用示例
export const addr_add = (data) => {
	return $http.post(api.add, data)
}

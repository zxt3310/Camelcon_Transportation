import $http from "@/api/requestBase.js"

const node = {
	get:"api/v1/query-main-sub-node-list",
}
// 使用示例
export const allnode = () => {
	return $http.get(node.get, {page:1,size:999})
}

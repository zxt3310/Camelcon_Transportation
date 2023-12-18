import $http from "@/api/requestBase.js"

const node = {
	get:"api/v1/query-main-sub-node-list",
	check_schedule:"api/v1/query-schedule-by-main-node"
}
// 使用示例
export const allnode = () => {
	return $http.get(node.get, {page:1,size:999})
}

export const checkSchedule = (data)=>{
	return $http.get(node.check_schedule,data)
}
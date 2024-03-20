import $http from "@/api/requestBase.js"

const address = {
	add:"api/v3/wechat/wluser/submit/add/3001",
	update:"api/v3/wechat/wluser/submit/edit/3001",
	delete:"api/v3/wechat/wluser/submit/del/3001",
	get:"api/v3/wechat/wluser/request/sql/3001"
}

export const addr_add = (data) => {
	return $http.post(address.add, data)
}

export const addr_get = () => {
	return $http.post(address.get)
}

export const addr_update = (data) =>{
	return $http.post(address.update, data)
}

export const addr_delete = (data) =>{
	return $http.post(address.delete, data)
}
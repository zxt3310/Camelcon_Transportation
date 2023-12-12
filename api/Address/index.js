import $http from "@/api/requestBase.js"

const address = {
	add:"api/v1/add-user-address",
	update:"api/v1/update-user-address",
	delete:"api/v1/delete-user-address",
	get:"api/v1/query-user-address-by-id"
}

export const addr_add = (data) => {
	return $http.post(address.add, data)
}

export const addr_get = () => {
	return $http.get(address.get)
}

export const addr_update = (data) =>{
	return $http.post(address.update, data)
}

export const addr_delete = (data) =>{
	return $http.post(address.delete, data)
}
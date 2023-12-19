import $http from "@/api/requestBase.js"

const complaintApi = {
	add: "api/v1/add-complaint"
}

export const addComplaint = (data) => {
	$http.post(complaintApi.add, data)
}
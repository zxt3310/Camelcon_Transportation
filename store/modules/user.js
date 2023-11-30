const user = {
	state: {
		userInfo: {
			userId: "",
			phone: ""
		},
		token: '',
	}
}

const mutations = {
	SET_TOKEN: (state, value) => {
		state.token = value;
	},
	SET_USER: (state, value) => {
		state.userInfo = value;
	}
}

const actions = {

}
export default user
import storage from '@/Tootls/storage.js'
import * as loginApi from '@/api/login'
const user = {
	state: {
		userinfo: JSON.parse(storage.get("PHONE")),
		token: storage.get('TOKEN')?storage.get('TOKEN'):null,
	},
	mutations: {
		SET_TOKEN: (state, value) => {
			state.token = value;
		},
		SET_USER: (state, value) => {
			state.userinfo = value;
		}
	},
	actions: {
		login({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				loginApi.login({
					...data
				}).then((res) => {
					console.log(res)
					let data = res.data.result
					let token = res.header.Userauthorization
					let userinfo = JSON.stringify(data)
					loginSuccess(commit, {
						token,
						userinfo
					})
					resolve()
				}).catch(reject)
			})
		},
		logout({
			commit
		}) {
			commit('SET_TOKEN', null)
			commit('SET_USER', '未登录')
			storage.remove('PHONE')
			storage.remove('TOKEN')
		}
	}
}

const checkLogin = () => {

}

const loginSuccess = (commit, {
	token,
	userinfo,
	expire
}) => {
	storage.set("PHONE", userinfo)
	storage.set("TOKEN", token)
	commit('SET_USER', userinfo)
	commit('SET_TOKEN', token)
}
export default user
import storage from '@/Tootls/storage.js'
import * as loginApi from '@/api/login'
const user = {
	state: {
		username: storage.get('PHONE')?storage.get('PHONE'):'未登录',
		token: storage.get('TOKEN')?storage.get('TOKEN'):null,
	},
	mutations: {
		SET_TOKEN: (state, value) => {
			state.token = value;
		},
		SET_USER: (state, value) => {
			state.username = value;
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
					let result = res;
					let expire = result.expires_in;
					let token = `${result.token_type} ${result.access_token}`
					let phone = data.username
					loginSuccess(commit, {
						token,
						phone,
						expire
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
	phone,
	expire
}) => {
	storage.set("PHONE", phone)
	storage.set("TOKEN", token, expire)
	commit('SET_USER', phone)
	commit('SET_TOKEN', token)
	let $store = getCurrentPages()[0].$vm.$store;
	$store.dispatch("requestNode");
}
export default user
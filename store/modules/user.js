import storage from '@/Tootls/storage.js'
import * as loginApi from '@/api/login'
const user = {
	state: {
		username:'',
		token: ''
	},
	mutations:{
		SET_TOKEN: (state, value) => {
			state.token = value;
		},
		SET_USER: (state, value) => {
			state.username = value;
		}
	},
	actions:{
		login({commit},data){
			return new Promise((resolve, reject) =>{
				loginApi.login({...data}).then((res)=>{
					let result = res;
					let expire = result.expires_in;
					let token = `${result.token_type} ${result.access_token}`
					let phone = data.username
					loginSuccess(commit,{token,phone,expire})
					resolve()
				}).catch(reject)
			})
		}
	}
}

const checkLogin = ()=>{
	
}

const loginSuccess = (commit, {token,phone,expire})=>{
	storage.set("PHONE",phone)
	storage.set("TOKEN",token,expire)
	commit('SET_USER', phone)
	commit('SET_TOKEN', token)
}
export default user
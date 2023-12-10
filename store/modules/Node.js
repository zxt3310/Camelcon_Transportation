import * as NodeApi from "@/api/Node"

const node = {
	state: {
		nodes: null
	},
	mutations: {
		SET_NODE: (state, value) => {
			state.nodes = value;
		}
	},
	actions: {
		requestNode({
			commit
		}) {
			return new Promise((resolve, reject) => {
				NodeApi.allnode().then((res) => {
					let result = res.data;
					commit("SET_NODE", result)
					resolve(result)
				}).catch((error) => {
					reject(error)
				})
			})
		}
	},
	getters: {
		 getnode(state) {
			let nodes = state.nodes
			if (nodes == null) {
				let $store = getCurrentPages()[0].$vm.$store;
				$store.dispatch("requestNode");
			}
			return nodes;
		}
	}
}
export default node
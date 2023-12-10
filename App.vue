<script>
	import * as NodeApi from "@/api/Node"
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$store.getters.getnode
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	page {
		background-color: #F4F7FC;
		width: 100%; 
		height: 100%;
	}
	.padding-hor {
		padding-left: 8%;
		padding-right: 8%;
	}
</style>

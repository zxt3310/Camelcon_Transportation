<template>
	<view class="page_in">
		<view class="header">
			<view class="switch">
				
			</view>
		</view>
		
		<!-- <view class="">
			<u--input></u--input>
			<u-button type="primary" @click="openAddress">adsf</u-button>
		</view>
		<liu-choose-address ref="scroll" @change='chooseSuccess'></liu-choose-address> -->
	</view>
	
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},

		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		onLoad() {
			
		},
		methods: {
			jump(){
				uni.navigateTo({
					url:"/pages/CitySelect/CitySelect"
				})
			},
			openAddress() {
				this.$refs.scroll.open()
			},
			chooseSuccess(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page_in{
		width: 100%;
		height: 100%;
	}
	.header {
		height: 25%;
		background-color: #0081FF;
		border-radius: 0 0 50% 50%;
		position: relative;
	}
	.switch{
		position: absolute;
		margin: 0 6%;
		height: 100%;
		width: 88%;
		border-radius: 20upx;
		background-color: white;
		bottom: -50px;
		
	}
</style>

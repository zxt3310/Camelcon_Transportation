<template>
	<view class="page_in">
		<view class="header">
			<view class="switch">
				<u-swiper height="100%" :list="swipeList"></u-swiper>
			</view>
		</view>
		<view class="padding-hor dashbord">
			<u-row justify="space-between" gutter="40">
				<u-col span="6" @click="jumpToCreateOrder">
					<view class="func_view">
						<u-row>
							<u-col span="6">
								<u-icon name="/static/icon/order_create.png" size="86"></u-icon>
							</u-col>
							<u-col span="6">
								<u-row><text style="font-size: 13px;">动物寄送</text></u-row>
								<u-row><text style="font-size: 9px; color: gray;">下订单</text></u-row>
							</u-col>
						</u-row>
					</view>
				</u-col>
				<u-col span="6">
					<view class="func_view">
						<u-row>
							<u-col span="6">
								<u-icon name="/static/icon/custom_service.png" size="86"></u-icon>
							</u-col>
							<u-col span="6">
								<u-row><text style="font-size: 13px;">售前咨询</text></u-row>
								<u-row><text style="font-size: 9px; color: gray;">运费及时效查询</text></u-row>
							</u-col>
						</u-row>
					</view>
				</u-col>
			</u-row>
			<view style="height: 40upx;">
				
			</view>
			<u-row justify="space-between" gutter="40">
				<u-col span="6">
					<view class="func_view">
						<u-row>
							<u-col span="6">
								<u-icon name="/static/icon/message.png" size="86"></u-icon>
							</u-col>
							<u-col span="6">
								<u-row><text style="font-size: 13px;">投诉建议</text></u-row>
								<u-row><text style="font-size: 9px; color: gray;">实时反馈</text></u-row>
							</u-col>
						</u-row>
					</view>
				</u-col>
			</u-row>
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
				title: 'Hello',
				swipeList:[
					"https://p9.itc.cn/q_70/images03/20221101/96f2c3f89f3d48419c2d6e739907b870.jpeg",
					"https://pic.vjshi.com/2019-01-27/ee2f5aa9eee0b058a61238642cddd3eb/00002.jpg?x-oss-process=style/watermark"
				]
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
			jumpToCreateOrder(){
				uni.navigateTo({
					url:"/pages/OrderCreate/OrderCreate"
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
		bottom: -50px;
		overflow: hidden;		
	}
	.dashbord {
		padding-top: 20%;
		height: 100%;
	}
	.func_view{
		padding: 20upx;
		background-color: white;
	}
</style>

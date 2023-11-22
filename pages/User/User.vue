<template>
	<view class="page_in">
		<view class="header">
			<view class="user-info u-flex-row">
				<u-avatar size="120"></u-avatar>
				<text style="margin-left: 40upx; color: white;">{{maskPhone(user.phone)}}</text>
			</view>
			<view class="service">
				基础服务
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{
					avatar:"",
					phone:"13800138000"
				}
			}
		},
		methods: {
			maskPhone(phone){
				return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
			}
		}
	}
</script>

<style lang="scss">
	.page_in{
		width: 100%;
		height: 100%;
	}
	.header {
		height: 25%;
		background-color: #0081FF;
		border-radius: 0 0 50% 50%;
		position: relative;
		.user-info{
			padding:5% 10% 5% 10%;
		}
		.service{
			position: absolute;
			background-color: white;
			padding: 30upx;
			// bottom: -80upx;
			left: 50%;
			transform: translate(-50%, 0);
			width: 80%;
			height: 50%;
			border-radius: 12upx;
		}
	}
</style>

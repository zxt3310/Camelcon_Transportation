<template>
	<view class="page_in">
		<view class="header">
			<view class="user-info u-flex-row">
				<u-avatar size="100"></u-avatar>
				<text style="margin-left: 40upx; color: white;">{{maskPhone(user.phone)}}</text>
			</view>
			<view class="service_box">
				<view style="font-size: 24upx; font-weight: 900; padding: 20upx;">基础服务</view>
				<u-row customStyle="margin-bottom:16px" gutter="10">
					<u-col span="3">
						<u-icon labelSize="22" size="60" labelPos="bottom" name="file-text" label="地址管理" @click="jumpToAddr"></u-icon>
					</u-col>
					<u-col span="3">
						<u-icon labelSize="22" size="60" labelPos="bottom" name="coupon" label="开票管理"></u-icon>
					</u-col>
					<u-col span="3">
						<u-icon labelSize="22" size="60" labelPos="bottom" name="order" label="历史订单"></u-icon>
					</u-col>
					<u-col span="3">
						<u-icon labelSize="22" size="60" labelPos="bottom" name="phone" label="客服电话" @click="onSelect"></u-icon>
					</u-col>
				</u-row>  
				<u-row customStyle="margin-bottom:20px" gutter="10">
					<u-col span="3">
						<u-icon labelSize="22" size="60" labelPos="bottom" name="account" label="个人资料"></u-icon>
					</u-col>
					<u-col span="3">
						<u-icon labelSize="22" size="60" labelPos="bottom" name="info-circle" label="关于我们" @click="jumpToAbout"></u-icon>
					</u-col>
				</u-row>  
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// show:false,
				user:{
					avatar:"",
					phone:this.$store.getters.username
				}
				// list:[
				// 	{name:"010-86683333"}
				// ]
			}
		},
		onLoad() {
			
		},
		methods: {
			maskPhone(phone){
				return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
			},
			jumpToAddr(){
				uni.navigateTo({
					url:"/pages/AddressList/AddressList"
				})
			},
			onSelect(){
				uni.makePhoneCall({
					phoneNumber:"010-86683333"
				})
			},
			jumpToAbout(){
				uni.navigateTo({
					url:"/pages/User/AboutUs"
				})
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
			padding:2% 8% 2% 8%;
		}
		.service_box{
			position: absolute;
			background-color: white;
			bottom: -40%;
			left: 50%;
			transform: translate(-50%, 0);
			width: 90%;
			border-radius: 12upx;
			box-shadow: 0 0 10upx 5upx rgba(0, 0, 0, 0.2);
		}
	}
</style>

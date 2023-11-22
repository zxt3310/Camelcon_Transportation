<template>
	<view style="padding: 40upx;">
		<view v-if="addr_list.length == 0" style="margin-bottom: 40upx;">
			<u-empty iconSize ="180" textSize="30" mode="list" text="地址列表为空"></u-empty>
		</view>
		<view v-else>
			<view class="addr_unit" v-for="(addr, index) in addr_list" :key="index">
				 <view class="">
				 	<text style="font-size: 30upx; font-weight: 800;">{{addr.name}}</text>
					<text style="margin-left: 20upx;">{{addr.phone}}</text>
				 </view>
				 <view>
				 	<text>{{addr.workplace}}</text>
				 </view>
				 <view style="margin-bottom: 20upx;">
					 <text>{{`${addr.addr_1} ${addr.addr_2}`}}</text>
				 </view>
				 <u-line color="gray"></u-line>
				 <view class="u-flex-row u-flex-end" style="padding-top: 15upx;">
				 	<u-icon size="24px" name="edit-pen" label="编辑"></u-icon>
					<u-icon customStyle="margin-left:20rpx" size="24px" name="trash" label="删除"></u-icon>
				 </view>
			</view>
		</view>
		<u-button text="新增地址" iconColor="white" icon="plus-circle" color="#0081FF" @click="add_addr"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addr_list:[
					// {
					// 	name:"张三",
					// 	phone:"13800138000",
					// 	workplace:"北京大学实验动物中心",
					// 	addr_1:"北京市 海淀区",
					// 	addr_2:"北京大学实验动物中心103室"
					// },
					// {
					// 	name:"张三",
					// 	phone:"13800138000",
					// 	workplace:"北京大学实验动物中心",
					// 	addr_1:"北京市 海淀区",
					// 	addr_2:"北京大学实验动物中心103室"
					// },
					// {
					// 	name:"张三",
					// 	phone:"13800138000",
					// 	workplace:"北京大学实验动物中心",
					// 	addr_1:"北京市 海淀区",
					// 	addr_2:"北京大学实验动物中心103室"
					// }
				]
			}
		},
		methods: {
			add_addr(){
				uni.navigateTo({
					url:"/pages/AddressList/AddAddress"
				})
			}
		}
	}
</script>

<style lang="scss">
	.addr_unit{
		padding: 30upx;
		background-color: white;
		border-radius: 20upx;
		font-size: 26upx;
		line-height: 44upx;
		margin-bottom: 40upx;
	}
</style>

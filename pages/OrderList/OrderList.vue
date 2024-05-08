<template>
	<view>
		<u-subsection fontSize="26" :list="[`进行中 (${numberOfUndelivered})`,'已完成']" :current="current" @change="onChange"></u-subsection>
		<view style="padding: 40upx;">
			<view class="order_unit" v-for="(order,index) in currentList" :key="index" @click="jumpToDetail(index)">
				<u-row>
					<u-col span="10" customStyle="font-size:13px; font-weight:bold; color:black;">
						{{`运单号: ${order.cOrderId}`}}
					</u-col>
					<u-col span="2">
						<u-icon labelPos="left" name="arrow-right" label="查看" label-size="28"
							labelColor="#0081FF"></u-icon>
					</u-col>
				</u-row>

				<u-row customStyle="padding:10px" justify="around">
					<u-col span="4.5" customStyle="text-align: center">
						<view class="">{{formatCity(order.cSendProvince,order.cSendCity)}}</view>
						<view style="font-size: 24upx; color: gray;">{{order.cSendName}}</view>
						<view style="font-size: 24upx;">{{order.cSendCorp}}</view>
					</u-col>
					<u-col span="3" customStyle="text-align: center;">
						<u-icon width="100%" height="40" name="/static/icon/order_right.png"></u-icon>
						<view style="font-size: 24upx; color: gray;">{{order.status}}</view>
					</u-col>
					<u-col span="4.5" customStyle="text-align: center">
						<view class="">{{formatCity(order.cRecvProvince,order.cRecvCity)}}</view>
						<view style="font-size: 24upx; color: gray;">{{order.cRecvName}}</view>
						<view style="font-size: 24upx;">{{order.cRecvCorp}}</view>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	import {getOrder} from "@/api/Order"
	import {city_format} from "@/Tootls/CityFormat.js"
	export default {
		data() {
			return {
				current: 0,
				currentList: [],
				//未完成订单的数量
				numberOfUndelivered:""
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getOrderList(this.current+1)
		},
		methods: {
			getOrderList(status){
				getOrder(status).then((res)=>{
					this.currentList = res.result
					if(status == 1){
						this.numberOfUndelivered = this.currentList.length
					}
				})
			},
			onChange(index) {
				this.current = index;
				this.getOrderList(index+1)
			},
			jumpToDetail(index) {
				let order = this.currentList[index]
				let option = JSON.stringify(order)
				uni.navigateTo({
					url: `/pages/OrderList/OrderDetail?order=${option}`
				})
			},
			formatCity(province,city){
				return city_format(province,city)
			}
		}
	}
</script>

<style>
	.order_unit {
		margin-bottom: 20upx;
		background-color: white;
		line-height: 45upx;
		padding: 20upx;
	}
</style>
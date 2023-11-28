<template>
	<view>
		<u-subsection fontSize="26" :list="['进行中','已完成']" :current="current" @change="onChange"></u-subsection>
		<view style="padding: 40upx;">
			<view class="order_unit" v-for="(order,index) in currentList" :key="index" @click="jumpToDetail">
				<u-row>
					<u-col span="10" customStyle="font-size:13px; color:gray;">
						{{`运单号:${order.id}`}}
					</u-col>
					<u-col span="2">
						<u-icon labelPos="left" name="arrow-right" label="查看" label-size="28"
							labelColor="#0081FF"></u-icon>
					</u-col>
				</u-row>

				<u-row customStyle="padding:10px" gutter="5" justify="around">
					<u-col span="3" customStyle="text-align: center">
						<view class="">{{order.from}}</view>
						<view style="font-size: 24upx; color: gray;">{{order.sender}}</view>
					</u-col>
					<u-col span="3" customStyle="text-align: center;">
						<u-icon width="100%" height="40" name="/static/icon/order_right.png"></u-icon>
						<view style="font-size: 24upx; color: gray;">{{order.status}}</view>
					</u-col>
					<u-col span="3" customStyle="text-align: center">
						<view class="">{{order.to}}</view>
						<view style="font-size: 24upx; color: gray;">{{order.receiver}}</view>
					</u-col>
				</u-row>

				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				currentList: [],
				shipping_list: [{
						id: "SF123456123456",
						from: "北京市",
						to: "上海市",
						sender: "张三",
						receiver: "李四",
						status: "进行中"
					},
					{
						id: "SF123456123456",
						from: "北京市",
						to: "上海市",
						sender: "张三",
						receiver: "李四",
						status: "进行中"
					},
					{
						id: "SF123456123456",
						from: "北京市",
						to: "上海市",
						sender: "张三",
						receiver: "李四",
						status: "进行中"
					},
					{
						id: "SF123456123456",
						from: "北京市",
						to: "上海市",
						sender: "张三",
						receiver: "李四",
						status: "进行中"
					}
				],
				deliver_list: [{
						id: "SF12398054231",
						from: "南京",
						to: "广州",
						sender: "刘天勤",
						receiver: "赵秉承",
						status: "已完成"
					},
					{
						id: "SF12398054231",
						from: "南京",
						to: "广州",
						sender: "刘天勤",
						receiver: "赵秉承",
						status: "已完成"
					},
					{
						id: "SF12398054231",
						from: "南京",
						to: "广州",
						sender: "刘天勤",
						receiver: "赵秉承",
						status: "已完成"
					},
					{
						id: "SF12398054231",
						from: "南京",
						to: "广州",
						sender: "刘天勤",
						receiver: "赵秉承",
						status: "已完成"
					}
				]
			}
		},
		onLoad() {
			this.currentList = this.shipping_list;
		},
		methods: {
			onChange(index) {
				this.current = index;
				this.currentList = index ? this.deliver_list : this.shipping_list;
			},
			jumpToDetail() {
				uni.navigateTo({
					url: "/pages/OrderList/OrderDetail"
				})
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
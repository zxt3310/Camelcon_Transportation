<template>
	<view class="page_in">
		<view class="content_box">
			<view style="line-height: 50upx; font-size: 28upx; color: gray;">运单号:{{order.id}}</view>
			<view class="detail_box">
				<view class="title" style="padding: 20upx;">
					<u-row gutter="5" justify="around">
						<u-col span="3" customStyle="text-align: center">
							<view class="">{{order.from}}</view>
							<view style="font-size: 26upx;">张三</view>
						</u-col>
						<u-col span="3" customStyle="text-align: center;">
							<u-icon width="100%" height="40" name="/static/icon/order_right.png"></u-icon>
							<view style="font-size: 26upx;">进行中</view>
						</u-col>
						<u-col span="3" customStyle="text-align: center">
							<view class="">{{order.to}}</view>
							<view style="font-size: 26upx;">李四</view>
						</u-col>
					</u-row>
				</view>
				<u-line color="#C4CDD7"></u-line>
				<view class="content">
					<cc-defineStep colors="#0081FF" :stepData="step"></cc-defineStep>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order:{
					id:"SF123456123456",
					from:"北京市",
					to:"上海市"
				},
				step:[
					{
						name:"已下单",
						time:"2023-02-03 12:30",
						desc:"安排司机取货",
						type:1,
						isNow:0
					},
					{
						name:"已取货",
						time:"2023-02-04 7:30",
						desc:"正在发往xx中转点",
						type:1,
						isNow:0
					},
					{
						name:"到达xx中转点",
						time:"2023-02-05 9:45",
						desc:"正在派送，司机王强 电话：13800138000",
						type:1,
						isNow:0
					},
					{
						name:"已签收",
						time:"2023-02-05 16:10",
						desc:"您的货物已签收，如有疑问，请联系我公司，期待再次为您服务",
						type:1,
						isNow:1
					}
				]
			}
		},
		onLoad() {
			this.step.reverse()
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.page_in{
		padding: 40upx;
		.content_box{
			font-size: 28upx;
			background-color: #F2F7FD;
			border-radius: 20upx;
			.detail_box{
				background-color: white;
				.title{
					line-height: 45upx;
				}
				.content{
					padding: 20upx;
				}
			}
		}
	}
</style>

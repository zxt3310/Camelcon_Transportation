<template>
	<view class="page_in">
		<view class="content_box">
			<view style="line-height: 50upx; font-size: 24upx; color: gray;">运单号:{{order.id}}</view>
			<view class="detail_box">
				<view class="title">
					<u-row gutter="5" justify="around">
						<u-col span="3" customStyle="text-align: center">
							<view class="">{{order.from}}</view>
							<view style="font-size: 22upx;">张三</view>
						</u-col>
						<u-col span="3" customStyle="text-align: center;">
							<u-icon width="100%" height="40" name="/static/icon/order_right.png"></u-icon>
							<view style="font-size: 22upx;">进行中</view>
						</u-col>
						<u-col span="3" customStyle="text-align: center">
							<view class="">{{order.to}}</view>
							<view style="font-size: 22upx;">李四</view>
						</u-col>
					</u-row>
				</view>
				<u-line color="#C4CDD7"></u-line>
				<view class="content">
					
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
				}
			}
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
					text-align: center;
					line-height: 45upx;
					padding:20upx;
				}
				.content{
					padding: 20upx;
				}
			}
		}
	}
</style>

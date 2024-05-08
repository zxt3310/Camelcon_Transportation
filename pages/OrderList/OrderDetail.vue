<template>
	<view class="page_in">
		<view class="sender">
			<u-row>
				<u-col span="2">
					<u-avatar size="60"></u-avatar>
				</u-col>
				<u-col span="6.4">
					<text>王五</text>
					<u-rate count="5" v-model="rate" readonly size="30"></u-rate>
				</u-col>
				<u-col span="2">
					<u-icon name="edit-pen-fill" labelPos="bottom" size="50" labelSize="20" label="评价他"></u-icon>
				</u-col>
				<u-col span="0.2">
					<u-line direction="col" color="gray" length="60"></u-line>
				</u-col>
				<u-col span="1.4">
					<u-icon name="phone" labelPos="bottom" size="50" labelSize="20" label="联系他"></u-icon>
				</u-col>
			</u-row>
		</view>
		<view class="content_box">
			<view style="line-height: 50upx; font-size: 28upx; color: gray;">运单号: {{order.cOrderId}}</view>
			<view class="detail_box">
				<view class="title" style="padding: 20upx;">
					<u-row gutter="5" justify="around">
						<u-col span="4.5" customStyle="text-align: center">
							<view class="">{{order.cSendCity}}</view>
							<view style="font-size: 24upx; color: gray;">{{order.cSendName}}</view>
							<view style="font-size: 24upx;">{{order.cSendCorp}}</view>
						</u-col>
						<u-col span="3" customStyle="text-align: center;">
							<u-icon width="100%" height="40" name="/static/icon/order_right.png"></u-icon>
							<view style="font-size: 26upx;"></view>
						</u-col>
						<u-col span="4.5" customStyle="text-align: center">
							<view class="">{{order.cRecvCity}}</view>
							<view style="font-size: 24upx; color: gray;">{{order.cRecvName}}</view>
							<view style="font-size: 24upx;">{{order.cRecvCorp}}</view>
						</u-col>
					</u-row>
				</view>
				<u-gap height="20" bg-color="#F4F7FC"></u-gap>
				
				<view class="box_list_unit" v-for="(item, index) in order.boxs" :key="index">
					<u-badge type="primary" absolute :offset="[-5 ,-5]" shape="horn" :value="`${item.box_num}盒`"></u-badge>
					<view
						style="position: absolute; left:0,top:0; background-color: #0081FF; border-radius: 0 0 100% 0; padding:5upx 10upx 10upx 5upx; color: white;">
						{{index+1}}
					</view>
					<view class="box_content">
						<view class="u-flex-row">
							<u--text size="24" :text="`类别:${item.cType}`"></u--text>
							<u--text size="24" :text="`性别:${item.cGender}`"></u--text>
							<u--text size="24" :text="`只数:${item.iCount}`"></u--text>
							<u--text size="24" :text="`周龄:${item.iWeekAge}`"></u--text>
						</view>
						<view class="u-flex-row">
							<u--text size="24" :text="`品系:${item.cName}`"></u--text>
							<u--text size="24" :text="`基因型:${item.cGene}`"></u--text>
						</view>
						<u--text size="24" :text="`备注:${item.cNote}`"></u--text>
					</view>
					<u-gap height="20" bg-color="#F4F7FC"></u-gap>
				</view>
				
				<view class="content">
					<cc-defineStep colors="#0081FF" :stepData="step"></cc-defineStep>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getBoxs} from "@/api/Order"
	export default {
		data() {
			return {
				order:{
					id:"SF123456123456",
					from:"北京市",
					to:"上海市",
					boxs:[]
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
						desc:"",
						type:1,
						isNow:0
					},
					{
						name:"正在派送",
						time:"2023-02-05 10:20",
						desc:"司机王强 电话：13800138000",
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
				],
				rate:3.5
			}
		},
		onLoad(option) {
			let order_str = option.query.order
			let order = JSON.parse(order_str)
			this.step.reverse()
			getBoxs(order.cOrderId).then((res)=>{
				order.boxs = res.result
				this.order = order
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.page_in{
		padding: 40upx;
		.sender{
			padding: 20upx;
			background-color: white;
			border-radius: 20upx;
		}
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
	
	.box_list_unit {
		position: relative;
		font-size: 20upx;
	
		.box_content {
			padding: 30upx;
			position: relative;
	
			.remove_btn {
				position: absolute;
				width: 100upx;
				height: 40upx;
				right: 10upx;
				bottom: 20upx;
			}
		}
	}
</style>

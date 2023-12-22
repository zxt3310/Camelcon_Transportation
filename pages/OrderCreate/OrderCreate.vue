<template>
	<view class="">
		<view class="content_view">
			<view class="ship_style" @click="selectAddress('from')">
				<view class="Icon" style="background-color: #0081FF;">寄</view>
				<view class="u-flex-row u-flex-between ">
					<text style="flex: 1; margin-left: 40upx;">{{ship_from}}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<u-line length="80%" margin="0 0 0 15%"></u-line>
			<u-line customStyle="position: absolute; left:7%; top:38%" direction="col" length="25%" color="gray"
				dashed></u-line>
			<view class="ship_style" @click="selectAddress('to')">
				<view class="Icon" style="background-color: #2EAD1C;">收</view>
				<view class="u-flex-row u-flex-between ">
					<text style="flex: 1; margin-left: 40upx;">{{ship_to}}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<view class="content_view" style="margin-top: 0;">
			<view class="ship_style u-flex-between u-flex-items-center">
				<view class="Icon" style="background-color: #F9AE3D;">票</view>
				<view class="u-flex-grow" style="margin-left: 40upx;">
					<view class="u-flex-row">
						<text>发票抬头：</text>
						<u--input border="none" fontSize="13px" placeholder="请输入发票抬头"
							v-model="orderObj.invoice.title"></u--input>
					</view>
					<view class="u-flex-row">
						<text>税号代码：</text>
						<u--input border="none" fontSize="13px" placeholder="请输入税号代码"
							v-model="orderObj.invoice.code"></u--input>
					</view>
					<view>发票内容：运输服务费</view>
					<view class="" style="margin-top: 20upx;">
						<u-checkbox-group @change="invoiceValueChange">
							<u-checkbox name="needDetail" size="14px" icon-size="14px" label-size="20upx"
								label="需要明细单"></u-checkbox>
							<view style="width: 20upx;"></view>
							<u-checkbox name="vatInvoice" size="14px" icon-size="14px" label-size="20upx"
								label="增值税专用发票"></u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
			</view>
		</view>

		<view class="content_view" style="margin-top: 0;">
			<view class="ship_style u-flex-between u-flex-items-center">
				<view class="Icon" style="background-color:orchid;">付</view>
				<view class="u-flex-grow" style="margin-left: 40upx;">
					<view class="u-flex-row">
						<text>付款人：</text>
						<u--input border="none" fontSize="13px" placeholder="请输入姓名"
							v-model="orderObj.payer.contact"></u--input>
					</view>
					<view class="u-flex-row">
						<text>联系电话：</text>
						<u--input border="none" fontSize="13px" placeholder="请输入电话"
							v-model="orderObj.payer.mobile"></u--input>
					</view>
					<view class="u-flex-row">
						<text>地址：</text>
						<u--input border="none" fontSize="13px" placeholder="请输入地址"
							v-model="orderObj.payer.address"></u--input>
					</view>
				</view>
			</view>
		</view>

		<view class="content_view" style="margin-top: 0;">
			<view class="box_list_unit" v-for="(item, index) in orderObj.boxs" :key="index">
				<u-badge type="primary" absolute :offset="[-5 ,-5]" shape="horn" :value="`${item.box}盒`"></u-badge>
				<view
					style="position: absolute; left:0,top:0; background-color: #0081FF; border-radius: 0 0 100% 0; padding:5upx 10upx 10upx 5upx; color: white;">
					{{index+1}}
				</view>
				<view class="box_content">
					<view class="u-flex-row">
						<u--text size="24" :text="`类别:${item.type}`"></u--text>
						<u--text size="24" :text="`性别:${item.gender}`"></u--text>
						<u--text size="24" :text="`只数:${item.quantity}`"></u--text>
						<u--text size="24" :text="`周龄:${item.age}`"></u--text>
					</view>
					<view class="u-flex-row">
						<u--text size="24" :text="`品系:${item.name}`"></u--text>
						<u--text size="24" :text="`基因型:${item.gene_type}`"></u--text>
					</view>
					<u--text size="24" :text="`备注:${item.memo}`"></u--text>
					<view class="remove_btn">
						<u-button size="mini" type="error" plain="true" text="移除" @click="remove_box(index)"></u-button>
					</view>
				</view>
				<u-gap height="20" bg-color="#F4F7FC"></u-gap>
			</view>
			<u-button icon="plus-circle" :plain="true" type="primary" text="添加盒子" @click="add_Order_Box"></u-button>
			<view class="" style="margin-top: 20upx;">
				<u-text size="24" type="warning" :text="`备注1: 自行完成打包，请放入充足垫料、饲料、果冻。`"></u-text>
				<u-text size="24" type="warning"
					:text="`备注2: 发生过交配的雄鼠,具有暴力、抑郁、自闭或其他精神疾病症状的品系必须每只单独放置一盒,避免运输出现死亡情况。`"></u-text>
			</view>
		</view>
		<view class="submit_btn">
			<view class="u-flex-row u-flex-grow">
				<text>定金:</text>
				<text style="color: #0081FF;">￥500</text>
			</view>
			<view style="margin-right: 40px;">
				<u-button text="支付并提交" type="primary" shape="circle" @click="submit()"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		checkSchedule
	} from "@/api/Node"
	export default {
		data() {
			return {
				ship_from: "请选择取货地址",
				ship_to: "请选择收货地址",
				scheduleObj: null,
				//
				orderObj: {
					address: {
						from: null,
						to: null
					},
					invoice: {},
					boxs: [],
					payer: {
						contact: "",
						mobile: "",
						address: ""
					}
				}
			}
		},
		onShow(option) {

		},
		watch: {
			"orderObj.address": {
				deep: true,
				handler(newObj, oldObj) {
					if (newObj.from) {
						let from = newObj.from
						this.ship_from =
							`${from.contact} ${from.mobile}\n${from.company}\n${from.province} ${from.city} ${from.address}`
					}
					if (newObj.to) {
						let to = newObj.to
						this.ship_to = `${to.contact} ${to.mobile}\n${to.company}\n${to.province} ${to.city} ${to.address}`
					}
					if (newObj.from && newObj.to) {
						//此处写请求获取运输线路
						let data = {
							start_main_node_id: newObj.from.main_node_id,
							start_sub_node_id: newObj.from.sub_node_id,
							end_main_node_id: newObj.to.main_node_id,
							end_sub_node_id: newObj.to.sub_node_id
						}
						checkSchedule(data).then((res) => {
							let a =this.schedule_filter(res)
							console.log(a)
						})
					}
				}
			}
		},
		methods: {
			add_Order_Box() {
				uni.navigateTo({
					url: "/pages/OrderCreate/Box_input"
				})
			},
			pushin_List(box_obj) {
				this.orderObj.boxs.push(box_obj);
			},
			selectAddress(option) {
				uni.navigateTo({
					url: "/pages/AddressList/AddressList?option=" + option
				})
			},
			remove_box(index) {
				this.unit_obj.splice(index, 1);
			},
			invoiceValueChange(e) {
				let invoice = this.orderObj.invoice
				invoice.needDetail = e.indexOf("needDetail") == -1 ? 0 : 1
				invoice.vatInvoice = e.indexOf("vatInvoice") == -1 ? 0 : 1
				this.orderObj.invoice = invoice;
			},
			//筛选线路
			schedule_filter(schedules) {
				let date = new Date();
				//当前星期
				let weekday_now = 3//date.getDay()
				//当前小时
				let hour = 10//date.getHours()

				let ary = schedules.filter((sch) => {
					let nodes = sch.middle_nodes
					let node_from = nodes.filter(node => node.main_node_id == this.orderObj.address.from
						.main_node_id)[0]
					//如果本周还有班次
					return (sch.start_week_day + node_from.trip_day == weekday_now && node_from.trip_time > hour +
						5) || sch.start_week_day + node_from.trip_day > weekday_now
				})
				//本周没有班次则下周所有线路都符合
				if (ary.length == 0) {
					ary = schedules
				}
				return ary.sort((a, b) => a.start_week_day - b.start_week_day)[0]
			},
			submit() {
				let data = {};
				let obj = this.orderObj;
				let invoice = obj.invoice
				data.sender_company = obj.address.from.company
				data.sender_contact = obj.address.from.contact
				data.sender_mobile = obj.address.from.mobile
				data.sender_province = obj.address.from.province
				data.sender_city = obj.address.from.city
				data.sender_address = obj.address.from.address

				data.receiver_company = obj.address.to.company
				data.receiver_contact = obj.address.to.contact
				data.receiver_mobile = obj.address.to.mobile
				data.receiver_province = obj.address.to.province
				data.receiver_city = obj.address.to.city
				data.receiver_address = obj.address.to.address

				data.package_options = ""
				data.invoice_header = invoice.title
				data.invoice_code = invoice.code
				data.invoice_content = "运输服务费"
				//此处是checkbox
				data.need_detail_list = invoice.needDetail

				data.payer_contact = obj.payer.contact
				data.payer_mobile = obj.payer.mobile
				data.payer_address = obj.payer.address

				data.route_start_main_node_id = obj.address.from.main_node_id
				data.route_start_sub_node_id = obj.address.from.sub_node_id
				data.route_end_main_node_id = obj.address.to.main_node_id
				data.route_end_sub_node_id = obj.address.to.sub_node_id
				data.order_item = obj.boxs

				console.log(data)
			}
		}
	}
</script>

<style lang="scss">
	.content_view {
		margin: 20upx 40upx;
		background-color: white;
		border-radius: 20upx;
		position: relative;
	}

	.ship_style {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30upx;
		font-size: 13px;

		text {
			line-height: 24px;
		}

		.Icon {
			width: 40upx;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			border-radius: 10upx;
			color: white;
			font-size: 12px;
			flex-shrink: 0;
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

	.submit_btn {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 20upx;
		font-size: 28upx;
		position: fixed;
		bottom: 30px;
		background-color: white;
	}
</style>
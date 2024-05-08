<template>
	<view style="padding: 40upx;">
		<view v-if="addr_list.length == 0" style="margin-bottom: 40upx;">
			<u-empty iconSize="180" textSize="30" mode="list" text="地址列表为空"></u-empty>
		</view>
		<view v-else>
			<view class="addr_unit" v-for="(addr, index) in addr_list" :key="index" @click="selectAddr(index)">
				<view class="">
					<text style="font-size: 30upx; font-weight: 800;">{{addr.cName}}</text>
					<text style="margin-left: 20upx;">{{addr.cPhone}}</text>
				</view>
				<view>
					<text style="font-weight: bold;">{{addr.cCorp}}</text>
				</view>
				<view style="margin-bottom: 20upx;">
					<text>{{`${addr.cProvince} ${addr.cCity} ${addr.cCounty} ${addr.cAddress}`}}</text>
				</view>
				<u-line color="gray"></u-line>
				<view class="u-flex-row u-flex-end" style="padding-top: 15upx;">
					<u-icon color="#0081FF" labelColor="#0081FF" size="24px" name="edit-pen" label="编辑" :space="0" @click="addr_update(addr)"></u-icon>
					<u-icon color="red" labelColor="red" customStyle="margin-left:20rpx" size="24px" name="trash" label="删除" :space="0" @click="del_addr(index)"></u-icon>
				</view> 
			</view>
		</view>
		<u-button text="添加常用地址" iconColor="white" icon="plus-circle" color="#0081FF" @click="add_addr"></u-button>
	</view>
</template>

<script>
	import {
		addr_get,
		addr_delete
	} from "@/api/Address"
	export default {
		data() {
			return {
				option:null,
				addr_list: [
					// "user_id": 2,
					// "cCorp": "湖北天霸制药有限公司",
					// "cName": "李四",
					// "cPhone": "18055733364",
					// "cProvince": "湖北省",					
					// "cCity": "武汉市",
					// "cCounty": "xx区"
					// "cAddress": "武昌区xxx路xx街道xx号",
					// "main_node_id": 25,
					// "sub_node_id": 10,
					// "created_at": "2023-12-08 16:08:56",
					// "updated_at": "2023-12-08 16:11:53",
					// "deleted_at": null
				]
			}
		},
		onShow() {
			this.pull_addr_list()
		},
		onLoad(e) {
			this.option = e.option;
		},
		methods: {
			pull_addr_list() {
				addr_get().then((res => {
					this.addr_list = res.result
				})).catch((error) => {
					console.log(error)
				})
			},
			add_addr() {
				uni.navigateTo({
					url: "/pages/AddressList/AddAddress"
				})
			},
			del_addr(index){
				uni.showModal({
					title:"提示",
					content:"是否删除该地址",
					confirmColor:"red",
					confirmText:"确认",
					cancelText:"取消",
					success: (res) => {
						if(res.confirm){
							let addr = this.addr_list[index]
							addr_delete({"iUserAddrId":addr.iUserAddrId}).then((res)=>{
								this.addr_list.splice(index,1)
							})
						}
					}
				})
			},
			addr_update(addr){
				uni.navigateTo({
					url:"/pages/AddressList/EditAddress?addr="+JSON.stringify(addr)
				})
			},
			selectAddr(index){
				//如果没有页面参数 不做处理
				if(!this.option){
					return
				}
				let pages = getCurrentPages()
				let prevPage = pages[pages.length - 2];
				prevPage.$vm.orderObj.address[this.option] = this.addr_list[index]
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.addr_unit {
		padding: 28upx;
		background-color: white;
		border-radius: 20upx;
		font-size: 26upx;
		line-height: 44upx;
		margin-bottom: 40upx;
	}
</style>
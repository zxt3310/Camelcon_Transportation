<template>
	<view class="">
		<view class="content">
			<u-form :model="model" :rules="rules" ref="uForm" labelWidth="80px">
				<u-form-item border-bottom prop="addrobj.cName" label="姓名:" ref="item1">
					<u--input border="none" placeholder="请输入姓名" v-model="model.addrobj.cName"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addrobj.cPhone" label="手机号:" ref="item2">
					<u--input border="none" placeholder="请输入手机号" v-model="model.addrobj.cPhone"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addrobj.cCorp" label="单位:" ref="item3">
					<u--input border="none" placeholder="请输入单位" v-model="model.addrobj.cCorp"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addrobj.addr_1" label="省市区:" @click.stop="show_picker" ref="item4">
					<u--input border="none" readonly placeholder="请选择省市区"
						v-model="model.addrobj.addr_1"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addrobj.cAddress" label="详细地址:" ref="item5">
					<u--textarea height="200" border="none" disableDefaultPadding placeholder="街道门牌号"
						customStyle="padding: 1px;" v-model="model.addrobj.cAddress"></u--textarea>
				</u-form-item>
			</u-form>
			<u-button customStyle="margin-top: 30px;" type="primary" color="#0081FF" shape="circle"
				text="保存" @click="submit"></u-button>
		</view>
		<liu-choose-address ref="scroll" @change='chooseSuccess'></liu-choose-address>
	</view>
</template>

<script>
	import {queryNode} from "@/Tootls/SelectNode.js"
	import {addr_add,addr_update} from "@/api/Address"
	export default {
		data() {
			return {
				model: {
					addrobj: {
						cName: "",
						cPhone: "",
						cCorp: "",
						addr_1: "",
						cAddress: ""
					}
				},
				addr_containor: {
					cProvince: "",
					cCity: "",
					cCounty: ""
				},
				rules: {
					'addrobj.cName': {
						type: 'string',
						required: true,
						message: "请输入姓名",
						trigger: ["blur", "change"]
					},
					'addrobj.cPhone': [{
						type: 'number',
						required: true,
						message: '请填写手机号',
						trigger: ['blur', 'change'],
					}, {
						message: "请正确填写手机号",
						pattern: /^(13[0-9]|14[579]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
						trigger: ['blur', 'change'],
					}],
					'addrobj.cCorp': {
						type: 'string',
						required: true,
						message: "请输入单位",
						trigger: ["blur", "change"]
					},
					'addrobj.addr_1': {
						type: 'string',
						required: true,
						message: "请选择省市区",
						trigger: ["blur", "change"]
					},
					'addrobj.cAddress': {
						type: 'string',
						required: true,
						message: "请输入详细地址",
						trigger: ["blur", "change"]
					},
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			onFocus(e) {
				e.preventDefault();
			},
			show_picker() {
				this.$refs.scroll.open()
			},
			chooseSuccess(e) {
				let val = e.value;
				let province = val[0].label;
				let city = val[1].label;
				let district = val[2].label;
				if(province == city){
					this.model.addrobj.addr_1 = `${city} ${district}`
				}else{
					this.model.addrobj.addr_1 = `${province} ${city} ${district}`
				}
				this.addr_containor = {
					cProvince: province,
					cCity: city,
					cCounty: district
				}
			},
			submit(){
				this.$refs.uForm.validate().then(res =>{
					let addrObj = this.model.addrobj;
					let addrContainor = this.addr_containor
					// console.log(this.$store.state)			
					//拼请求参数
					addrObj.cProvince = addrContainor.cProvince
					addrObj.cCity = addrContainor.cCity
					addrObj.cCounty = addrContainor.cCounty

					//请求
					addr_add(addrObj).then((res)=>{
						console.log(res)
						uni.navigateBack()
					})
					
				}).catch((e)=>{
					console.log(e)
				})
			}
		}
	}
</script>

<style lang="scss">
	.page_in {}

	.content {
		background-color: white;
		padding: 40upx;
		// text{
		// 	width: 160upx;
		// }
		// .unit_input{
		// 	padding: 30upx;
		// }
	}
</style>
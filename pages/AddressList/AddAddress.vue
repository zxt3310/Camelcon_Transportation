<template>
	<view class="">
		<view class="content">
			<u-form :model="model" :rules="rules" ref="uForm" labelWidth="80px">
				<u-form-item border-bottom prop="addrobj.name" label="姓名:" ref="item1">
					<u--input border="none" placeholder="请输入姓名" v-model="model.addrobj.name"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addrobj.phone" label="手机号:" ref="item2">
					<u--input border="none" placeholder="请输入手机号" v-model="model.addrobj.phone"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addrobj.workplace" label="单位:" ref="item3">
					<u--input border="none" placeholder="请输入单位" v-model="model.addrobj.workplace"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addrobj.addr_1" label="省市区:" @click.stop="show_picker" ref="item4">
					<u--input border="none" readonly placeholder="请选择省市区"
						v-model="model.addrobj.addr_1"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addrobj.addr_2" label="详细地址:" ref="item5">
					<u--textarea height="200" border="none" disableDefaultPadding placeholder="街道门牌号"
						customStyle="padding: 1px;" v-model="model.addrobj.addr_2"></u--textarea>
				</u-form-item>
			</u-form>
			<u-button customStyle="margin-top: 30px;" type="primary" color="#0081FF" shape="circle"
				text="保存" @click="submit"></u-button>
		</view>
		<liu-choose-address ref="scroll" @change='chooseSuccess'></liu-choose-address>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					addrobj: {
						name: "",
						phone: "",
						workplace: "",
						addr_1: "",
						addr_2: ""
					}
				},
				addr_containor: {
					province: "",
					city: "",
					district: ""
				},
				rules: {
					'addrobj.name': {
						type: 'string',
						required: true,
						message: "请输入姓名",
						trigger: ["blur", "change"]
					},
					'addrobj.phone': [{
						type: 'number',
						required: true,
						message: '请填写手机号',
						trigger: ['blur', 'change'],
					}, {
						message: "请正确填写手机号",
						pattern: /^(13[0-9]|14[579]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
						trigger: ['blur', 'change'],
					}],
					'addrobj.workplace': {
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
					'addrobj.addr_2': {
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
				console.log(val);
				let province = val[0].label;
				let city = val[1].label;
				let district = val[2].label;
				// let model = this.model;
				this.model.addrobj.addr_1 = `${province} ${city} ${district}`;

				this.addr_containor = {
					province: val[0].value,
					city: val[1].value,
					district: val[2].value
				}
			},
			submit(){
				this.$refs.uForm.validate().then(res =>{
					
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
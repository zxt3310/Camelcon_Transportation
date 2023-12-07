<template>
	<view class="">
		<view class="content">
			<u-form :model="model" :rules="rules" ref="uForm" labelWidth="80px">
				<u-form-item border-bottom prop="addr_text_obj.name" label="姓名:">
					<u--input border="none" placeholder="请输入姓名" :value="model.ddr_text_Obj.name"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addr_text_obj.phone" label="手机号:">
					<u--input border="none" placeholder="请输入手机号" :value="model.ddr_text_Obj.phone"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addr_text_obj.workplace" label="单位:">
					<u--input border="none" placeholder="请输入单位" :value="model.ddr_text_Obj.workplace"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addr_text_obj.addr_1" label="省市区:" @click.stop="show_picker">
					<u--input border="none" readonly placeholder="请选择省市区" :value="model.ddr_text_Obj.addr_1"></u--input>
				</u-form-item>
				<u-form-item border-bottom prop="addr_text_obj.addr_2" label="详细地址:">
					<u--textarea height="200" border="none" disableDefaultPadding placeholder="街道门牌号" customStyle="padding: 1px;" :value="model.ddr_text_Obj.addr_2"></u--textarea>
				</u-form-item>
			</u-form>
		</view>
		<liu-choose-address ref="scroll" @change='chooseSuccess'></liu-choose-address>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model:{
					addr_text_Obj:{
						name:"",
						phone:"",
						workplace:"",
						addr_1:"",
						addr_2:""
					}
				},
				addr_containor:{
					province:"",
					city:"",
					district:""
				},
				rules:{
					
				}
			}
		},
		methods: {
			onFocus(e){
				e.preventDefault();
			},
			show_picker(){
				this.$refs.scroll.open()
			},
			chooseSuccess(e){
				let val = e.value;
				console.log(val);
				let province = val[0].label;
				let city = val[1].label;
				let district = val[2].label;
				let addr_text_obj = this.model.addr_text_Obj;
				addr_text_obj.addr_1 = `${province} ${city} ${district}`;
				console.log(addr_text_obj)
				this.model = {addr_text_obj};
				
				this.addr_containor = {
					province:val[0].value,
					city:val[1].value,
					district:val[2].value
				}
			}
		}
	}
</script>

<style lang="scss">
	.page_in{
		
	}
	.content{
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

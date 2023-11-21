<template>
	<view class="">
		<view class="content">
			<view class="u-flex-row unit_input">
				<text>姓名：</text>
				<u--input border="none" placeholder="请输入姓名" :value="addr_text_Obj.name"></u--input>
			</view>
			<view style="padding-left: 20upx; padding-right: 20upx;">
				<u-line color="gray"></u-line>
			</view>
			<view class="u-flex-row unit_input">
				<text>手机号：</text>
				<u--input border="none" placeholder="请输入手机号" :value="addr_text_Obj.phone"></u--input>
			</view>
			<view style="padding-left: 20upx; padding-right: 20upx;">
				<u-line color="gray"></u-line>
			</view>
			<view class="u-flex-row unit_input" @click.stop="show_picker">
				<text>省市区：</text>
				<u--input border="none" placeholder="请选择省市区" :value="addr_text_Obj.addr_1" readonly></u--input>
			</view>
			<view style="padding-left: 20upx; padding-right: 20upx;">
				<u-line color="gray"></u-line>
			</view>
			<view class="u-flex-row unit_input">
				<text>单位：</text>
				<u--input border="none" placeholder="请输入单位" :value="addr_text_Obj.workplace"></u--input>
			</view>
			<view style="padding-left: 20upx; padding-right: 20upx;">
				<u-line color="gray"></u-line>
			</view>
			<view class="u-flex-row unit_input">
				<text>详细地址：</text>
				<u--textarea height="200" border="none" disableDefaultPadding placeholder="请输入详细地址" customStyle="padding: 1px;" :value="addr_text_Obj.addr_2"></u--textarea>
			</view>
			<view style="padding-left: 20upx; padding-right: 20upx;">
				<u-line color="gray"></u-line>
			</view>
			<u-gap height="20"></u-gap>
			<u-button class="save_btn" color="#0081FF" text="保存"></u-button>
		</view>
		<liu-choose-address ref="scroll" @change='chooseSuccess'></liu-choose-address>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addr_text_Obj:{
					name:"",
					phone:"",
					workplace:"",
					addr_1:"",
					addr_2:""
				},
				addr_containor:{
					province:"",
					city:"",
					district:""
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
				let addr_text_obj = this.addr_text_Obj;
				addr_text_obj.addr_1 = `${province} ${city} ${district}`;
				console.log(addr_text_obj)
				this.addr_text_Obj = addr_text_obj;
				
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
		text{
			width: 160upx;
		}
		.unit_input{
			padding: 30upx;
		}
	}
</style>

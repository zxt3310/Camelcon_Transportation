<template>
	<view class="">
		<view class="content_view">
			<view class="ship_style">
				<view class="Icon" style="background-color: #0081FF;">寄</view>
				<view class="u-flex-row u-flex-between u-flex-grow">
					<text style="flex: 1; margin-left: 40upx;">{{ship_from}}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<u-line length="80%" margin="0 0 0 15%"></u-line>
			<u-line customStyle="position: absolute; left:8.5%; top:38%" direction="col" length="25%" color="gray" dashed></u-line>
			<view class="ship_style">
				<view class="Icon" style="background-color: #2EAD1C;">收</view>
				<view class="u-flex-row u-flex-between u-flex-grow">
					<text style="flex: 1; margin-left: 40upx;">{{ship_to}}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<view class="content_view" style="margin-top: 0;">
			<view class="ship_style u-flex-between u-flex-items-center">
				<view class="Icon" style="background-color: #F9AE3D;">票</view>
				<view class="u-flex-grow" style="margin-left: 40upx;">
					<view>{{`发票抬头：${invoice.title}`}}</view>
					<view>{{`税号代码：${invoice.code}`}}</view>
					<view>发票内容：运输服务费</view>
					<view class="" style="margin-top: 20upx;">
						<u-checkbox size="14px" icon-size="14px" label-size="20upx" label="需要明细单"></u-checkbox>
					</view>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			
		</view>
		<view class="content_view" style="margin-top: 0;">
			<view class="box_list_unit" v-for="(item, index) in unit_obj" :key="index">
				<view style="position: absolute; left:0,top:0; background-color: #0081FF; border-radius: 0 0 100% 0; padding:5upx 10upx 10upx 5upx; color: white;">
					{{`盒${index+1}`}}
				</view>
				<view class="box_content">
					<view class="u-flex-row">
						<u--text size="24" :text="`类别:${item.type}`"></u--text>
						<u--text size="24" :text="`性别:${item.sex}`"></u--text>
						<u--text size="24" :text="`数量:${item.qty}`"></u--text>
						<u--text size="24" :text="`周龄:${item.age}`"></u--text>
					</view>
					<view class="u-flex-row">
						<u--text size="24" :text="`品系:${item.name}`"></u--text>
						<u--text size="24" :text="`基因型:${item.gen}`"></u--text>
					</view>	
					<u--text size="24" :text="`备注:${item.des}`"></u--text>
				</view>
				<u-gap height="20" bg-color="#F4F7FC"></u-gap>
			</view>
			<u-button icon="plus-circle" :plain="true" type="primary" text="添加盒子"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ship_from:"请选择取货地址",
				ship_to:"请选择收货地址",
				invoice:{
					title:"请选择常用开票信息",
					code:""
				},
				unit_obj:[
					{type:"小鼠",name:"基因小鼠",sex:"公",qty:"6",age:"9周",gen:"B6;129-Tg",des:"测试说明"},
					{type:"小鼠",name:"基因小鼠",sex:"公",qty:"6",age:"9周",gen:"B6;129-Tg",des:"测试说明"},
					{type:"小鼠",name:"基因小鼠",sex:"公",qty:"6",age:"9周",gen:"B6;129-Tg",des:"测试说明"}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.content_view{
		margin: 40upx;
		background-color: white;
		border-radius: 20upx;
		position: relative;
	}
	.ship_style{
		/* height: 150upx; */
		display: flex;
		flex-direction: row;
		padding: 40upx;
		font-size: 15px;
		.Icon{
			width: 40upx;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			border-radius: 10upx;
			color: white;
			font-size: 12px;
		}
	}
	.box_list_unit{
		position: relative;
		font-size: 20upx;
		.box_content{
			padding: 30upx;
		}
	}
</style>

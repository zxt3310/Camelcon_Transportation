<template>
	<view class="">
		<view class="address_view">
			<view class="ship_style">
				<view class="Icon" style="background-color: #0081FF;">寄</view>
				<view class="u-flex-row u-flex-between u-flex-grow">
					<text style="flex: 1; font-size: 14px;">请选择地址</text>
					<text class="iconfont">&#xe605;</text>
				</view>
			</view>
			<u-line length="90%" margin="0 0 0 10%"></u-line>
			<view class="ship_style">
				<view class="Icon" style="background-color: #2EAD1C;">收</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ship_from:"请选择取货地址",
				ship_to:"请选择收货地址"
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.address_view{
		margin: 40upx;
		background-color: white;
		border-radius: 20upx;
		padding: 40upx;
	}
	.ship_style{
		/* height: 150upx; */
		display: flex;
		flex-direction: row;
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
</style>

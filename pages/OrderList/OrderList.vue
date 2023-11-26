<template>
	<view>
		<u-subsection fontSize="26" :list="['进行中','已完成']" :current="current" @change="onChange"></u-subsection>
		<u-button @click="jump"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				in_shipping_list:[],
				delivered_list:[]
			}
		},
		onLoad() {
			
		},
		methods: {
			onChange(index) {
				this.current = index;
			},
			jump() {
				uni.navigateTo({
					url: "/pages/OrderList/OrderDetail"
				})
			}
		}
	}
</script>

<style>

</style>
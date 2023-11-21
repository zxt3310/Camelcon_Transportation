<template>
	<view style="padding: 40upx;">
		<view class="addr_unit" v-for="(addr, index) in addr_list" :key="index">
			 <view class="">
			 	<text style="font-size: 14px;">{{addr.name}}</text>
				<text>{{addr.phone}}</text>
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addr_list:[
					{
						name:"",
						phone:"",
						workplace:"",
						addr_text:""
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.addr_unit{
		padding: 40upx
	}
</style>

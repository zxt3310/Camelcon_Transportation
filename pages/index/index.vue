<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title u-line-1">是日也，天朗气清，惠风和畅，仰观宇宙之大，俯察品类之盛</text>
			
		</view>
		<view class="">
			<u--input></u--input>
			<u-button type="primary">adsf</u-button>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},

		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		onLoad() {},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

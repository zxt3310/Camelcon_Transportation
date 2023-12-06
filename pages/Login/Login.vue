<template>
	<view style="width: 100%; height: 100%; background-color: white;">
		<!-- <view class="navigate">
			<text>请登录</text>
		</view> -->
		<view class="header">
			凯迈康动物运输-客户端
		</view>
		<view class="input_box">
			<u--input prefixIcon="phone-fill" placeholder="请输入手机号码" border="bottom"
				prefixIconStyle="font-size:22px" v-model="username"></u--input>
		</view>
		<view class="input_box">
			<u-input prefixIcon="lock-fill" placeholder="请输入验证码" border="bottom" prefixIconStyle="font-size:22px">
				<view slot="suffix">
					<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取"></u-code>
					<u-button @tap="getCode" :text="tips" type="primary" size="mini"></u-button>
				</view>
			</u-input>
		</view>
		<view style="padding: 0 80upx 0 80upx;">
			<u-button text="立即登录" color="#0081FF" type="primary" shape="circle" @click="startLogin"></u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips:"获取验证码",
				username:"17757574472",
				password:"12345678",
				captcha:"888888"
			};
		},
		onLoad() {
			uni.hideHomeButton()
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			change(e) {
				console.log('change', e);
			},
			startLogin(){
				let username = this.username;
				let password = this.password;
				let captcha = this.captcha;
				let data = {
					username,password,captcha
				}
				this.$store.dispatch('login',data).then(()=>{
					uni.reLaunch({
						url:'/pages/index/index'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.navigate{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		height: 88px;
		background-color: #0081FF;
		color: white;
		line-height: 40px;
		font-size: 14px;
	}
	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20%;
		text-align: center;
	}

	.input_box {
		padding: 0 80upx 0 80upx;
		margin-bottom: 40upx;
	}
</style>
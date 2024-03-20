<template>
	<view style="width: 100%; height: 100%; background-color: white;">
		<view class="header">
			凯迈康动物运输-客户端
		</view>
		<view class="input_box">
			<u-subsection :list="login_methods" :current="curNow" @change="sectionChange" fontSize="24"></u-subsection>
			<u--form :model="model" :rules="rules" ref="uForm">
				<u-form-item prop="data.mobile" borderBottom ref="item1">
					<u--input prefixIcon="phone-fill" placeholder="请输入手机号码" border="none"
						prefixIconStyle="font-size:22px" v-model="model.data.mobile"></u--input>
				</u-form-item>
				<block v-if="curNow==0">
					<u-form-item prop="data.password" borderBottom ref="item2">
						<u-input prefixIcon="lock-fill" placeholder="请输入密码" border="none"
							prefixIconStyle="font-size:22px" v-model="model.data.password">
							<template slot="suffix">
								<u-text size=24 type="primary" text="忘记密码" @click="ChangePwd"></u-text>
							</template>
						</u-input>
					</u-form-item>
				</block>
				<block v-if="curNow==1">
					<u-form-item prop="data.captcha" borderBottom ref="item2">
						<u-input prefixIcon="email-fill" placeholder="请输入验证码" border="none" prefixIconStyle="font-size:22px"
							v-model="model.data.captcha">
							<view slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取"></u-code>
								<u-button @tap="getCode" :text="tips" type="primary" size="mini"></u-button>
							</view>
						</u-input>
					</u-form-item>
				</block>
			</u--form>
		</view>
		<view style="padding: 0 80upx 0 80upx;">
			<u-button text="立即登录" color="#0081FF" type="primary" shape="circle" @click="submit"></u-button>
			<u-gap height="20"></u-gap>
			<u--text type="primary" align="right" size="25" text="没有账号？立即注册 >>>" @click="goToRegister"></u--text>
		</view>
	</view>
</template>

<script>
	import {sms_login, sms_send_code} from "@/api/login"
	export default {
		data() {
			return {
				tips: "获取验证码",
				curNow:0,
				login_methods:["密码登录","验证码登录"],
				model: {
					data: {
						mobile: "15500000005",
						password: "654321",
						type:1
					}
				},
				rules: {
					'data.mobile': [{
							type: 'number',
							required: true,
							message: '请填写手机号',
							trigger: ['blur', 'change'],
						},
						{
							message:"请正确填写手机号",
							pattern: /^(13[0-9]|14[579]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
							trigger: ['blur', 'change']
						}
					]
					// 'data.captcha': {
					// 	type: 'number',
					// 	required: true,
					// 	message: "请填写验证码",
					// 	trigger: ['blur', 'change']
					// }
				}
			};
		},
		onLoad() {
			uni.hideHomeButton()
		},
		onReady(){
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			sectionChange(index){
				this.curNow = index
				this.model.data.type = index +1
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					sms_send_code({
						cPhoneNumber:this.model.data.mobile,
						cCodeType:"wl.UserReg"
					}).then((res)=>{
						console.log(res)
					})
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
			submit() {
				this.$refs.uForm.validate().then(res => {
					this.$store.dispatch('login', this.model.data).then(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					})
				}).catch((error) => {
					console.log(error)
				})
			},
			goToRegister() {
				uni.navigateTo({
					url: "/pages/Login/Register"
				})
			},
			ChangePwd(){
				
			}
		}
	}
</script>

<style lang="scss">
	.navigate {
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
<template>
	<view style="width: 100%; height: 100%; background-color: white;">
		<view class="header">
		凯迈康动物运输-客户端
	</view>
		<view class="input_box">
			<u--form :model="model" :rules="rules" ref="uForm">
				<u-form-item prop="data.cMobile" borderBottom ref="item1">
					<u--input prefixIcon="phone-fill" placeholder="请输入手机号码" border="none"
						prefixIconStyle="font-size:22px" v-model="model.data.cMobile"></u--input>
				</u-form-item>
				<u-form-item prop="data.cPassword" borderBottom ref="item2">
					<u--input prefixIcon="lock-fill" type="password" placeholder="请输入密码" border="none" prefixIconStyle="font-size:22px"
						v-model="model.data.cPassword"></u--input>
				</u-form-item>
				<u-form-item prop="data.cSmsCode" borderBottom ref="item2">
					<u-input prefixIcon="email-fill" placeholder="请输入验证码" border="none" prefixIconStyle="font-size:22px"
						v-model="model.data.cSmsCode">
						<view slot="suffix">
							<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取"></u-code>
							<u-button @tap="getCode" :text="tips" type="primary" size="mini"></u-button>
						</view>
					</u-input>
				</u-form-item>
			</u--form>
		</view>
		<view style="padding: 0 80upx 0 80upx;">
			<u-button text="注册" color="#0081FF" type="primary" shape="circle" @click="submit"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		register, sms_send_code
	} from "@/api/login"
	export default {
		data() {
			return {
				tips: "获取验证码",
				model: {
					data: {
						cMobile: "",
						cPassword: "",
						cSmsCode:""
					}
				},
				rules: {
					'data.cMobile': [{
							type: 'number',
							required: true,
							message: '请填写手机号',
							trigger: ['blur', 'change'],
						},
						{
							message: "请正确填写手机号",
							pattern: /^(13[0-9]|14[579]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
							trigger: ['blur', 'change']
						}
					],
					'data.cPassword':{
						required: true,
						message: "请填写密码",
						trigger: ['blur', 'change']
					},
					'data.cSmsCode': {
						type: 'number',
						required: true,
						message: "请填写验证码",
						trigger: ['blur', 'change']
					}
				}
			};
		},
		onLoad() {
			uni.hideHomeButton()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			sectionChange(index) {
				this.curNow = index
				this.model.data.type = index + 1
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					sms_send_code({
						cPhoneNumber: this.model.data.cMobile,
						cCodeType: "wl.UserReg"
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
			submit() {
				this.$refs.uForm.validate().then(res => {
					register(this.model.data).then((res)=>{
						uni.$u.toast('注册成功');
						uni.navigateBack()
					})
				}).catch((error) => {
					console.log(error)
				})
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
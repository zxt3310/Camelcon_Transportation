<template>
	<view class="content">
		<view style="border-radius: 20upx; overflow: hidden;">
			<lonjin-form @submit="" :formData="formData" @uploadPicture="uploadPicture" @updateValue="updateValue"
				:config="config"></lonjin-form>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {},
				config: [{
						label: "投诉或建议",
						placeholder: "请留下您的宝贵意见或想投诉的问题",
						key: "content",
						type: "textarea"
					},
					{
						label: "上传图片(最多5张)",
						placeholder: '请上传图片',
						key: 'picture',
						type: 'pictureGroup',
						max: 5
					}
				]
			};
		},
		methods: {
			updateValue(val) {
				this.formData = val
			},
			uploadPicture(e) {
				console.log(e)
				// 如果 在formData中没有定义该字段，则需要进行深拷贝
				const data = JSON.parse(JSON.stringify(this.formData))
				if (data[e.key] && data[e.key].length) {
					data[e.key] = [...data[e.key], e.tempFiles[0].tempFilePath]
				} else {
					data[e.key] = [e.tempFiles[0].tempFilePath]
				}
				this.formData = JSON.parse(JSON.stringify(data))
				/* 如果定义了formData: {images: ''}，则不需要进行深拷贝 
				this.formData[e.key] = [...this.formData[e.key], ...e.tempFiles[0].tempFilePath]
				*/
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 40upx;
	}
</style>
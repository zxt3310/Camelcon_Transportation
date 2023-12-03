<template>
	<view class="">
		<lonjin-form @submit="submit" :formData="formData" @updateValue="updateValue" :config="config"></lonjin-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					type: "",
					name: "", 
					sex: "",
					qty: "",
					age: "",
					gen: "",
					des: ""
				},
				config:[
					{label:"类别", placeholder:"请输入类别", key:"type", type:"input", inputType:"text"},
					{label:"品系", placeholder:"请输入品系名称", key:"name", type:"input", inputType:"text"},
					{label:"性别", placeholder:"请输选择性别", key:"sex", type:"picker", options:[{label:"公",value:"公"},{label:"母",value:"母"}]},
					{label:"只数", placeholder:"请输入小鼠数量", key:"qty", type:"input", inputType:"number"},
					{label:"周龄", placeholder:"请输入周龄", key:"age", type:"input", inputType:"text"},
					{label:"基因型", placeholder:"请输入基因型", key:"gen", type:"input", inputType:"text"},
					{label:"备注", placeholder:"请输入", key:"des", type:"input", inputType:"text"},
					{label:"盒数", placeholder:"请输入多少盒", key:"box", type:"input", inputType:"number"}
				]
			};
		},
		methods:{
			updateValue(val){
				this.formData = val;
			},
			submit(val){
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				uni.navigateBack({
					success: () => {
						prevPage.$vm.pushin_List(val)
					}
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
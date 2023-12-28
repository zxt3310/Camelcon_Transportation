<template>
	<view class="">
		<lonjin-form :rules="rules" @submit="submit" :formData="formData" @updateValue="updateValue"
			:config="config"></lonjin-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					type: "",
					name: "",
					gender: "",
					quantity: "",
					age: "",
					gene_type: "",
					memo: "",
					box_num: ""
				},
				config: [{
						label: "类别",
						placeholder: "请输入类别",
						key: "type",
						type: "input",
						inputType: "text",
						verify: true
					},
					{
						label: "品系",
						placeholder: "请输入品系名称",
						key: "name",
						type: "input",
						inputType: "text",
						verify: true
					},
					{
						label: "性别",
						placeholder: "请输选择性别",
						key: "gender",
						type: "picker",
						options: [{
							label: "公",
							value: "1"
						}, {
							label: "母",
							value: "2"
						}],
						verify: true
					},
					{
						label: "只数",
						placeholder: "请输入小鼠数量",
						key: "quantity",
						type: "input",
						inputType: "number",
						verify: true
					},
					{
						label: "周龄",
						placeholder: "请输入周龄",
						key: "age",
						type: "input",
						inputType: "text",
						verify: true
					},
					{
						label: "基因型",
						placeholder: "请输入基因型",
						key: "gene_type",
						type: "input",
						inputType: "text",
						verify: true
					},
					{
						label: "备注",
						placeholder: "请输入",
						key: "memo",
						type: "input",
						inputType: "text"
					},
					{
						label: "盒数",
						placeholder: "请输入多少盒",
						key: "box_num",
						type: "input",
						inputType: "number",
						verify: true
					}
				],
				rules: {
					type: [{
						required: true,
						message: "请输入类别"
					}],
					name: [{
						required: true,
						message: "请输入品系名称"
					}],
					gender: [{
						required: true,
						message: "请选择性别"
					}],
					quantity: [{
						required: true,
						message: "请输入数量"
					}],
					age: [{
						required: true,
						message: "请输入周龄"
					}],
					gene_type: [{
						required: true,
						message: "请输入基因型"
					}],
					box_num: [{
						required: true,
						message: "请输入盒数"
					}]
				}
			};
		},
		methods: {
			updateValue(val) {
				this.formData = val;
			},
			submit(val) {
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
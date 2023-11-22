<template>
	<view>
		<u-subsection fontSize="26" :list="['进行中','已完成']" :current="current" @change="onChange"></u-subsection>
		<view class="">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0
			}
		},
		methods: {
			onChange(index){
				this.current = index;
			}
		}
	}
</script>

<style>

</style>

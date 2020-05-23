<template>
	<view class="hello">
		<view class="" v-html="data"></view>
	</view>
</template>

<script>
	import {UserModel} from "@/common/models/user.js"
	let userModel=new UserModel()
	export default{
		data() {
			return {
				data:''
			}
		},
		onLoad(res) {
			userModel.getRewardRules(data=>{
				this.data = data
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.hello{
		
	}
</style>

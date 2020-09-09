<template>
	<view class="" style="text-align: center;">
		<h2>{{contentTitle}}</h2>
		<view class="" @tap="getUserInfo">
			{{pushContent}}
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {
		getCommAppid
	} from '@/common/getCommAppId'
	export default {
		components: {
			uniLoadMore
		},

		data() {
			return {
				pushContentId: '',
				contentTitle: '',
				pushContent: ''
			}
		},
		onLoad(options) { 
			this.pushContentId = options.pushContentId
			console.log(this.pushContentId)
		},
		onShow() {
			this.getUserInfo(this.pushContentId)
		},
		methods: {

			getUserInfo(pushContentId) {
				let that = this
				console.log(1111)
				uni.request({
					url: 'https://sgz.ttshzg.com/app/pushContent/getPushContentById?pushContentId=' + pushContentId, //
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'token': that.token || ''
					},
					success(res) {
						// console.log(res.data.data.contentTitle)
						that.contentTitle = res.data.data.contentTitle
						that.pushContent = res.data.data.pushContent
					}
				})
			},
		}
	}
</script>

<style>
</style>

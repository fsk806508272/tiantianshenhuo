<template>
	<view>
		<textarea placeholder="快快分享你的" v-model="content" placeholder-style="color:#A0A0A0"></textarea>
		<publish-image :photos="goods_photos" @changes="goodsPhoto"></publish-image>
		<view class="submit-button" @tap="submit">确认发布</view>
	</view>
</template>

<script>
	import publishImage from '@/components/publishImage.vue'
	export default{
		data(){
			return{
				content:'',
				goods_photos: [],
				
			}
		},
		components: {
			publishImage
		},
		methods: {
			goodsPhoto(e){
				this.goods_photos = e;
			},
			submit(){
				if(this.content==''){
					uni.showToast({
						title:'请输入分享内容',
						icon:'none',
						duration:1500
					})
					return
				}
				let req = {}
				req.dynamicContent = this.content
				if(this.goods_photos.length>0){
					let image = this.goods_photos.join(',')
					req.dynamicPicture = image
				}
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbUserDynamic/addUserDynamic',
					data:req,
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded',
						'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzU1NDY0OTMsInVzZXJuYW1lIjoiYjkzYTQ5M2Q2YzExNDg5MjkwNDY0MmQ0M2RlMmQxMzUifQ.-n-jJ03mj9iMJxSjl2NNzZI9JwZtNPKxEzZ5hYvR4kg'	 
					},
					success(res){
						uni.showToast({
							title:'发布成功',
							duration:1500,
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1500)
					}
				})
			}
		},
	}
</script>

<style>
textarea{
	width:750rpx;
	padding:20rpx;
	background-color: #fff;
}
</style>

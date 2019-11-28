<template>
	<view>
		<bavigationbar></bavigationbar>
		<view class="storeInfo">
			<image src="/static/cut/alipay.png"></image>
			<view class="rt">
				<view class="title">
					<view class="titlecontent">
						<view>海底捞火锅店</view>
						<image src="/static/cut/company_cer.png"></image>
					</view>
					<image src="/static/cut/no_collect.png"></image>
				</view>
				<view class="score">
					<image src="/static/cut/star_off.png"></image>
					<text class="gray">店铺总评分</text>
				</view>
				<view class="address">
					<image src="/static/cut/grayloca.png"></image>
					<text class="gray">深圳市龙岗区龙翔大道9002号志联佳大厦508</text>
				</view>
			</view>
		</view>
		<view class="list_box">
			<view class="left">
				<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
					<view class="item" 
						v-for="(item,index) in leftArray"
						:key="index" 
						:class="{ 'active':index==leftIndex }" 
						:data-index="index"
						@tap="leftTap"
					>{{item}}</view>
				</scroll-view>
			</view>
			<view class="main">
				<!-- <view class="tips" v-if="mainArray.length>0" :style="{ 'top':tipsTop }">{{mainArray[leftIndex].title}}</view> -->
				<scroll-view  scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto" scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
					<view class="item" v-for="(item,index) in mainArray" :key="index" :id="'item-'+index">
						<view class="title">
							<view>{{item.title}}</view>
						</view>
						<view class="goods" v-for="(item2,index2) in item.list" :key="index2">
							<image :src="item2.smallPic" mode=""></image>
							<view class="content">
								<view class="goodsTitle">{{item2.goodsName}}</view>
								<!-- <view class="describe">第{{index2+1}}个商品的描述内容</view> -->
								<view class="money">{{item2.price}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>

</template>

<script>
	import bavigationbar from "@/components/bavigation-bar.vue"
	import {LikeModel} from '@/common/models/like.js'
	import {StoreModel} from '@/common/models/store.js'
	const Likemodel = new LikeModel()
	const storemodel = new StoreModel()
	export default{
		components:{
			bavigationbar
		},
		data() {
			return {
				scrollHeight:'500px',
				leftArray:[],
				mainArray:[],
				topArr:[],
				leftIndex:0,
				isMainScroll:false,
				scrollInto:'',
				tipsTop:'0px',
				top:'',
				goodsList:[]
			}
		},
		onLoad(){
			uni.getSystemInfo({
				success:(res)=>{
					/* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
					this.scrollHeight=`${res.windowHeight}px`;
				}
			});
		},
		computed:{
			
		},
		mounted(){
			this.getListData();
		},
		methods: {
			/* 获取列表数据 */
			getListData(){
				/* 因无真实数据，当前方法模拟数据 */
				let [left,main]=[[],[]];
				storemodel.getShopGoods({sellerId:'84a44f0e04c24ae08ff49bfe14a074c0'},(data)=>{
					this.goodslist = []
					for(let i of data){
						if(i.goodsList.length!=0){
							this.goodsList.push(i)
						}
					}
					console.log(this.goodsList)
					for(let i of this.goodsList){
						left.push(i.name);
						
						let list=[];
						for(let j of i.goodsList){
							list.push(j);
						}
						main.push({
							title:`${i.name}`,
							list
						})
					}
					this.leftArray=left;
					
					this.mainArray=main;
					console.log(this.mainArray)
					
					this.$nextTick(()=>{
						this.getElementTop();	
					});
				})
				
			},
			/* 获取元素顶部信息 */
			getElementTop(){
				/* Promise 对象数组 */
				let p_arr=[];
				
				/* 新建 Promise 方法 */
				let new_p=(selector)=>{
					return new Promise((resolve,reject)=>{
						let view = uni.createSelectorQuery().select(selector);
						view.boundingClientRect(data => {
							resolve(data.top)
						}).exec();
					})
				}
				
				/* 遍历数据，创建相应的 Promise 数组数据 */
				this.mainArray.forEach((item,index)=>{
					p_arr.push(new_p(`#item-${index}`));
				});
				console.log(p_arr)
				
				/* 主区域滚动容器的顶部距离 */
				new_p("#scroll-el").then((res)=>{
					let top = res;
					// #ifdef H5
					top+=43;	//因固定提示块的需求，H5的默认标题栏是44px
					// #endif
					this.top = top
					console.log(this.top)
					/* 所有节点信息返回后调用该方法 */
					Promise.all(p_arr).then((data)=>{
						this.tipsTop=`${top}px`;
						this.topArr=data;
					});
				})
			},
			/* 主区域滚动监听 */
			mainScroll(e){
				if(!this.isMainScroll){
					return;
				}
				let top =e.detail.scrollTop + this.top;
				let index=-1;
				
				if(top>=this.topArr[this.topArr.length-1]){
					index=this.topArr.length-1;
				}else{
					index=this.topArr.findIndex((item,index)=>{
						return this.topArr[index+1] >= top;
					});
				}
				this.leftIndex=(index < 0 ? 0: index);
			},
			/* 主区域触摸 */
			mainTouch(){
				this.isMainScroll=true;
			},
			/* 左侧导航点击 */
			leftTap(e){
				let index=e.currentTarget.dataset.index;
				this.isMainScroll=false;
				this.leftIndex=Number(index);
				this.scrollInto=`item-${index}`;
				
			}
		}
	}
</script>

<style lang="scss">
	
	.storeInfo{
		margin-top: 20rpx;
		display: flex;
		background-color: #fff;
		padding:30rpx 20rpx;
		image{
			width:120rpx;
			height:120rpx;
		}
		.rt{
			width:570rpx;
			margin-left: 20rpx;
			.title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.titlecontent{
					display: flex;
					align-items: center;
					image{
						width:24rpx;
						height:24rpx;
					}
					view{
						font-size:34rpx;
						color:rgba(60,60,60,1);
					}
				}
				image{
					width:41rpx;
					height:34rpx;
				}
			}
			.score{
				display: flex;
				align-items: center;
				image{
					width:25rpx;
					height:23rpx;
					margin-right: 10rpx;
				}
			}
			.address{
				display: flex;
				align-items: center;
				image{
					width:21rpx;
					height:25rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
.list_box{
	display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
	font-size: 28rpx;
	
	.left{
		width: 200rpx;
		background-color: #f6f6f6;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		
		.item{
			padding-left: 20rpx;
			position: relative;
			&:not(:first-child) {
				margin-top: 1px;
			
				&::after {
					content: '';
					display: block;
					height: 0;
					border-top: #d6d6d6 solid 1px;
					width: 620upx;
					position: absolute;
					top: -1px;
					right: 0;
					transform:scaleY(0.5);	/* 1px像素 */
				}
			}
			
			&.active,&:active{
				color: #42b983;
				background-color: #fff;
			}
		}
	}
	.main{
		background-color: #fff;
		padding-left: 20rpx;
		width: 0;
		flex-grow: 1;
		box-sizing: border-box;
		
		.tips{
			line-height: 64rpx;
			font-size: 24rpx;
			font-weight: bold;
			color: #666;
			height: 64rpx;
			position: fixed;
			top: 44px;
			right: 0;
			width: 530rpx;
			z-index: 10;
			background-color: #fff;
			padding-left: 10rpx;
		}
		
		.title{
			line-height: 64rpx;
			position: relative;
			font-size: 24rpx;
			font-weight: bold;
			color: #666;
			height: 64rpx;
		}
		
		.item{
			margin-bottom: 20rpx;
		}
		
		.goods{
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin-bottom: 10rpx;
			.content{
				height: 120rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			&>image{
				width: 120rpx;
				height: 120rpx;
				margin-right: 16rpx;
			}
			
			.goodsTitle{
				width:350rpx;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
			.describe{
				font-size: 24rpx;
				color: #999;
			}
			
			.money{
				font-size: 24rpx;
				color: skyblue;
			}
		}
	}
}
</style>

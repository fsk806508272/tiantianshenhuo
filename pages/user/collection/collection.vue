<template>
	<view>
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in collectionType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		
		<view v-if="tabbarIndex == 0" class="provideList"> 
			<block v-for="(row,index) in provideList" :key="index">
				<view class="item">
					<view class="image">
						<image :src="row.smallPic"></image>
					</view>
					
					<view class="detail">
						<view class="title col2">{{row.goodsName}}</view>
						<view class="price">
							<view class="singlePrice">￥<text>{{row.price}}</text></view>
							<view class="sales">月售{{row.monthSale}}</view>
							<view class="deliver">配送费￥{{row.postFee}}</view>
						</view>
					</view>
					
					<view class="like" @tap="delCollectGoods(row.id)">
						<image src="/static/cut/collected.png"></image>
					</view>
				</view>
			</block>
		</view>
		
		<!-- <view v-if="tabbarIndex == 1" class="needList">
			<block v-for="(item,index) in needList" :key="index">
				<view class="container">
					<view class="top">
						<view class="icon">
							<image :src="item.icon"></image>
						</view>
						<view class="info">
							<view class="firstContainer">
								<view>{{item.name}}</view>
								<image src="/static/cut/personal_cer.png"></image>
							</view>
							<view class="secondContainer">
								<image src="/static/cut/star_on.png"></image>
								<view>{{item.stars}}</view>
								<view>享受服务：{{item.times}}次</view>
							</view>
						</view>
						<view class="like">
							<image src="/static/cut/collected.png"></image>
						</view>
					</view>
					<view class="middle">
						<view class="needfor">
							<image src="/static/cut/zu.png"></image>
							<view class="text">我现需要：{{item.needs}}</view>
						</view>
						<view class="serviceTime">
							<image src="/static/cut/time.png"></image>
							<view class="text">服务时间：{{item.serviceTime}}</view>
						</view>
						<view class="location">
							<image src="/static/cut/location.png"></image>
							<view class="text">服务地点：{{item.servicePlace}}</view>
						</view>
					</view>
					<view class="bottom">
						<view class="release">{{item.release}}</view>
						<view class="whiteButton">联系TA</view>
						<view class="yellowButton">立即抢单</view>
					</view>
				</view>
			</block>
		</view> -->
		
		
		<view v-if="tabbarIndex == 1" class="storeList">
			<block v-for="(item,index) in storeList" :key="index">
				<view class="row">
					<view class="storeImage">
						<image :src="item.logoPic"></image>
					</view>
					<view class="storeInfo">
						<view class="title">
							<view>{{item.nickName}}</view>
							<image src="/static/cut/company_cer.png"></image>
						</view>
						<view class="address">地址：{{item.address}}</view>
						<view class="stars">
							<block v-for="(score,idx) in starIndex" :key="idx">
								<image :src="item.mainScore>idx?starSrc:''"></image>
							</block>
							<view>{{item.mainScore}}</view>
						</view>
					</view>
					<view class="like" @tap="delCollectShop(item.sellerId)">
						<image src="/static/cut/collected.png"></image>
					</view>
				</view>
				
			</block>
		</view>
		
		<view v-if="tabbarIndex == 2" class="vipcardList provideList">
			<block v-for="(row,index) in vipcardList" :key="index">
				<view class="item">
					<view class="image">
						<image :src="row.firstPictures"></image>
					</view>
					
					<view class="detail">
						<view class="title col2">{{row.title}}</view>
						<view class="price">
							<view class="singlePrice">
								<block v-if="row.cardType==1">
									<text>免费办理</text>
								</block>
								<block v-else>
									￥<text>{{row.price}}</text>
								</block>
							</view>
							<view class="sales">办理人数{{row.totalSale}}</view>
						</view>
					</view>
					
					<view class="like" @tap="delCollectCard(row.cardId)">
						<image src="/static/cut/collected.png"></image>
					</view>
				</view>
			</block>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import {LikeModel} from '@/common/models/like.js'
	let Likemodel=new LikeModel()
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
export default{
	components:{
		uniLoadMore
	},
	data(){
		return{
			page:1,
			loadingType:"",
			tabbarIndex:0,
			headerPosition:"fixed",
			headerTop:"0px",
			collectionType:['提供','店铺','会员卡'],
			provideList:[
				// {
				// 	"title":"环日液化石油气5kg 即买即送送货到家",
				// 	"img":"/static/goods/p8.jpg",
				// 	"price":129.9,
				// 	"deliver":5,
				// 	"sales":24
				// }
			],
			needList:[
				// {
				// 	name:'陈达欧',
				// 	stars:4.2,
				// 	icon:'/static/cut/stan.png',
				// 	times:10,
				// 	needs:'一罐5KG煤气罐',
				// 	serviceTime:'3月11日',
				// 	servicePlace:'广东省深圳市龙岗区志联佳大厦508号',
				// 	release:'2018年10月15日 15：30'
				// }
			],
			storeList:[
				// {
				// 	"title":"美宜佳便利店",
				// 	"img":"/static/goods/p8.jpg",
				// 	"stars":4.3,
				// 	"address":'深圳市龙岗区龙翔大道9002号志联佳大厦508',
				// 	"sales":24
				// }
			],
			vipcardList: [],
			starIndex:[0,1,2,3,4],
			starSrc:'/static/cut/star_on.png',
		}
	},
	onLoad:function(option){
		
		//兼容H5下排序栏位置
		// #ifdef H5
			//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
			let Timer = setInterval(()=>{
				let uniHead = document.getElementsByTagName('uni-page-head');
				if(uniHead.length>0){
					this.headerTop = uniHead[0].offsetHeight+'px';
					clearInterval(Timer);//清除定时器
				}
			},1);
		// #endif
	},
	onShow(){
		this.getCollectgood(this.page)
		this.getCollectshop(this.page)
		this.getCollectcard(this.page)
	},
	onReady (){
		
	},
	onReachBottom (){
		this.page++
		this.getCollectgood(this.page)
	},
	methods:{
		getCollectgood(page){
			Likemodel.getCollectgood(page,(data)=>{
				console.log(data)
				this.provideList=this.provideList.concat(data)
				console.log(this.provideList);
			})
		},
		getCollectshop(page){
			Likemodel.getCollectshop(page,(data)=>{
				this.storeList=this.storeList.concat(data)
				console.log(this.storeList);
			})
		},
		getCollectcard(page){
			Likemodel.getCollectcard(page,(data)=>{
				this.vipcardList=this.storeList.concat(data)
				console.log(this.vipcardList);
			})
		},
		delCollectGoods(id){
			Likemodel.like(id,false,(datas)=>{
				Likemodel.getCollectgood(1,(data)=>{
					this.provideList=data
				})
			})
		},
		delCollectShop(sellerId){
			Likemodel.likeShop(sellerId,false,(datas)=>{
				Likemodel.getCollectshop(1,(data)=>{
					this.storeList=data
				})
			})
		},
		delCollectCard(cardId){
			Likemodel.deleteCard(cardId,(datas)=>{
				Likemodel.getCollectcard(1,(data)=>{
					this.vipcardList=data
				})
			})
		},
		showType(tbIndex){
			this.tabbarIndex = tbIndex;
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.topTabBar{
	margin-top:1rpx;
	position:fixed;
	z-index: 10;
	top:0;
	width:100%;
	height:64rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	.grid{
		width:20%;
		height:64rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		color:#787878;
		font-size:24rpx;
		.text{
			height:62rpx;
			display: flex;
			align-items: center;
			&.on{
				color: #FF6600;
				border-bottom: solid 4rpx #FF6600;
			}
		}
	}
}

.provideList{
	margin-top:75rpx;
	.item{
		background-color: #fff;
		margin-top:10rpx;
		height:220rpx;
		width:100%;
		display: flex;
		.image{
			width:200rpx;
			padding:30rpx 19rpx 30rpx 20rpx;
			image{
				width:160rpx;
				height:160rpx;
				border-radius:10rpx;
			}
		}
		.detail{
			margin-top:39rpx;
			width:378rpx;
			.title{
				font-size:26rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
			}
			.price{
				margin-top:42rpx;
				display: flex;
				align-items: center;
				.sales,.deliver{
					margin-left: 39rpx;
					font-size:22rpx;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(180,180,180,1);
				}
				.singlePrice{
					text{
						font-family:Source Han Sans CN;
						font-size:34rpx;
						color:#FF6600;
					}
				}
			}
		}
		.like{
			padding:50rpx 30rpx 0 102rpx; 
			image{
				width:41rpx;
				height:34rpx;
			}
		}
		
	}
}

.needList{
	margin-top:75rpx;
	.container{
		background-color: #fff;
		height:436rpx;
		margin-top:10rpx;
		.top{
			height:158rpx;
			display: flex;
			.icon{
				width:108rpx;
				padding-top: 40rpx;
				padding-left: 20rpx;
				image{
					width:88rpx;
					height:88rpx;
					border-radius:10rpx;
				}
			}
			.info{
				width:500rpx;
				padding-left: 21rpx;
				padding-top: 46rpx;
				.firstContainer{
					display: flex;
					align-items: center;
					image{
						width:24rpx;
						height:23rpx;
					}
					view{
						font-size:34rpx;
						font-family:Source Han Sans CN;
						font-weight:500;
						color:rgba(60,60,60,1);
					}
				}
				.secondContainer{
					display: flex;
					align-items: center;
					image{
						width:25rpx;
						height:23rpx;
					}
					view{
						margin-left: 10rpx;
					}
				}
			}
			.like{
				width:142rpx;
				padding-top:50rpx;
				padding-left:50rpx;
				image{
					width:41rpx;
					height:34rpx;
				}
			}
		}
		.middle{
			height:157rpx;
			background-color: #FAFAFA;
			margin:0 20rpx;
			padding-top: 22rpx;
			padding-left: 21rpx;
			.text{
				margin-left:23rpx;
				font-size:26rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
			}
			.needfor{
				display: flex;
				align-items: center;
				image{
					width:24rpx;
					height:24rpx;
				}
			}
			.serviceTime{
				display: flex;
				align-items: center;
				image{
					width:24rpx;
					height:24rpx;
				}
				
			}
			.location{
				display: flex;
				align-items: center;
				image{
					width:21rpx;
					height:25rpx;
				}

			}
		}
		.bottom{
			height:121rpx;
			display: flex;
			align-items: center;
			.release{
				margin-left: 19rpx;
				font-size:24rpx;
				font-family:Source Han Sans CN;
				color:rgba(160,160,160,1);
			}
			.whiteButton{
				margin-left: 100rpx;
			}
			.yellowButton{
				margin-left: 19rpx;
			}
			
		}
	}
}

.storeList{
	margin-top: 75rpx;
	.row{
		margin-top:10rpx;
		display: flex;
		height:210rpx;
		background-color: #fff;
		
		.storeImage{
			width:140rpx;
			padding: 30rpx 0 60rpx 20rpx;
			image{
				width:120rpx;
				height:120rpx;
				border-radius:10rpx;
			}
		}
		.storeInfo{
			width:539rpx;
			padding-top: 32rpx;
			padding-left: 20rpx;
			.title{
				display: flex;
				align-items: center;
				view{
					font-size:34rpx;
					font-family:Source Han Sans CN;
					font-weight:500;
					color:rgba(60,60,60,1);
				}
				image{
					width:24rpx;
					height:24rpx;
				}
			}
			.address{
				width:424rpx;
				font-size:24rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(160,160,160,1);
				line-height:30rpx;
			}
			.stars{
				display: flex;
				align-items: center;
				image{
					width:25rpx;
					height:23rpx;
				}
				view{
					margin-left: 10rpx;
					font-size:26rpx;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(255,102,0,1);
				}
			}
		}
		.like{
			width:71rpx;
			padding-top: 50rpx;
			image{
				width:41rpx;
				height:34rpx;
			}
		}
	}
}

.title.col2{
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	word-break: break-all;
}
</style>

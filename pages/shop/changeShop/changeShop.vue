<template>
	<view class="all">
		<!-- 服务商子类 -->
		<view class="all-head">
			
			<!-- 服务商子类 -->
			<view class="all-header">
				<view class="all-header-h1">服务商子类</view>
				<view class="all-header-cont">
					<view @click="changeChild(index)" :class="item.onoff?'select-view':''" v-for="(item,index) in childClassList" :key="index">
						{{ item.title }}
					</view>
				</view>
			</view>
			
			<!-- 基本信息 -->
			<view class="all-news">
				<view class="all-news-h1">基本信息</view>
				<view class="all-news-cont">
					<view class="all-news-content" v-for="(item,index) in newsList" :key="index">
						<text :class="item.must?'must-input':''">{{ item.title }}</text>
						<view class="all-news-content-right">
							<em v-if="index === 1 || index === 3">￥</em> <input :value="item.val" :type="item.type" :placeholder="item.place">
						</view>
					</view>
				</view>
			</view>
			
			<!-- 店铺内商品所属分类 -->
			<view class="all-class">
				<view class="all-class-h1">
					店铺内商品所属分类
				</view>
				<view class="all-class-cont">
					<view class="all-class-cont-left">
						已有分类
					</view>
					<view class="all-class-cont-right">
						<view @click="changeClass(index)" :class="cate_idx==index?'select-view':''" v-for="(item,index) in cateList" :key="index">
							{{item}}
						</view>
					</view>
				</view>
			</view>
			
			<!-- 设置规格 -->
			<view class="all-set">
				<view class="all-set-h1">设置规格</view>
				
				<view class="all-set-cont">
					<view class="all-set-content" v-for="(item,index) in addNormList" :key="index">
						<view class="all-set-content-left">
							<image :src="item.src"></image>
						</view>
						<view class="all-set-content-center">
							<view class="center1">规格名：<input type="text" :placeholder="item.namePlace"></input></view>
							<view class="center2">
								<view>单价：<input type="number" :placeholder="item.pricePlace"></input></view>
								<view>库存：<input type="number" :placeholder="item.inventoryPlace"></input></view>
							</view>
						</view>
						<view @click="addSet" class="all-set-content-right" v-if="index === 0">
							<view class="add">+</view>
							<em>添</em>
							<em>加</em>
						</view>
						<view @click="delSet(index)" class="del-right" v-if="index !== 0">
							<image src="../../../static/cut/user/del.png"></image>
							<em>删</em>
							<em>除</em>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 相关图片 -->
			<view class="all-about">
				<view class="all-about-h1">
					相关图片（注:第一张为主图,限6张）
				</view>
				
				<scroll-view class="scroll-view" scroll-x="true">
					
					<view class="scroll-view-all" v-for="(item,index) in imgList" :key="index">
						<image src="../../../static/cut/upload_photo.png"></image>
						<view class="scroll-view-bottom">
							<image src="../../../static/cut/cancel.png"></image>
						</view>
					</view>
					
					<view class="scroll-view-all">
						<image @click="addImg" src="../../../static/cut/upload_photo.png"></image>
					</view>
					
				</scroll-view>
			</view>
		</view>
		<view class="all-btn">
			保存
		</view>
	</view>
</template>

<script>
	import {ProvideModel} from '@/common/models/provide.js'
	import {StoreModel} from '@/common/models/store.js'
	let provideModel=new ProvideModel()
	let storeModel = new StoreModel()
	export default {
		data() {
			return {
				childClassList:[],
				newsList:[{
					title:'商品标题',
					must:true,
					place:"请输入商品标题",
					type:'text',
					val:''
				},{
					title:'商品价格',
					must:true,
					place:"请输入商品价格",
					type:'number',
					val:''
				},{
					title:'服务范围',
					must:false,
					place:"例如:20KM以内",
					type:'text',
					val:''
				},{
					title:'定配送费',
					must:false,
					place:"请输入配送费",
					type:'number',
					val:''
				}],
				classList:[{
					title:"汽水饮料",
					onoff:false,
				},{
					title:"生活用品",
					onoff:false,
				},{
					title:'生活用品',
					onoff:false,
				},{
					title:"汽水饮料123",
					onoff:false,
				}],
				addNormList:[{
					src:'',
					name:'',
					namePlace:'请输入规格名',
					price:'',
					pricePlace:'例:20',
					inventory:'',
					inventoryPlace:'例:20',
					type:0,
				}],
				cateList:[],
				cateIdList:[],
				cate_idx:null,
				addData:{
					src:'../../../static/cut/upload_photo.png',
					name:'',
					namePlace:'请输入规格名',
					price:'',
					pricePlace:'例:20',
					inventory:'',
					inventoryPlace:'例:20',
					type:1,
				},
				imgList:[],
				id:null,
				news:{},
				data:'',
				firstTypeId:'',
				firstType:''
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.firstTypeId = options.type
			console.log(options)
			if(options.type==1){
				this.firstType = '房屋'
			}else if(options.type==3){
				this.firstType = '家政'
			}else if(options.type==5){
				this.firstType = '金融'
			}else if(options.type==8){
				this.firstType = '生活'
			}else if(options.type==9){
				this.firstType = '维修'
			}else if(options.type==10){
				this.firstType = '代购'
			}
			console.log(this.firstType)
			this.getCateList()
		},
		methods:{
			getCateList(){
				provideModel.getSecondType({type:2,firstType:this.firstType},data=>{
					console.log(data)
					console.log(this.data.goods)
					data.forEach(item =>{
						let onoff = false;
						if( item.secondtypeinfoId === this.data.goods.goodsSecondtype ){
							onoff = true;
						}
						let obj = {
							title:item.name,
							onoff,
						};
						this.childClassList.push(obj);
					})
				})
				
				provideModel.getItemDetail({goodsId:this.id},data=>{
					console.log(data)
					this.data = data
					this.newsList[0].val = data.goods.goodsName;
					this.newsList[1].val = data.goods.price;
					this.newsList[2].val = data.goods.city;
					this.newsList[3].val = data.goods.bookingMoney;
					this.addNormList[0].src = this.news.smallPic;
					provideModel.checkSellerGroup((data)=>{
						this.cateList = []
						this.cateIdList = []
						for(let i in data){
							this.cateList.push(data[i].name)
							this.cateIdList.push(data[i].id)
							if(this.data.goods.sellerGroupId==data[i].id){
								this.cate_idx = i
							}
						}
					})
					// provideModel.checkSellerGroup(res =>{
					// 	res.forEach(item =>{
					// 		let onoff = false;
					// 		if( item.id === this.data.goods.sellerGroupId ){
					// 			onoff = true;
					// 		}
					// 		let obj = {
					// 			title:item.name,
					// 			onoff,
					// 		};
					// 		this.childClassList.push(obj);
					// 	})
					// })
				})
				
				
				
				
			},
			// inits(){
			// 	provideModel.getItemDetail({goodsId:this.id},data=>{
			// 		this.data = data
			// 		this.newsList[0].val = data.goods.goodsName;
			// 		this.newsList[1].val = data.goods.price;
			// 		this.newsList[2].val = data.goods.city;
			// 		this.newsList[3].val = data.goods.bookingMoney;
			// 		this.addNormList[0].src = this.news.smallPic;
					// provideModel.checkSellerGroup(res =>{
					// 	res.forEach(item =>{
					// 		let onoff = false;
					// 		if( item.id === this.data.goods.sellerGroupId ){
					// 			onoff = true;
					// 		}
					// 		let obj = {
					// 			title:item.name,
					// 			onoff,
					// 		};
					// 		this.childClassList.push(obj);
					// 	})
					// })
				// })
				
				// storeModel.getShopGoods({sellerId:this.news.sellerId },(res) =>{
				// 	console.log(res);
				// })
			// },
			changeChild(index){
				this.childClassList.forEach(item =>{
					item.onoff = false;
				});
				this.childClassList[index].onoff = true;
			},
			changeClass(index){
				this.cate_idx = index;
			},
			addSet(){
				this.addNormList.push(this.addData);
			},
			delSet(index){
				this.addNormList.splice(index,1);
			},
			addImg(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.all{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		&-head{
			flex: 1;
			background-color: #f2f2f2;
			overflow: scroll;
		}
		&-btn{
			height: 100rpx;
			background:linear-gradient(to right,#FF9130,#FF6600);
			line-height: 100rpx;
			text-align: center;
			font-size: 32rpx;
			color: white;
		}
		&-header{
			margin-top: 20rpx;
			background-color: white;
			&-h1{
				font-size: 25rpx;
				line-height: 74rpx;
				padding-left: 19rpx;
			}
			&-h1::before{
				content: '*';
				color: red;
			}
			&-cont{
				padding: 0 19rpx;
				view{
					display: inline-block;
					vertical-align: top;
					padding: 14rpx 36rpx;
					border-radius: 8rpx;
					background-color: #DCDCDC;
					margin-left: 20rpx;
					margin-bottom: 20rpx;
					font-size: 24rpx;
					color: #A0A0A0;
					border: 1rpx solid #DCDCDC;
				}
				.select-view{
					background-color: white;
					border-color: #FF6600;
					color: #FF6600;
				}
			}
		}
		&-news{
			&-h1{
				font-size: 22rpx;
				color: #787878;
				line-height: 70rpx;
				padding-left: 19rpx;
			}
			&-cont{
				background-color: white;
			}
			&-content{
				height: 84rpx;
				line-height: 84rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				display: flex;
				text{
					color: #646464;
				}
				text::before{
					content: '*';
					color: transparent;
				}
				.must-input::before{
					content: '*';
					color: red;
				}
				&-right{
					flex: 1;
					margin-left: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #1E1E1E;
					em{
						font-style: normal;
						font-size: 20rpx;
					}
					input{
						flex: 1;
						font-size: 20rpx;
						color: #1E1E1E;
					}
				}
			}
			&-content{
				border-bottom: 1rpx solid #DCDCDC;
			}
		}
		&-class{
			background-color: white;
			margin-top: 20rpx;
			&-h1{
				font-size: 25rpx;
				margin: 0 20rpx;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #DCDCDC;
			}
			&-cont{
				display: flex;
				margin: 30rpx 20rpx 0;
				padding-bottom: 20rpx;
				&-left{
					font-size: 23rpx;
					color: #A0A0A0;
					width: 134rpx;
				}
				&-right{
					flex: 1;
					view{
						display: inline-block;
						vertical-align: top;
						padding: 14rpx 24rpx;
						border: 1rpx solid #C8C8C8;
						border-radius: 8rpx;
						margin-right: 30rpx;
						margin-bottom: 20rpx;
						font-size: 24rpx;
						color: #646464;
					}
					.select-view{
						background-color: white;
						border-color: #FF6600;
						color: #FF6600;
					}
				}
			}
		}
		&-set{
			background-color: white;
			margin-top: 20rpx;
			&-h1{
				font-size: 25rpx;
				margin: 0 20rpx;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #DCDCDC;
			}
			&-content{
				display: flex;
				padding: 0 20rpx 60rpx;
				margin-top: 20rpx;
				&-left{
					margin-right: 20rpx;
					border: 1rpx dashed #C0C0C0;
					border-radius: 8rpx;
					width: 158rpx;
					height: 158rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				&-center{
					margin-right: 30rpx;
					flex: 1;
					.center1{
						padding: 0 20rpx;
						height: 64rpx;
						border: 1rpx solid #A0A0A0;
						border-radius: 8rpx;
						display: flex;
						align-items: center;
						input{
							flex: 1;
							font-size: 25rpx;
						}
					}
					.center2{
						height: 64rpx;
						margin-top: 32rpx;
						display: flex;
						view{
							flex: 1;
							border-radius: 8rpx;
							border: 1rpx solid #A0A0A0;
							display: flex;
							padding: 0 20rpx;
							align-items: center;
							input{
								flex: 1;
								font-size: 25rpx;
							}
						}
						view:first-of-type{
							margin-right: 10rpx;
						}
					}
				}
				&-right{
					width: 70rpx;
					height: 160rpx;
					background: linear-gradient(#FF9130,#FF6600);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border: 1rpx solid transparent;
					.add{
						width: 34rpx;
						height: 34rpx;
						border-radius: 50%;
						box-sizing: border-box;
						display: flex;
						justify-content: center;
						align-items: center;
						font-weight: bold;
						background-color: white;
						color: #FF6600;
					}
					em{
						font-style: normal;
						color: white;
						font-size: 30rpx;
					}
				}
				.del-right{
					width: 70rpx;
					height: 160rpx;
					background: white;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border: 1rpx solid #FF6600;
					image{
						width: 34rpx;
						height: 34rpx;
						border-radius: 50%;
						// border: 1rpx solid #C0C0C0;
						box-sizing: border-box;
					}
					em{
						font-style: normal;
						color: #FF6600;
						font-size: 30rpx;
					}
				}
			}
		}
		&-about{
			width: 100%;
			margin-bottom: 20rpx;
			&-h1{
				padding-left: 20rpx;
				line-height: 60rpx;
				font-size: 24rpx;
				color: #787878;
			}
			.scroll-view{
				width: 100%;
				overflow: scroll;
				white-space: nowrap;
				background-color: white;
				&-all{
					display: inline-block;
					padding-top: 30rpx;
					vertical-align: top;
					margin-right: 56rpx;
					image{
						width: 200rpx;
						height: 200rpx;
					}
				}
				view:first-of-type{
					margin-left: 20rpx;
				}
				&-bottom{
					height: 82rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 32rpx;
						height: 32rpx;
						margin-top: -10rpx;
					}
				}
			}
		}
	}
</style>

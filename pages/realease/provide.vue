<template>
	<view>
		<view class="page_bg"></view>
		<!-- 服务商子类 -->
		<view class="provide_box">
			<view class="pro_title gray star">服务商子类</view>
			<view class="pro_list">
				<view class="pro_item" @tap="selectDemandParent(index)" :class="[demand_parent_idx == index?'active':'']" v-for="(item,index) in provideItem" :key="index">{{item}}</view>
			</view>
		</view>
		
		<!-- 基本信息 -->
		<view class="graytitle">基本信息</view>
		
		<!-- 房屋发布 start -->
		<view v-if="firstTypeId==1" class="listItem">
			<view class="star">房屋名称</view>
			<input placeholder="请输入标题(26字内)"/>
		</view>
		<view v-if="firstTypeId==1" class="listItem">
			<view class="star">房屋租金</view>
			<input placeholder="请输入"/>
		</view>
		<!-- 房屋发布 end -->
		
		<!-- 维修发布 start -->
		<view v-if="firstTypeId==9" class="listItem">
			<view class="star">服务名称</view>
			<input placeholder="请输入标题(26字内)"/>
		</view>
		<view v-if="firstTypeId==9" class="listItem">
			<view class="star">上门费</view>
			<input placeholder="请输入"/>
		</view>
		<!-- 维修发布 end -->
		
		<view v-if="firstTypeId==8||firstTypeId==10" class="listItem">
			<view class="star">商品名称</view>
			<input placeholder="请输入标题(26字内)"/>
		</view>
		<view v-if="firstTypeId==8||firstTypeId==10" class="listItem">
			<view class="star">商品价格</view>
			<input placeholder="请输入"/>
		</view>
		
		<!-- 代购发布显示 start -->
		<view v-if="firstTypeId==10" class="listItem">
			<view class="star no">进口税费</view>
			<input placeholder="0元则为免税费"/>
		</view>
		<!-- 代购发布 end -->
		
		<!-- 店铺内商品所属分类 -->
		<view class="category">
			<view class="top"><view class="title">店铺内商品所属分类</view><view class="addOk">添加完成</view></view>
			<view class="category start">
				<view class="gray">已有分类</view>
				<view class="buttons">
					<view v-for="(item,index) in cateList" :class="cate_idx == index?'active':''" :key="index" @tap="selectCate(index)">{{item}}</view>
				</view>
			</view>
			<view class="category">
				<view class="gray">新增分类</view>
				<view class="input">
					<input placeholder="请输入分类名称(限4字内)"/>
					<view class="add">添加</view>
				</view>
			</view>
		</view>
		
		<!-- 设置规格 -->
		<view v-if="firstTypeId!=1" class="size">
			<view class="top"><view class="title">设置规格</view></view>
			<setting-spec></setting-spec>
		</view>
		
		<!-- 房屋发布 start -->
		<!-- 付款方式 -->
		<view v-if="firstTypeId==1" class="pay_type_box">
			<view class="pro_title title gray star">付款方式</view>
			<view class="pay_item">
				<view class="pay_txt">押金</view>
				<picker @change="bindPickerChange" :range="depositArr">
					<view class="pay_right">
						<view>{{deposit}}</view>
						<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
					</view>
				</picker>
			</view>
			<view class="pay_item">
				<view class="pay_txt">月付</view>
				<view class="pay_right noborder">
					<view class="ipt_box"><input type="text" placeholder="请输入租金"></view>
					<view class="ipt_box"><input type="text" placeholder="请输入服务费"></view>
				</view>
			</view>
			<view class="pay_item">
				<view class="pay_txt">季付</view>
				<view class="pay_right noborder">
					<view class="ipt_box"><input type="text" placeholder="请输入租金"></view>
					<view class="ipt_box"><input type="text" placeholder="请输入服务费"></view>
				</view>
			</view>
			<view class="pay_item">
				<view class="pay_txt">半年付</view>
				<view class="pay_right noborder">
					<view class="ipt_box"><input type="text" placeholder="请输入租金"></view>
					<view class="ipt_box"><input type="text" placeholder="请输入服务费"></view>
				</view>
			</view>
			<view class="pay_item">
				<view class="pay_txt">年付</view>
				<view class="pay_right noborder">
					<view class="ipt_box"><input type="text" placeholder="请输入租金"></view>
					<view class="ipt_box"><input type="text" placeholder="请输入服务费"></view>
				</view>
			</view>
		</view>
		
		<!-- 物业交割信息 -->
		<view class="delivery_box">
			<view class="pro_title title gray star">物业交割信息</view>
			<view class="delivery_item">
				<view class="de_item">
					<text>水：</text>
					<input type="text" placeholder="请输入起始度">
				</view>
				<view class="de_item">
					<text>1m³/元：</text>
					<input type="text" placeholder="请输入价格">
				</view>
			</view>
			<view class="delivery_item">
				<view class="de_item">
					<text>电：</text>
					<input type="text" placeholder="请输入起始度">
				</view>
				<view class="de_item">
					<text>1kw·h/元：</text>
					<input type="text" placeholder="请输入价格">
				</view>
			</view>
			<view class="delivery_select" v-for="(item,index) in deliverySelect" :key="index">
				<view class="delivery_left">
					<picker @change="deliveryChange($event,index)" :range="deliveryArr">
						<view class="box">
							<view>{{item.delivery}}</view>
							<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
						</view>
					</picker>
					<view class="add_minus_box">
						<view class="minus_btn" @tap="minus(index)">-</view>
						<view class="num_txt">{{item.num}}</view>
						<view class="add_btn" @tap="add(index)">+</view>
					</view>
				</view>
				<view class="delivery_right" v-if="item.isAdd != true" @tap="deliveryAdd(index)">
					<image src="/static/cut/user/add.png"></image>
					<view>添加</view>
				</view>
				<view class="delivery_right del" v-else @tap="deliveryDel(index)">
					<image src="/static/cut/user/del.png"></image>
					<view>删除</view>
				</view>
			</view>
		</view>
		
		<!-- 房屋信息 -->
		<view class="housing_info">
			<view class="pro_title title gray">房屋信息</view>
			<view class="housing_box">
				<view class="housing_item">
					<view class="housing_left">
						<text>面积：</text>
						<input type="text" placeholder="请输入" />㎡
					</view>
					<view class="housing_right">
						<text>户型：</text>
						<picker @change="houseTypeChange" :range="houseTypeArr">
							<view class="house_select">
								<view>{{houseType}}</view>
								<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
							</view>
						</picker>
					</view>
				</view>
				<view class="housing_item">
					<view class="housing_left">
						<text>年代：</text>
						<input type="text" placeholder="请输入" />
					</view>
					<view class="housing_right">
						<text>房号：</text>
						<input type="text" placeholder="请输入" />
					</view>
				</view>
				<view class="housing_item">
					<view class="housing_left">
						<text>总楼层数：</text>
						<input type="text" placeholder="请输入" />
					</view>
					<view class="housing_right">
						<text>所在楼层：</text>
						<input type="text" placeholder="请输入" />
					</view>
				</view>
				<view class="housing_item single nopicker">
					<text>所在地区：</text>
					<view class="house_select" @tap="showMulLinkageThreePicker">
						<view>{{address}}</view>
						<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="housing_item single nopicker" @tap="chooseAddress">
					<text>详细地址：</text>
					<view class="house_select">
						<view>{{houseAddress}}</view>
						<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="housing_item single">
					<text>可入住日期：</text>
					<picker @change="houseDateChange" mode="date" >
						<view class="house_select">
							<view>{{houseDate}}</view>
							<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
						</view>
					</picker>
				</view>
				<view class="housing_item single">
					<text>签约时长：</text>
					<input type="text" placeholder="请输入" />
				</view>
			</view>
		</view>
		
		<!-- 房屋标签 -->
		<view class="house_label_box">
			<view class="pro_title title gray">房屋标签（多选）</view>
			<view class="house_label_ul">
				<view class="label_item" :class="[item.is_select != 0?'active':'']" v-for="(item,index) in labelList" @tap="labelMultiple(index)" :key="index">{{item.name}}</view>
			</view>
			<view class="input_box">
				<input type="text" v-model="label_txt" disabled>
			</view>
		</view>
		<!-- 房屋发布 end -->
		
		<!-- 维修发布 start -->
		<view class="remark_box">
			<view class="rel_title"><text>服务详情</text></view>
			<textarea placeholder="可以简单介绍一下.." />
		</view>
		<!-- 维修发布 end -->
		
		<!-- 商品图片 -->
		<view class="grayButton">商品图片(注：第一张为主图，限6张)</view>
		<!-- <view class="uploadGoodsImg">
			<image src="/static/cut/user/uploadgoodsimg.png"></image>
		</view> -->
		<upload-imgs :photos="goods_photos" @changes="goodsPhoto"></upload-imgs>
		
		<!-- 商品详情图 -->
		<view class="grayButton">商品详情图(注：限6张)</view>
		<!-- <view class="uploadGoodsImg">
			<image src="/static/cut/user/uploadgoodsimg.png"></image>
		</view> -->
		<upload-imgs :photos="goods_detail_photos" @changes="goodsPhoto1"></upload-imgs>
		
		<view class="bottom_place"></view>
		<button class="upload_btn noNumber" v-if="isCanUpload == 0" type="primary" @tap="submitUpload">确认上传</button>
		<button class="upload_btn" v-else type="primary">确认上传</button>
		
		<mpvue-city-picker :second="second" :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
import settingSpec from '@/components/settingSpec.vue'
import uploadImgs from '@/components/uploadImgs.vue'
import {ProvideModel} from '@/common/models/provide.js'
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
import {UserModel} from '@/common/models/user.js'
import {StoreModel} from '@/common/models/store.js'
const storemodel = new StoreModel()
const usermodel = new UserModel()
const providemodel = new ProvideModel()
export default{
	components:{
		settingSpec,
		uploadImgs,
		mpvueCityPicker
	},
	data(){
		return{
			second:false,
			cityPickerValueDefault: [0, 0, 1],
			themeColor:"#FF6600",
			
			provideItem:[],
			demand_parent_idx: null,
			cateList: ["生活用品","生活用品","生活用品","生活用品","生活用品"],
			cate_idx: null,
			firstTypeId:'',
			firstType:'',
			isCanUpload: 0,
			goods_photos: [],
			goods_detail_photos: [],
			sellerId:'',
			deposit: "请选择",
			depositArr: ["押金选择1","押金选择2"],
			deliveryArr: ["床"],
			deliverySelect: [
				{
					delivery: "请选择",
					num: 0,
					isAdd: false
				}
			],
			
			houseType: "请选择",
			houseTypeArr: ["户型1","户型2"],
			address: '请选择',
			houseAddress: '请选择',
			houseDate: '请选择',
			
			labelList: [
				{
					name: "短租房",
					is_select: 0
				},{
					name: "长租房",
					is_select: 0
				},{
					name: "近地铁",
					is_select: 0
				},{
					name: "免物业费",
					is_select: 0
				},{
					name: "家具齐全",
					is_select: 0
				},{
					name: "首次出租",
					is_select: 0
				},{
					name: "拎包入住",
					is_select: 0
				},{
					name: "智能锁",
					is_select: 0
				}
			],
			label_select_arr: [],
			label_txt_arr: [],
			label_txt: ''
		}
	},
	onLoad(){
		usermodel.getInfo((data)=>{
			this.sellerId = data.storeId
			storemodel.getSellerStore({sellerId:this.sellerId},(data)=>{
				this.firstType = data.firstType
				this.firstTypeId = data.firstTypeId
				providemodel.getSecondType({firstType:this.firstType,type:2},(data)=>{
					this.provideItem = []
					for(let i of data){
						this.provideItem.push(i.title)
					}
				})
			})
		})
		
		
		providemodel.getSecondType({firstType:'生活',type:2},(data)=>{
			for(let i of data){
				this.provideItem.push(i.title)
			}
		})
	},
	methods:{
		goodsPhoto(e){
			this.goods_photos = e;
			console.log(this.goods_photos);
		},
		goodsPhoto1(e){
			this.goods_detail_photos = e;
			console.log(this.goods_detail_photos);
		},
		selectDemandParent(idx){
			this.demand_parent_idx = idx;
		},
		selectCate(idx){
			this.cate_idx = idx;
		},
		bindPickerChange(e){
			this.deposit = this.depositArr[e.target.value];
		},
		deliveryChange(e,index){
			console.log(index,e);
			this.deliverySelect[index].delivery = this.deliveryArr[e.detail.value];
		},
		add(idx){
			this.deliverySelect[idx].num++;
			if(this.deliverySelect[idx].num > 99){
				this.deliverySelect[idx].num = 99;
			}
		},
		minus(idx){
			this.deliverySelect[idx].num--;
			if(this.deliverySelect[idx].num < 0){
				this.deliverySelect[idx].num = 0;
			}
		},
		deliveryAdd(index){
			this.deliverySelect.push({
				delivery: "请选择",
				num: 0,
				isAdd: true
			})
		},
		deliveryDel(index){
			this.deliverySelect.splice(index, 1);
		},
		houseTypeChange(e){
			this.houseType = this.houseTypeArr[e.target.value];
		},
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show()
		},
		onConfirm(data){
			console.log(data);
			this.address = data.label;
		},
		chooseAddress(){
			var that = this;
			uni.chooseLocation({
			    success: function (res) {
			        console.log('位置名称：' + res.name);
			        console.log('详细地址：' + res.address);
			        console.log('纬度：' + res.latitude);
			        console.log('经度：' + res.longitude);
					that.houseAddress = res.name;
			    }
			});
		},
		houseDateChange(e){
			this.houseDate = e.detail.value;
		},
		labelMultiple(idx){
			if(this.labelList[idx].is_select == 0){
				this.labelList[idx].is_select = 1;
				this.label_select_arr.push(idx);
				this.label_txt_arr.push(this.labelList[idx].name);
			}else{
				this.labelList[idx].is_select = 0;
				if (this.label_select_arr.indexOf(idx) > -1) { 
					this.label_select_arr.splice(this.label_select_arr.indexOf(idx),1);
					this.label_txt_arr.splice(this.label_txt_arr.indexOf(this.labelList[idx].name),1);
				}
			}
			let txt = '';
			for(let i in this.label_txt_arr){
				txt += this.label_txt_arr[i]+',';
			}
			this.label_txt = txt;
			console.log(this.label_txt_arr,this.label_select_arr);
		},
		submitUpload(){
			console.log(this.goods_photos.join(','));
			console.log('------------------------');
			console.log(this.goods_detail_photos.join(','));
		}
	}
}
</script>

<style lang="scss">
// .bottom_place{
// 	height: 100rpx;
// 	margin-top: 20rpx;
// }
.upload_btn{
	// position: fixed;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	border-radius: 0;
	// left: 0;
	// bottom: 100rpx;
	color: #fff;
	font-size: 34rpx;
	background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
	.noNumber{
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		opacity:0.6;
	}
}

.remark_box{
	background: #fff;
	margin-top: 15rpx;
	padding: 0 20rpx 60rpx;
	.rel_title{
		margin-bottom: 0;
		padding: 25rpx 0;
		box-sizing: border-box;
		border-bottom: 1rpx solid #F2F2F2;
		margin-bottom: 30rpx;
	}
	textarea{
		width:710rpx;
		height:180rpx;
		border:1rpx solid #A0A0A0;
		border-radius:8rpx;
		color: #B4B4B4;
		font-size: 26rpx;
		padding: 15rpx 20rpx;
	}
}
.pro_title{
	// padding-left: 10rpx;
	position: relative;
	&.title{
		color: #3C3C3C;
		font-size: 26rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #E6E6E6;
		margin-bottom: 20rpx;
	}
}
.provide_box{
	background-color: #fff;
	margin-top: 20rpx;
	padding:30rpx 20rpx 0 20rpx;
	.pro_list{
		margin-top: 20rpx;
		display: flex;
		flex-wrap:wrap;
		.pro_item{
			margin-bottom: 20rpx;
			display: flex;
			align-items:center;
			justify-content: center;
			width:140rpx;
			// height:50rpx;
			padding: 12rpx 0;
			margin-right: 20rpx;
			border:1rpx solid rgba(200,200,200,1);
			border-radius:8rpx;
			font-size:24rpx;
			&.active{
				color: #FF6600;
				border-color: #FF6600;
			}
		}
	}
}

.listItem{
	background-color: #fff;
	padding-left:10rpx;
	display: flex;
	align-items: center;
	height:84rpx;
	border-bottom: 1rpx solid #f2f2f2;
	.star{
		width: 140rpx;
		// margin-right: 20rpx;
		padding-left: 10rpx;
	}
	input{
		font-size: 26rpx;
	}
}

.category{
	background-color: #fff;
	margin-top: 20rpx;
	padding:0 20rpx 20rpx 20rpx;
	.category{
		display: flex;
		margin-bottom: 20rpx;
		align-items: center;
		&.start{
			align-items: flex-start;
			.gray{
				margin-top: 10rpx;
			}
		}
		.gray{
			width:150rpx;
		}
		.buttons{
			display: flex;
			flex-wrap: wrap;
			width:540rpx;
			font-size: 24rpx;
			view{
				margin-right: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width:140rpx;
				// height:50rpx;
				padding: 12rpx 0;
				margin-bottom: 20rpx;
				border:1px solid rgba(200,200,200,1);
				border-radius:8rpx;
				&.active{
					color: #FF6600;
					border-color: #FF6600;
				}
			}
		}
		.input{
			display: flex;
			input{
				width:440rpx;
				height:64rpx;
				font-size: 26rpx;
				border:1px solid rgba(160,160,160,1);
				border-radius: 8rpx 0 0 8rpx;
				border-right: 0;
				padding-left: 10rpx;
			}
			.add{
				display: flex;
				align-items: center;
				justify-content: center;
				color:#fff;
				width:100rpx;
				height:64rpx;
				background:linear-gradient(180deg,rgba(255,145,48,1),rgba(255,102,0,1));
				border-radius: 0 8rpx 8rpx 0;
			}
		}
	}
}

.top{
	height:83rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1rpx solid #f2f2f2;
	.addOk{
		color: #FF6600;
		font-size:24rpx;
	}
}

.size{
	margin-top: 20rpx;
	background-color: #fff;
	padding:0 20rpx 60rpx;
}

.uploadGoodsImg{
	background-color: #fff;
	display: flex;
	padding:0 20rpx 30rpx 20rpx;
	flex-wrap: wrap;
	image{
		width:200rpx;
		height:200rpx;
		margin-top: 30rpx;
		margin-right: 30rpx;
	}
}
.pay_type_box{
	padding: 20rpx 20rpx 30rpx;
	background: #fff;
	margin-top: 15rpx;
	
	.pay_item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		.pay_txt{
			width: 140rpx;
		}
		picker{
			width: 100%;
		}
		.pay_right{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border:1px solid rgba(160,160,160,1);
			border-radius: 8rpx;
			padding: 20rpx;
			box-sizing: border-box;
			&.noborder{
				border: 0;
				padding: 0;
			}
			view{
				color: #B4B4B4;
				font-size: 26rpx;
			}
			image{
				display: block;
				width: 15rpx;
				height: 25rpx;
			}
			.ipt_box{
				width: 49%;
				border:1px solid rgba(160,160,160,1);
				border-radius: 8rpx;
				padding: 13rpx 20rpx;
				box-sizing: border-box;
				input{
					color: #B4B4B4;
					font-size: 26rpx;
				}
			}
		}
	}
}

.delivery_box{
	padding: 20rpx 20rpx 30rpx;
	background: #fff;
	margin-top: 15rpx;
	.delivery_item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		.de_item{
			width: 49%;
			border:1px solid rgba(160,160,160,1);
			border-radius:8rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: #646464;
			font-size: 26rpx;
			padding: 13rpx 20rpx;
			input{
				color: #B4B4B4;
				font-size: 26rpx;
				max-width: 52%;
			}
		}
	}
	.delivery_select{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		.delivery_left{
			width: 75%;
			height: 64rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border:1px solid rgba(160,160,160,1);
			border-radius:8rpx;
			picker{
				width: 60%;
			}
			.box{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				image{
					display: block;
					width: 15rpx;
					height: 25rpx;
				}
			}
			.add_minus_box{
				width: 40%;
				height: 64rpx;
				border-left: 1px solid #A0A0A0;
				display: flex;
				justify-content: center;
				align-items: center;
				.minus_btn,.add_btn{
					width: 22rpx;
					height: 22rpx;
					line-height: 22rpx;
					text-align: center;
					font-size:30rpx;
					font-family:Source Han Sans CN;
					font-weight:bold;
					color:rgba(255,102,0,1);
				}
				.num_txt{
					height: 22rpx;
					line-height: 22rpx;
					font-size:26rpx;
					color:rgba(60,60,60,1);
					margin: 0 50rpx;
				}
			}
		}
		.delivery_right{
			width: 23%;
			height: 64rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
			border-radius:8rpx;
			font-size:30rpx;
			color:rgba(254,254,254,1);
			&.del{
				border:1px solid rgba(255,102,0,1);
				background: #fff;
				color: #FF6600;
			}
			image{
				display: block;
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}
	}
}
.housing_info{
	padding: 20rpx 20rpx 30rpx;
	background: #fff;
	margin-top: 15rpx;
	.housing_box{
		.housing_item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 64rpx;
			margin-bottom: 20rpx;
			&.single{
				justify-content: flex-start;
				border:1px solid rgba(160,160,160,1);
				border-radius:8rpx;
				padding-left: 20rpx;
				box-sizing: border-box;
				text{
					width: 26%;
				}
				picker{
					width: 71%;
				}
			}
			&.nopicker{
				.house_select{
					width: 71%;
				}
			}
			input{
				width: 46%;
				font-size: 26rpx;
				margin-right: 10rpx;
			}
			.housing_left{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 0 20rpx;
				box-sizing: border-box;
				height: 64rpx;
				width: 46%;
				border:1px solid rgba(160,160,160,1);
				border-radius:8rpx;
			}
			.housing_right{
				width: 46%;
				height: 64rpx;
				display: flex;
				align-items: center;
				padding: 0 0 0 20rpx;
				box-sizing: border-box;
				border:1px solid rgba(160,160,160,1);
				border-radius:8rpx;
			}
			picker{
				width: 66%;
			}
			.house_select{
				display: flex;
				justify-content: space-between;
				align-items: center;
				view{
					width: 80%;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					font-size: 26rpx;
					color: #B4B4B4;
				}
				image{
					display: block;
					width: 15rpx;
					height: 25rpx;
				}
			}
		}
	}
}
.house_label_box{
	padding: 20rpx 20rpx 30rpx;
	background: #fff;
	margin-top: 15rpx;
	.house_label_ul{
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		.label_item{
			display: block;
			width: 140rpx;
			text-align: center;
			padding: 12rpx 0;
			border:1px solid rgba(200,200,200,1);
			border-radius:8rpx;
			color: #646464;
			margin: 0 20rpx 20rpx 0;
			&.active{
				color: #FF6600;
				border-color: #FE6600;
			}
		}
	}
	.input_box{
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		border:1px solid rgba(160,160,160,1);
		border-radius:8rpx;
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		input{
			width: 100%;
			color: #3C3C3C;
			font-size: 26rpx;
		}
	}
}
</style>

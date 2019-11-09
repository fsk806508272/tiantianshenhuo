<template>
	<view>
		
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		
		<!-- 个人认证 -->
		<view v-if="tabbarIndex==0">
			<view class="topTitle">基本信息</view>
			
			<view class="basicInfo">
				<view class="general">
					<view class="star">真实姓名</view>
					<input type="text" placeholder="请输入姓名">
				</view>
				<view class="general">
					<view class="star">性别</view>
					<text>请选择</text>
					<view class="iconfont icon-dibudaohanglan-"></view>
				</view>
				<view class="general">
					<view class="star">身份证号</view>
					<input type="text" placeholder="请输入电话">
				</view>
				<view class="general">
					<view class="star">所在地区</view>
					<text>请选择</text>
					<view class="iconfont icon-dibudaohanglan-"></view>
				</view>
			</view>
			
			<view class="topTitle">上传身份证</view>
			
			<view class="upload">
				<view class="first">
					<image src="/static/cut/upload_idcard.png" class="firstImage"></image>
					<image src="/static/cut/upload_idcard.png" class="secondImage"></image>
				</view>
				<view class="second">
					<view class="text">身份证正面</view>
					<view class="text">身份证反面</view>
				</view>
				<view class="third">
					<image src="/static/cut/upload_idcard.png"></image>
				</view>
				<view class="four">
					<view class="text">手持身份证正面</view>
				</view>
			</view>
			
			<view class="submit-button">确认提交</view>
		</view>
		
		<!-- 公司认证 -->
		<view v-if="tabbarIndex==1">
			<view class="graytitle">基本信息</view>
			<view class="general">
				<view class="star">公司名称</view>
				<input type="text" placeholder="请输入公司名称">
			</view>
			<view class="general">
				<view class="star">联系人</view>
				<input type="text" placeholder="请输入姓名">
			</view>
			<view class="general">
				<view class="star">联系电话</view>
				<input type="text" placeholder="请输入电话">
			</view>
			<view class="general">
				<view class="star">公司地址</view>
				<input type="text" placeholder="请输入公司地址">
			</view>
			<view class="graytitle">上传logo</view>
			<view class="uploadlogo">
				<image src="/static/cut/user/uploadgoodsimg.png"></image>
			</view>
			<view class="graytitle">上传身份证</view>
			<view class="upload">
				<view class="first">
					<image src="/static/cut/upload_idcard.png" class="firstImage"></image>
					<image src="/static/cut/upload_idcard.png" class="secondImage"></image>
				</view>
				<view class="second">
					<view class="text">身份证正面</view>
					<view class="text">身份证反面</view>
				</view>
				<view class="third">
					<image src="/static/cut/upload_idcard.png"></image>
				</view>
				<view class="four">
					<view class="text">手持身份证正面</view>
				</view>
			</view>
			<view class="graytitle">上传营业执照</view>
			<view class="uploadLisence">
				<image src="/static/cut/upload_idcard.png"></image>
			</view>
			<view class="submit-button">确认提交</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				headerPosition:"fixed",
				headerTop:"0px",
				orderType: ['个人认证','公司认证'],
				tabbarIndex:0
			}
		},
		onLoad: function (option) {
			let Timer = setInterval(()=>{
				let uniHead = document.getElementsByTagName('uni-page-head');
				if(uniHead.length>0){
					this.headerTop = uniHead[0].offsetHeight+'px';
					clearInterval(Timer);//清除定时器
				}
			},1);
		},
		methods:{
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding-top:64rpx;
	padding-bottom: 100rpx;
}	
image{
	width:340rpx;
	height:220rpx;
}
.topTabBar{
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
				border-bottom: solid 2rpx #FF6600;
			}
		}
	}
}
.topTitle{
	height:61rpx;
	font-size:22rpx;
	font-family:Source Han Sans CN;
	font-weight:400;
	color:rgba(120,120,120,1);
	margin-left:19rpx;
	margin-top:20rpx;
}

.general{
	display: flex;
	background-color: #fff;
	border-bottom: 1rpx solid #f2f2f2;
	height:84rpx;
	align-items: center;
	view{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width:131rpx;
	}
	input{
		margin-left:20rpx;
		width:550rpx;
	}
	text{
		margin-left: 20rpx;
		width:460rpx;
		font-size:26rpx;
		color:rgba(180,180,180,1);
	}
}

.upload{
	background-color: #fff;
	padding-top:30rpx;
	.first{
		.firstImage{
			margin-left:20rpx;
		}
		.secondImage{
			margin-left:30rpx;
			margin-right:20rpx;
		}
	}
	.second{
		height:79rpx;
		display: flex;
		view{
			width:50%;
			display: flex;
			justify-content: center;
		}
	}
	.third{
		display: flex;
		justify-content: center;
	}
	.four{
		display:flex;
		align-items: center;
		justify-content: center;
		height:69rpx;
	}
}

.text{
	font-size:22rpx;
	font-family:Source Han Sans CN;
	color:rgba(60,60,60,1);
}
.uploadlogo{
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	width:750rpx;
	height:260rpx;
	image{
		width:200rpx;
		height:200rpx;
	}
}
.uploadLisence{
	background-color: #fff;
	width:750rpx;
	height:280rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width:340rpx;
		height:220rpx;
	}
}
</style>

<template>
	<view>
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
</template>

<script>
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}	
image{
	width:340rpx;
	height:220rpx;
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
</style>

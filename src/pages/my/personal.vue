<template>
		<mescroll-uni ref="mescrollRef"  @down="downCallback"  @up="upCallback">

	
	<view class="ttx" >
	
	        <img class="tx" src="https://img0.baidu.com/it/u=105958903,507985946&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500">
	     	
	     </view>
	  	<view class="ttx" >
		   <text class="example-info">欢迎：{{username}}</text>
	  	</view>
	<view class="remind">

	  <view class="remind-item" @click="go">

		<uni-icons type="location" size="20" color="red" ></uni-icons>
		  	<text class="remind-item-title">签到</text>
	  </view>

	  <view class="remind-item">
	  	<uni-icons type="chat" size="20" color="red" ></uni-icons>
	    <text class="remind-item-title">我的消息</text>
	  </view>
	  <view class="remind-item" >
		<uni-icons type="list" size="20" color="red" ></uni-icons>
	    <text class="remind-item-title">我的待办</text>
	  </view>

	  <view class="remind-item" >
	<uni-icons type="help" size="20" color="red" ></uni-icons>
	    <text class="remind-item-title">帮助</text>
	  </view>
	</view>
	<view class="list">
		<uni-list >
	
		<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="账号：" />
	      <uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="积分：" />
	
		
		 </uni-list>
		 </view>
</mescroll-uni>
</template>

<script lang="ts" setup>


	const downCallback = (mescroll: any) => {
			console.log(mescroll);
			mescroll.endErr();
		//init(mescroll);
	}

const upCallback=(mescroll: any)=>{
		mescroll.endErr();
}
const go =()=>{
	uni.navigateTo({
		url: '/pages/my/sigin' ,
		animationType: 'pop-in',
		animationDuration: 200
	});
} 
// import qianTree from '@/components/tree/tree.vue';

// export default {
// 	components: {
// 		qianTree
// 	},
// 	data() {
// 		return {
// 			list: [{
// 				"children": [{
// 					"children": [{
// 						"title": "伽罗",
// 						"id": 2
// 					}, {
// 						"title": "艾琳",
// 						"id": 3
// 					}],
// 					"title": "手长部门",
// 					"id": 1
// 				}],
// 				"title": "射手发育部",
// 				"id": 0
// 			}],
// 			multiple: true,
// 			selectParent: true,
// 			flod: true,
// 		}
// 	},
// 	onLoad() {

// 	},
// 	methods: {
// 		// 确定回调事件
// 		treeConfirm(e) {
// 			console.log(e)
// 		},
// 		// 取消回调事件
// 		treeCancel(e) {
// 			console.log(e)
// 		},
// 		// 显示树形选择器
// 		showTree() {
// 			this.$refs.qiantree._show();
// 		},
// 	}
// }
</script>

<style lang="scss">
	.list{
		  padding: 15rpx;
	}
	.remind {
	  margin: 32rpx 32rpx 0;
	  display: flex;
	  justify-content: space-between;
	  background-color: #ffffff;
	  padding: 15rpx;
	  border-radius: 12rpx;
	}
	
	.remind-item {
	  position: relative;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	
	.remind-item-title {
	  margin-top: 16rpx;
	  font-size: 24rpx;
	  line-height: 24rpx;
	  color: #444444;
	}
		view {
			font-size: 14px;
			line-height: inherit;
		}
	
		.example {
			padding: 0 15px 15px;
		}
	 .ttx{
	   background-color:#2db7f5;
	      text-align: -webkit-center;
	      text-align: center;
	  position: relative;
	    top: 25%;
	 }
	      .tx {
	        width: 66px;
	        height: 66px;
	        border: 4px solid rgba(255,255,255,0.5); border-radius: 100%;box-shadow: inset 1px 1px 4px rgba(0,0,0,0.3), 0 2px 3px rgba(0,0,0,0.4);
	    }
		.example-info {
	   color:#fff;
	line-height:30px;
	
			color: #fff;
	
		}
	.uni-badge {
		width: 50px;
	}
</style>

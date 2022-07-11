<template>
		<mescroll-uni ref="mescrollRef"  @down="downCallback"  @up="upCallback">
		<!-- <button type="primary" @tap="showTree">显示树形选择器</button> -->
		<!-- <text>一些参数</text>
		<button type="primary" @tap="multiple = !multiple">切换单、多选：{{multiple?'多选':'单选'}}</button>
		<button type="primary" @tap="flod = !flod">折叠已打开的子集：{{flod?'折叠':'不折叠'}}</button>
		<button type="primary" @tap="selectParent = !selectParent">切换父级可选：{{selectParent?'可选':'不可选'}}</button> -->
	<!-- 	<qian-tree ref="qiantree" lazy :selectParent="selectParent" :multiple="multiple" :range="list" :foldAll="flod"
			idKey="id" rangeKey="title" @confirm="treeConfirm" @cancel="treeCancel"></qian-tree> -->
	
	
	
	<view class="remind">
		  <uni-badge class="uni-badge-left-margin" :text="8" absolute="rightTop" :offset="[-3, -3]" size="small">
	  <view class="remind-item">
		  	<text class="layui-icon layui-icon-rss"></text>
		
		  		
		  			<text class="remind-item-title">我的待办</text>
		  		


	  </view>
	  	</uni-badge>
	  <view class="remind-item">
	    <text class="layui-icon layui-icon-rss"></text>
	    <text class="remind-item-title">我的订单</text>
	  </view>
	  <view class="remind-item" >
	    <text class="layui-icon layui-icon-rss"></text>
	    <text class="remind-item-title">我的卡券</text>
	  </view>

	  <view class="remind-item" >
	    <text class="layui-icon layui-icon-rss"></text>
	    <text class="remind-item-title">我的合同</text>
	  </view>
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
	.remind {
	  margin: 32rpx 32rpx 0;
	  display: flex;
	  justify-content: space-between;
	  background-color: #ffffff;
	  padding: 32rpx;
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
	
</style>

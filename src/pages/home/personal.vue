<template>
	<view class="content">
		<button type="primary" @tap="showTree">显示树形选择器</button>
		<!-- <text>一些参数</text>
		<button type="primary" @tap="multiple = !multiple">切换单、多选：{{multiple?'多选':'单选'}}</button>
		<button type="primary" @tap="flod = !flod">折叠已打开的子集：{{flod?'折叠':'不折叠'}}</button>
		<button type="primary" @tap="selectParent = !selectParent">切换父级可选：{{selectParent?'可选':'不可选'}}</button> -->
		<qian-tree ref="qiantree" lazy :selectParent="selectParent" :multiple="multiple" :range="list" :foldAll="flod"
			idKey="id" rangeKey="title" @confirm="treeConfirm" @cancel="treeCancel"></qian-tree>
	
	
	
	<view class="remind">
	  <view class="remind-item">
	    <text class="my-ri-notification-3-fill text-xxl text-green"></text>
	    <text class="remind-item-title">我的待办</text>
	    <view class="cu-tag badge" v-show="countInfo.order.wait > 0">{{ countInfo.order.wait }}</view>
	  </view>
	  <view class="remind-item">
	    <text class="my-ri-survey-fill text-xxl text-green"></text>
	    <text class="remind-item-title">我的订单</text>
	  </view>
	  <view class="remind-item" >
	    <text class="my-ri-coupon-3-fill text-xxl text-green"></text>
	    <text class="remind-item-title">我的卡券</text>
	  </view>
	  <!-- <view class="remind-item" @click="navigateTo('/pages/my/invoice/invoice')">
	    <text class="my-ri-bill-fill text-xxl text-green"></text>
	    <text class="remind-item-title">平台发票</text>
	  </view> -->
	  <view class="remind-item" >
	    <text class="my-ri-draft-fill text-xxl text-green"></text>
	    <text class="remind-item-title">我的合同</text>
	  </view>
	</view>
	</view>
</template>

<script lang="ts">



import qianTree from '@/components/tree/tree.vue';

export default {
	components: {
		qianTree
	},
	data() {
		return {
			list: [{
				"children": [{
					"children": [{
						"title": "伽罗",
						"id": 2
					}, {
						"title": "艾琳",
						"id": 3
					}],
					"title": "手长部门",
					"id": 1
				}],
				"title": "射手发育部",
				"id": 0
			}],
			multiple: true,
			selectParent: true,
			flod: true,
		}
	},
	onLoad() {

	},
	methods: {
		// 确定回调事件
		treeConfirm(e) {
			console.log(e)
		},
		// 取消回调事件
		treeCancel(e) {
			console.log(e)
		},
		// 显示树形选择器
		showTree() {
			this.$refs.qiantree._show();
		},
	}
}
</script>

<style>
	
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

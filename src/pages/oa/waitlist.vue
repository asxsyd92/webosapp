<template>
	<view>
		<view>
			<view class="article shadow clearfix sr-listshow" v-for="(value, index) in waitlist" :key="index">
				<view class="article-left">
					<view style="width:100%;height:100%; margin: 0 auto;text-align:center;">
					 <i class="layui-icon layui-icon-form" :style="'    font-size: 60px;color:#2db7f5'"></i> 
					</view>
				</view>
				<view class="article-right">
					<view class="article-title" @click="dealwith(value)">
						<span>{{value.title}}</span>
					</view>
					<view class="article-abstract">
						接受时间：{{value.receivetime}}
					</view>
					<view class="article-footer">
						<span class="layui-hide-xs"><i class="" aria-hidden="true"></i></span>
					<span class="article-viewinfo">步骤{{value.stepname}}</span>

						<span class="read layui-btn layui-btn-xs layui-btn-normal layui-hide-xs"
							@click="goDetail(value)">处理</span>
					</view>
				</view>
				<view class="flag flag-left">待办事项</view>

				<view class="ad-view" v-if="(index > 0 && (index+1) % 9 == 0)">
					<!-- #ifdef MP-QQ -->
					<view class="adContainer">
						<ad unit-id='02ab07fe32647c495cdc57bd8645fd29' type="card"></ad>
					</view>
					<!-- #endif  -->

					<!-- #ifdef MP-WEIXIN  -->
					<ad style="    overflow: hidden;" unit-id="adunit-d0afedca1cfb4087" ad-type="video"
						ad-theme="white"></ad>
					<!-- #endif  -->
				</view>
			</view>
			<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
		</view>

	</view>
</template>

<script lang="ts" setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad,
		onPullDownRefresh,onShow,onReachBottom
	} from "@dcloudio/uni-app";
	import http from '../../utils/http';


	// export default {

	// 	setup() {
	const waitlist = ref([]) as any;
	const reload = ref(false);
	const viewIndex = ref(1);
	const totalSize = ref(0);
	const limit = ref(10);
	const status = ref('more');
	const contentText = ref({
		contentdown: '加载更多',
		contentrefresh: '加载中',
		contentnomore: '没有更多'
	});
	const titletype = ref('');
	const adpid = ref('');
	const id = ref('');
	const ads = ref([]);
	const current = ref(0);
	const _feedsad = ref("");

	// onLoad(() => {

	// })

	onPullDownRefresh(() => {
		reload.value = true;

		if (totalSize.value <= (viewIndex.value) * limit.value) {

			status.value = "noMore";
			return;
		}
		viewIndex.value++;
		init();
	})
	 onReachBottom  (() => {
		if (totalSize.value <= (viewIndex.value) * limit.value) {
			status.value = "noMore";

			return;
		}


		status.value = 'more';
		viewIndex.value++;
		init();
	});

	const onClickItem = (e: any) => {
		if (current.value !== e.currentIndex) {
			current.value = e.currentIndex
		}
	}
	const init = () => {
		uni.showLoading({
			title: '加载中'
		});

		http.post("/api/workflowtasks/WaitList", {
			page: viewIndex.value,
			limit: limit.value
		}, "请稍等").then((res: any) => {

			if (res.success) {
				let list = res.data;

				console.log(list);
				totalSize.value = parseInt(res.count);
				viewIndex.value = viewIndex.value;
				waitlist.value = reload.value ? list : waitlist.value.concat(list);

				reload.value = false;
				if (list.length > 0) {
					status.value = 'more';
				} else {
					status.value = "noMore";
				}

			} else {
				uni.hideLoading();

			}

		}).catch((resp: any) => {


		});

	}
	const dealwith = (e: any) => {
		var query = "";
		query = query + "&taskid=" + e.id + "&groupid=" + e.groupid;
		uni.navigateTo({
			url: '/pages/workrun/index?instanceid=' + e.instanceid + "&flowid=" + e.flowid + "&stepid=" + e.stepid + query
		});
	}




	init();
	onShow(() => {
		uni.startPullDownRefresh();
	});
	// 	return {
	// 		waitlist, status, contentText, dealwith

	// 	}
	// 	}
	// };
</script>

<style lang="scss">
	.banner {
		height: 360rpx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84rpx;
		overflow: hidden;
		position: absolute;
		left: 30rpx;
		bottom: 30rpx;
		width: 90%;
		font-size: 32rpx;
		font-weight: 400;
		line-height: 42rpx;
		color: white;
		z-index: 11;
	}

	.uni-media-list-logo {
		width: 180rpx;
		height: 140rpx;
	}

	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}

	.uni-media-list-text-top {
		height: 74rpx;
		font-size: 28rpx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>

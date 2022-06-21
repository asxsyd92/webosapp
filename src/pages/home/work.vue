<template>
	<view class="pages">
		<!-- #ifndef H5 -->
		<statusBar></statusBar>
		<!-- #endif -->

		<!-- 搜索功能 -->
		<view class="uni-search-box">
			<uni-search-bar v-model="keyword" ref="searchBar" radius="100" cancelButton="none" disabled
				:placeholder="inputPlaceholder" />
			<view class="cover-search-bar" @click="searchClick"></view>
		</view>


		
			<!-- 基于 uni-list 的页面布局 field="user_id.username"-->
			<uni-list class="uni-list" :border="false" :style="{height:listHight}">
				
				<!-- 作用于app端nvue页面的下拉加载 -->
				<!-- #ifdef APP-NVUE -->
				<refreshBox @refresh="refresh" :loading="loading"></refreshBox>
				<!-- #endif -->

				<!-- 列表渲染 -->
				<uni-list-item class="article shadow clearfix sr-listshow" :to="'/pages/list/detail?id='+item._id+'&title='+item.title" v-for="(item,index) in waitlist" :key="index">
					<!-- 通过header插槽定义列表左侧图片 -->
					<template v-slot:header>
						<view class="avatar">
                            <uni-icons type="email-filled" size="80"></uni-icons>
                        </view> 
                     
                        	<view class="flag flag-left">待办事项</view>
					</template>
					<!-- 通过body插槽定义布局 -->
					<template v-slot:body>
						<view class="main">
							<text class="title">{{item.title}}</text>
							<view class="info">
								<text class="author">{{item.stepname}}</text>
								<uni-dateformat class="last_modify_date" :date="item.receivetime"
									format="yyyy-MM-dd" :threshold="[60000, 2592000000]" />
							</view>
						</view>
					</template>
				</uni-list-item>
				<!-- 加载状态：上拉加载更多，加载中，没有更多数据了，加载错误 -->
				<!-- #ifdef APP-PLUS -->
				<uni-list-item>
					<template v-slot:body>
				<!-- #endif -->
						<uni-load-state @networkResume="refresh" :state="{data,pagination,hasMore, loading, error}"
							@loadMore="loadMore">
						</uni-load-state>
				<!-- #ifdef APP-PLUS -->
					</template>
				</uni-list-item>
				<!-- #endif -->
			</uni-list>
	
	</view>
</template>

<script lang="ts">

	import statusBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar";
    import { ref } from 'vue';
    import http from '../../utils/http';
    import { onLoad,onReady,onShow } from "@dcloudio/uni-app";
	export default {
		components: {
			statusBar
		},setup(){
    	const waitlist = ref([]);
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
  
	   onLoad((event: any) => {
			init();
		})

		const onPullDownRefresh = () => {
			reload.value = true;

			if (totalSize.value <= (viewIndex.value) * limit.value) {

				status.value = "noMore";
				return;
			}
			viewIndex.value++;
			init();
		}
		const onReachBottom = () => {
			if (totalSize.value <= (viewIndex.value) * limit.value) {
				status.value = "noMore";

				return;
			}


			status.value = 'more';
			viewIndex.value--;
			init();
		}

		const onClickItem = (e: any) => {
			if (current.value !== e.currentIndex) {
				current.value = e.currentIndex
			}
		}
		const init = () => {
			uni.showLoading({
				title: '加载中'
			});

			http.post("/api/workflowtasks/WaitList", { page: viewIndex.value, limit: limit.value }, "请稍等").then((res: any) => {

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



		return {
			waitlist, status, contentText, dealwith

		}

        }
		// computed: {
		// 	inputPlaceholder(e) {
		// 		if (uni.getStorageSync('CURRENT_LANG') == "en") {
		// 			return 'Please enter the search content'
		// 		} else {
		// 			return '请输入搜索内容'
		// 		}
		// 	},
		// 	colList(){
		// 		return [
			
		// 		]
		// 	}
		// },
		// data() {
		// 	return {
		// 		where: '"article_status" == 1',
		// 		keyword: "",
		// 		showRefresh: false,
		// 		listHight: 0
		// 	}
		// },
		// watch: {
		// 	keyword(keyword, oldValue) {
		// 		let where = '"article_status" == 1 '
		// 		if (keyword) {
		// 			this.where = where + `&& /${keyword}/.test(title)`;
		// 		} else {
		// 			this.where = where;
		// 		}
		// 	}
		// },
		// async onReady() {
		// 	// #ifdef APP-NVUE
		// 	/* 可用窗口高度 - 搜索框高 - 状态栏高 */
		// 	this.listHight = uni.getSystemInfoSync().windowHeight - uni.getSystemInfoSync().statusBarHeight - 50 + 'px';
		// 	// #endif
		// 	// #ifndef APP-NVUE
		// 	this.listHight = 'auto'
		// 	// #endif
		// 	//cdbRef = this.$refs.udb
		// },
		// async onShow() {
		// 	this.keyword = getApp().globalData.searchText
		// //	getApp().globalData.searchText = ''
		// 	//这里仅演示如何，在onShow生命周期获取设备位置，并在设备或者应用没有权限时自动引导。设置完毕自动重新获取。
		// 	//你可以基于他做自己的业务，比如：根据距离由近到远排序列表数据等
		// 	// uni.showLoading({
		// 	// 	title:"获取定位中"
		// 	// });
		// 	//默认h5端不获取定位
		// 	// #ifndef H5
		// 	// let location = await gps.getLocation({
		// 	// 	geocode: true
		// 	// })
		// 	console.log(location);
		// 	// #endif
		// 	// if(location){
		// 	// 	uni.showToast({
		// 	// 		title: JSON.stringify(location),
		// 	// 		icon: 'none'
		// 	// 	});
		// 	// }
		// 	// uni.hideLoading()
		// },
		// methods: {
		// 	searchClick(e) { //点击搜索框
		// 		uni.hideKeyboard();
		// 		uni.navigateTo({
		// 			url: '/pages/list/search/search',
		// 			animationType: 'fade-in'
		// 		});
		// 	},
		// 	retry() {
		// 		this.refresh()
		// 	},
		// 	refresh() {
		// 		cdbRef.loadData({
		// 			clear: true
		// 		}, () => {
		// 			uni.stopPullDownRefresh()
		// 			// #ifdef APP-NVUE
		// 			this.showRefresh = false
		// 			// #endif
		// 			console.log('end');
		// 		})
		// 		console.log('refresh');
		// 	},
		// 	loadMore() {
		// 		cdbRef.loadMore()
		// 	},
		// 	onqueryerror(e) {
		// 		console.error(e);
		// 	},
		// 	onpullingdown(e) {
		// 		console.log(e);
		// 		this.showRefresh = true
		// 		if(e.pullingDistance>100){
		// 			this.refresh()
		// 		}
		// 	}
		// },
		// // #ifndef APP-NVUE
		// onPullDownRefresh() {
		// 	this.refresh()
		// },
		// onReachBottom() {
		// 	this.loadMore()
		// }
		// // #endif
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}
	/* #endif */
	.pages {
		background-color: #FFFFFF;
	}

	.avatar {
		width: 200rpx;
		height: 200rpx;
		margin-right: 10rpx;
	}

	.main {
		justify-content: space-between;
		flex: 1;
	}

	.title {
		font-size: 16px;
	}

	.info {
		flex-direction: row;
		justify-content: space-between;
	}

	.author,
	.last_modify_date {
		font-size: 14px;
		color: #999999;
	}

	.uni-search-box {
		background-color: #FFFFFF;
		position: sticky;
		height: 50px;
		top: 0;
		left: 0;
		/* #ifndef APP-PLUS */
		z-index: 9;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		width: 580rpx;
		/* #endif */
	}
	.cover-search-bar {
		height: 50px;
		position: relative;
		top: -50px;
		margin-bottom: -50px;
		/* #ifndef APP-NVUE */
		z-index: 999;
		/* #endif */
	}
</style>

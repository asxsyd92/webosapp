<template>
	<view>
		<view>
			<view class="article shadow clearfix sr-listshow" v-for="(value, index) in listData" :key="index">
				<view class="article-left">
					<view style="width:100%;height:100%; margin: 0 auto;text-align:center; font-size: 70px;">
						<i :class="'fa '+value.pic" :style="{color:value.titlecolor}"></i>
					</view>
				</view>
				<view class="article-right">
					<view class="article-title" @click="goDetail(value)">
						<span>{{value.title}}</span>
					</view>
					<view class="article-abstract">
						{{value.description}}
					</view>
					<view class="article-footer">
						<span class="layui-hide-xs"><i class="fa fa-tag" aria-hidden="true"></i></span>
						<span><i class="fa fa-clock-o" aria-hidden="true"></i>{{value.adddate}}</span>
						<span class="article-viewinfo">{{value.views}}阅读</span>

						<span class="read layui-btn layui-btn-xs layui-btn-normal layui-hide-xs"
							@click="goDetail(value)">阅读全文</span>
					</view>
				</view>
				<view class="flag flag-left">推荐</view>

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
<script>
	// import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	var dateUtils = require('@/common/utils.js').dateUtils;

	export default {
	
		data() {
			return {

				listData: [],
				last_id: '',
				reload: false,
				viewIndex: 1,
				totalSize: 0,
				limit: 10,
				status: 'more',
				titletype: '',
				adpid: '',
				id: '',
				ads: [],
				current: 0,

				_feedsad: '',
				contentText: {
					contentdown: '加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			};
		},
		onLoad(e) {
			console.log(this);

			this.adpid = this.$adpid;
			this.titletype = e.name; this.id = e.id;



			this.getList();

		},
		onPullDownRefresh() {
			this.reload = true;
			this.last_id = '';
			if (this.totalSize <= (this.viewIndex) * this.limit) {

				this.status = "noMore";
				return;
			}
			this.viewIndex++;
			this.getList();
		},
		onReachBottom() {
			if (this.totalSize <= (this.viewIndex) * this.limit) {
				this.status = "noMore";

				return;
			}


			this.status = 'more';
			this.viewIndex++;
			this.getList();
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			getList() {
				uni.showLoading({
					title: '加载中'
				});
				var _this = this;
				if (_this.last_id) {
					//说明已有数据，目前处于上拉加载
					_this.status = 'loading';

				}

				console.log(_this.reload);
                var id= _this.id==undefined?"":_this.id;
                _this.$post(_this.host + "/api/portalsite/GetNew", { type:id,page:_this.viewIndex,limit:_this.limit }).then(res => {

				if (res.success) {
						let list = res.data;//(resp.data.data);
							console.log(list);
							_this.totalSize = parseInt(res.count);
							_this.viewIndex = _this.viewIndex;
							_this.listData = _this.reload ? list : _this.listData.concat(list);
							_this.last_id = list[list.length - 1].id;
							_this.reload = false;

							this.status = 'more';
				}else{
            			uni.hideLoading();
						console.log('fail' + JSON.stringify(data));
        }

			}).catch(resp => {


			});
			
			},
			goDetail: function (e) {
				console.log(e);
				uni.navigateTo({
					url: 'detail?id=' + e.id
				});
			},
			setTime: function (items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push({
						author: e.author,
						cover: "fa " + e.pic + " fa-5x",
						color: "color:" + e.titlecolor,
						id: e.id,
						views: e.views,
						post_id: e.id,
						description: e.description,
						published_at: dateUtils.format(e.adddate),
						title: e.title
					});
				});
				return newItems;
			},
			aderror(e) {
				console.log("aderror: " + JSON.stringify(e.detail));
			}
		}
	};
</script>
<style>
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
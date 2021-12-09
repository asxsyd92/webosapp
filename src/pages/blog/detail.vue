<template>

	<view>


			<view class="layui-row layui-col-space15 clearfix">
				<view class="layui-col-md8 left">
					<view data-fontsize="14" class="article-detail shadow">
						<view class="article-tool">
							<view style="float:left;">
								<button class="layui-btn layui-btn-primary layui-btn-xs" title="发布日期">
									{{news.adddate}}
								</button>
								<view class="layui-btn-group">
									<button class="layui-btn layui-btn-primary layui-btn-xs" title="浏览">
										<i class="fa fa-eye fa-fw"></i><span
											style="margin-left:3px;">{{news.views}}</span>
									</button>
									<button class="layui-btn layui-btn-primary layui-btn-xs" title="评论">
										<i class="fa fa-thumbs-up fa-fw"></i><span
											style="margin-left:3px;">{{news.thumbsup}}</span>
									</button>
								</view>
							</view>
							<view class="tool-box">
								<view class="layui-btn-group layui-hide-xs">

									<button class="layui-btn layui-btn-primary layui-btn-xs" title="字体缩小">
										<i class="fa fa-minus fa-fw"></i>
									</button>
									<button class="layui-btn layui-btn-primary layui-btn-xs" title="字体还原">
										<i class="fa fa-undo fa-fw"></i>
									</button>
									<button class="layui-btn layui-btn-primary layui-btn-xs" title="字体放大">
										<i class="fa fa-plus fa-fw"></i>
									</button>
								</view>
								<view class="layui-btn-group layui-hide-xs">
									<button class="layui-btn layui-btn-primary layui-btn-xs" title="展开阅读">
										<i class="fa fa-arrows-h fa-fw"></i>
									</button>
									<button class="layui-btn layui-btn-primary layui-btn-xs" title="全屏阅读">
										<i class="fa fa-arrows-alt fa-fw"></i>
									</button>
								</view>
							</view>
						</view>
						<view class="article-detail-title">
							{{news.title}}
						</view>
						<view class="article-detail-abstract">
							<span class="layui-badge">摘要</span>
							<span id="abstract">
								{{news.description}}
							</span>
						</view>
						<view class="article-detail-content w-e-text">
							<view style="height:50px"></view>
							<!-- #ifdef MP-QQ -->
							<view class="adContainer">
								<ad unit-id='c2b6e06149d349798bf59a7c14e3e4f7' type="card"></ad>
							</view>
							<!-- #endif  -->

							<!-- #ifdef MP-WEIXIN  -->
							<ad unit-id="adunit-d0afedca1cfb4087" ad-type="video" ad-theme="white"></ad>
							<!-- #endif  -->

							<view show-height="600">
								<rich-text :nodes="htmlNodes"></rich-text>
							</view>
						</view>
						<view class="article-detail-copyright">
							<p>版权声明：本文由爱上歆随懿恫原创出品，转载请注明出处！</p>
							<p>欢迎关注学点博客了解更多！</p>
						</view>
					</view>
				</view>
				<view class="article-component">
					<view class="component-box">
						<!-- <view  class="praise" blog-event="praise" ><i class="fa fa-thumbs-up fa-fw"></i>点赞（<span id="praiseCnt">{{news.thumbsup}}</span>）</view>
  					 -->
						<view class="reword" @tap="dialogConfirm" blog-event="reword">赞</view>
						<!-- <view class="share" blog-event="share"><i class="fa fa-share-alt fa-fw"></i>分享（<span id="shareCnt">0</span>）</view>
                    </view> -->
					</view>

					<!-- #ifdef MP-QQ -->
					<view class="adContainer">
						<ad unit-id="49fbbff61639d5c62ace1745f1f019b0" type="feeds"></ad>
					</view>
					<!-- #endif  -->

					<view class="layui-col-md4 right">

						<view class="layui-row layui-col-space10">
							<view class="layui-col-sm6 layui-col-md12">
								<view class="blog-card shadow">
									<view class="blog-card-title">博文推荐</view>
									<ul class="blog-card-ul">
										<li v-if="lastarticle!=null">
											<span class="layui-badge  ">下</span><span
												@click="goDetail(lastarticle)">{{lastarticle.title}}</span>
										</li>
										<li v-if="nextarticle!=null">
											<span class="layui-badge  ">上</span><span
												@click="goDetail(nextarticle)">{{nextarticle.title}}</span>
										</li>
									</ul>
								</view>
							</view>


						</view>
						<!--右边悬浮 平板或手机设备显示-->
						<!-- <view class="category-toggle"><i class="fa fa-chevron-left"></i></view> -->
					</view>

					<!-- 消息提示 -->
					<uni-popup id="popupMessage" ref="popupMessage" type="message">
						<uni-popup-message :type="msgType" :message="message" :duration="2000"></uni-popup-message>
					</uni-popup>
					<!-- 对话框 -->
					<uni-popup id="popupDialog" ref="popupDialog" type="dialog">
						<uni-popup-dialog :type="msgType" :title="title" :content="message" :before-close="true"
							@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
					</uni-popup>

		     </view>
				</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				title: '',
				banner: {},
				htmlNodes: [],
				_banner: '', _cardad: '',
				thumbsup: '',
				_feedsad: '',
				lastarticle: [],
				nextarticle: [],

				type: 'top',
				msgType: 'success',
				message: '这是一条成功消息提示',
				value: '默认输入的内容',
				title: '温馨提示',
				news: {},
				id: "",
				dzcs: 0
			}
		}
		// #ifdef MP-QQ 
		/**
* 用户点击右上角分享
*/
		,
		onShareAppMessage: function () {
			qq.showShareMenu({
				showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
			})
		}


		//#endif
		//#ifdef MP-WEIXIN 

		//#endif
		,
		onLoad(event) {


			uni.setNavigationBarTitle({
				title: '加载中'
			});
			this.id = event.id;
			uni.showLoading({
				title: '加载中'
			});
			this.getDetail();


		},
		methods: {
			goDetail: function (e) {
				console.log(e);
				uni.navigateTo({
					url: 'detail?id=' + e.id
				});
			},
			getDetail() {
				var _this = this;
        _this.$post(_this.host + "/api/portalsite/GetNewDetails", { id: _this.id }).then(res => {

				if (res.success) {
					var htmlString = res.data.contents.replace(/\\/g, "").replace(/src="\/upload/g, 'src="https://asxsyd92.com/upload')
								.replace(/src="\/asxsyd92upload/g, 'src="https://asxsyd92.com/asxsyd92upload').replace(/<img/gi, '<img width="90%!important" ');//
							_this.news =res.data;
							_this.nextarticle =res.data.nextarticle;
							_this.lastarticle = res.data.lastarticle;
							this.htmlNodes = htmlParser(htmlString);
							_this.thumbsup =res.data.thumbsup;
						}
						uni.setNavigationBarTitle({
							title: res.data.title
						});


        

			}).catch(resp => {


			});

			},
			dialogConfirm() {
				let m = this;
				if (this.dzcs < 1) {
					uni.showLoading({
						title: '加载中'
					});
					var users = uni.getStorageSync("userid");
					uni.request({
						url: m.host + '/api/applets/ThumbsUp',//服务器端地址
						data: {
							id: m.id,
							userid: users,
							jf: 0
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							uni.hideLoading();
							m.type = "top"; m.message = '点赞成功！'; m.$refs.popupMessage.open();
						}

					});
					this.dzcs++;
				} else {
					//#ifdef MP-WEIXIN 
					// 在页面中定义激励视频广告
					let videoAd = null

					// 在页面onLoad回调事件中创建激励视频广告实例
					if (wx.createRewardedVideoAd) {
						videoAd = wx.createRewardedVideoAd({
							adUnitId: 'adunit-c87b893841314c19'
						})
						videoAd.onLoad(() => { })
						videoAd.onError((err) => { })
						videoAd.onClose((res) => {
							if (res.isEnded) {
								uni.showLoading({
									title: '加载中'
								});
								var users = uni.getStorageSync("userid");
								uni.request({
									url: m.URLs + '/api/applets/ThumbsUp',//服务器端地址
									data: {
										id: m.id,
										userid: users,
										jf: 1
									},
									method: 'POST',
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									success: (res) => {
										uni.hideLoading();
										m.type = "top"; m.message = '获得10积分！'; m.$refs.popupMessage.open();
									}

								});



							} else {

								m.type = "top";
								m.title = "温馨提示！";
								m.message = '我会很努力的！';
								m.$refs.popupDialog.open();
							}
						})
					}

					// 用户触发广告后，显示激励视频广告
					if (videoAd) {
						videoAd.show().catch(() => {
							// 失败重试
							videoAd.load()
								.then(() => videoAd.show())
								.catch(err => {
									console.log('激励视频 广告显示失败')
								})
						})
					}
					//#endif
					// #ifdef MP-QQ 
					this.videoAd = qq.createRewardedVideoAd({ adUnitId: "d00f62fd84ad12b93644447ab012b9ac" });
					this.videoAd.onError(function (res) { console.log('videoAd onError', res) });
					this.videoAd.onLoad(function (res) { console.log('videoAd onLoad', res) });
					this.videoAd.onClose(function (res) {
						if (res.isEnded) {
							uni.showLoading({
								title: '加载中'
							});
							var users = uni.getStorageSync("userid");
							uni.request({
								url: m.URLs + '/api/applets/ThumbsUp',//服务器端地址
								data: {
									id: m.id,
									userid: users,
									jf: 1
								},
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								success: (res) => {
									uni.hideLoading();
									m.type = "top";
									m.message = '获得10积分！';
									m.$refs.popupMessage.open();
								}

							});



						} else {

							m.type = "top";
							m.title = "温馨提示！";
							m.message = '我会很努力的！';
							m.$refs.popupDialog.open();
						}
						console.log('videoAd onClose', res)
					});
					this.videoAd.load().then(() => {
						console.log('激励视频加载成功');
						this.videoAd.show().then(() => { console.log('激励视频 广告显示成功') })
							.catch(err => { console.log('激励视频 广告显示失败') })
					})
						.catch(err => { console.log('激励视频加载失败'); })
					this.$refs.popupMessage.open()
					console.log('点击确认');
					//	#endif
				}

			},
			/**
	 * 对话框取消按钮
	 */
			dialogClose(done) {
				done();
				//uni.navigateBack();
			},
		}
	}
</script>

<style>
	.banner {
		/* height: 150rpx; */
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
		height: 200px;
	}

	.banner-title {

		overflow: hidden;
		position: absolute;
		left: 30rpx;
		bottom: 30rpx;
		width: 95%;
		font-size: 17px;
		font-weight: 400;
		line-height: 20px;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20rpx 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26rpx;
		line-height: 50rpx;
		margin: 0 20rpx;
	}

	.article-author,
	.article-time {
		font-size: 30rpx;
	}

	.article-content {
		padding: 0 30rpx;
		overflow: hidden;
		font-size: 30rpx;
		margin-bottom: 30rpx;
	}
</style>
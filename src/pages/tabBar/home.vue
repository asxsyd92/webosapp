<template>
	<view>
		<!-- #ifdef MP-QQ -->
		<view class="adContainer">
			<ad unit-id="49fbbff61639d5c62ace1745f1f019b0" type="feeds"></ad>
		</view>
		<!-- #endif  -->
		<!-- #ifdef MP-WEIXIN  -->
		<ad unit-id="adunit-d0afedca1cfb4087" ad-type="video" ad-theme="white"></ad>
		<!-- #endif  -->
		<uni-grid  :column="3" :show-border="false" :square="false" @change="change">
			<uni-grid-item v-for="(item ,index) in list" :index="index"  :key="index">
				<view class="grid-item-box">
					<view :class="item.other" :style="item.value"> </view>
					<text class="text">{{item.title}}</text>
					<view v-if="item.code" class="grid-dot">
						<uni-badge :type="item.note" />
					</view>
				</view>
			</uni-grid-item>
		</uni-grid>
		<!-- #ifdef MP-QQ -->
		<view class="adContainer">
			<ad unit-id='c2b6e06149d349798bf59a7c14e3e4f7' type="card"></ad>
		</view>
		<!-- #endif  -->
	</view>
</template>
<script>
	export default {
        name:"home",
		data() {
			return {

				dynamicList: [],
				list: []

			}
		},
		onLoad(e) {
			let _this = this;

			_this.$post(_this.host + "/api/applets/GetBycode?code=asxsydboke").then(res => {
				console.log(res);
				console.log(res);
				if (res.success) {
					_this.list = res.data;
				}

			}).catch(resp => {


			});

		},
		onShareAppMessage: function () {
			qq.showShareMenu({
				showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
			})
		},
		methods: {

			change(e) {
				console.log("11");
				let {index	} = e.detail;
			//	this.list[index].badge && this.list[index].badge++
				uni.navigateTo({
					url: '/pages/' + this.list[index].code + '&name=' + this.list[index].title,
					animationType: 'pop-in',
					animationDuration: 200
				});



			}
		}

	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */


	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: rgba(255, 255, 255, 0.342);
		min-height: 100%;
		height: auto;
	}

	.text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}


	.grid-dynamic-box {
		margin-bottom: 15px;
	}


	.uni-grid {

		display: flex;

		flex-direction: row;
		flex-wrap: wrap;
	}


	.grid-item-box {
		flex: 1;

		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
		background-color: rgba(255, 255, 255, 0.568);
		flex-wrap: nowrap;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}
</style>
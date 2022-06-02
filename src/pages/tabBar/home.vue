<template>
	<view class="container">


		<uni-section title="文字滚动" subTitle="使用 scrollable 属性使通告滚动,此时 single 属性将失效,始终单行显示" type="line">
			<uni-notice-bar show-icon scrollable  show-get-more  color="#2979FF" background-color="#EAF2FF"
				text="uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。" />
		</uni-section>
		<uni-section>
					<!-- #ifdef MP-QQ -->
					<view class="adContainer">
						<ad unit-id="49fbbff61639d5c62ace1745f1f019b0" type="feeds"></ad>
					</view>
					<!-- #endif  -->
					<!-- #ifdef MP-WEIXIN  -->
					<ad unit-id="adunit-d0afedca1cfb4087" ad-type="video" ad-theme="white"></ad>
					<!-- #endif  -->
		</uni-section>
        <uni-section title="滑动视图" type="line" padding>
			<!-- 因为swiper特性的关系，请指定swiper的高度 ，swiper的高度并不会被内容撑开-->
			<swiper class="swiper" :indicator-dots="true">
				<swiper-item>
				<uni-grid :column="4" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box" >
						<uni-icons type="image" :size="30" color="#777" />
						<text class="text">{{item.title}}</text>
					</view>
				</uni-grid-item>
				</uni-grid>
				</swiper-item>
	
		
			</swiper>
		</uni-section>
	</view>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import { onLoad } from "@dcloudio/uni-app";
import http from '../../utils/http';
const list=ref( []);
const	getMore=function() {
				uni.showToast({
					title: '点击查看更多',
					icon: 'none'
				})
			}
      onLoad(() => {
        init();
      })
     const change=function(e :any) {
				let {
					index
				} = e.detail as any;
				//list.value[index].badge  && list.value[index].badge++

				uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				})
			}
			
			const init=function(){
				console.log("开始请求");
			http.post("https://asxsyd92.com" + "/api/applets/GetBycode",{"code":"asxsydboke"},"请稍等").then((res:any) => {
							
								console.log(res);
								if (res.success) {
									list.value = res.data;
								}
							}).catch((resp:any) => {
							});
			}
</script>
<style lang="scss">
	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		// display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
	}

	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-item-box-row {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.swiper {
		height: 200px;
	}

	/* #ifdef H5 */
	@media screen and (min-width: 768px) and (max-width: 1425px) {
		.swiper {
			height: 630px;
		}
	}

	@media screen and (min-width: 1425px) {
		.swiper {
			height: 830px;
		}
	}

	/* #endif */
</style>
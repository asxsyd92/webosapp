<template>
		<mescroll-uni ref="mescrollRef"  @down="downCallback"  @up="upCallback">
	<view class="container">

		<uni-notice-bar v-if="notice" :speed="50" show-icon scrollable show-get-more color="#2979FF" background-color="#EAF2FF"  :text="notice.title" @getmore="go(notice)"/>


		<!-- #ifdef MP-QQ -->
		<view class="adContainer">
			<ad unit-id="49fbbff61639d5c62ace1745f1f019b0" type="feeds"></ad>
		</view>
		<!-- #endif  -->
		<!-- #ifdef MP-WEIXIN  -->
		<ad unit-id="adunit-d0afedca1cfb4087" ad-type="video" ad-theme="white"></ad>
		 <!-- #endif  -->
		<!-- 因为swiper特性的关系，请指定swiper的高度 ，swiper的高度并不会被内容撑开-->
		<swiper class="swiper" :indicator-dots="true">
			<swiper-item>
				<uni-grid :column="4" :highlight="true" @change="change">
					<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
						<view class="grid-item-box">
							<view :style="'font-size: 30px;  color:' + item.color + ';'"
								:class="'layui-icon ' + item.icon" />
							<text class="text">{{ item.title }}</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</swiper-item>


		</swiper>


	</view>
	</mescroll-uni>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { onLoad } from "@dcloudio/uni-app";
import http from '../../utils/http';
import utils from '../../utils/utils';
const list = ref([]) as any;
const notice = ref([]) as any;

	const downCallback = (mescroll: any) => {
			console.log(mescroll)
		init(mescroll);
	}

const upCallback=(mescroll: any)=>{
		mescroll.endErr();
}
const change = (e: any)=> {
	let {index} = e.detail as any;
	console.log(e);
	let url = "";
	if (list.value[index].tag.indexOf("?") > -1) {
		url = list.value[index].tag + '&name=' + list.value[index].title;
	} else {
		url = list.value[index].tag + '?name=' + list.value[index].title;
	}
	uni.navigateTo({
		url: '/pages/' + url,
		animationType: 'pop-in',
		animationDuration: 200
	});

}
const go=(e:any)=>{
	uni.navigateTo({
		url: '/pages/notice/details?id=' + e.id,
		animationType: 'pop-in',
		animationDuration: 200
	});
}
const init =  (mescroll:any)=> {
	http.post("/api/applets/getMenuList", { "type": 0 }, "请稍等").then((res: any) => {
		if (res.success) {
			list.value = res.data;
			if(res.notice!==undefined){
			if(res.notice.length>0){
		    notice.value=res.notice[0];
			setInterval(function(){
				let d=utils.random(0,res.notice.length-1);
				notice.value=res.notice[d];
			},9000)	
			}
			
			}
			mescroll.endBySize(list.value.length,list.value.length, null)
		}else{
			        mescroll.endErr();
		}
	}).catch((resp: any) => {
		mescroll.endErr();
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
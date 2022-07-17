<template>
	<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback">


		<view class="sign_conent_box">
			<view class="sign_conent">
				<view class="sign_conent_title">
					你已签到
					<span class="sign_conent_title_span">{{day}}</span>
					天
				</view>
				<view class="sign_list_aligns">
					<scroll-view class="scroll-view_H" scroll-x="true">
						<view class="scroll_view_items" v-for="(item, index) in sign_list" :key="index">
							<!--  -->
							<view class="scroll_view_itemsv">
								<view class="scroll_view_item">
									<view class="scroll_view_item_img_box">
										<!-- 		<image src="../../static/sign_bg.png" class="scroll_view_item_img" mode=""></image> -->
										<view class="scroll_view_item_top"></view>
										<view class="scroll_view_item_bottom">一张</view>
									</view>
									<view class="scroll_view_item_tips">签到天</view>
								</view>
								<!-- <view class="scroll_xian" v-show="index !== sign_list.length - 1"></view> -->
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="sign_conent_btn" @click="cksigin">签到</view>
			</view>
		</view>
			<!-- #ifdef MP-QQ -->
    <view class="adContainer">
	<ad  unit-id='c2b6e06149d349798bf59a7c14e3e4f7' type="card"></ad>
    </view>
    <!-- #endif  -->

	<!-- #ifdef MP-WEIXIN  -->
      <view class="adContainer">
       <ad  unit-id="adunit-fedf1e291603300b"  bindload="adLoad" binderror="adError" bindclose="adClose"></ad>
     </view>
    <!-- #endif  -->
		<uni-calendar class="uni-calendar--hook" :selected="selected" :range="true" />
		<!-- 消息提示 -->
		<uni-popup id="popupMessage" ref="popupMessage" type="message">
			<uni-popup-message :type="type" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
		<!-- 提示窗示例 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="config.popupmessage.success" cancelText="我不需要" confirmText="好的" title="温馨提示"
				:content="msg" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
 

	</mescroll-uni>
</template>

<script lang="ts" setup >
import { ref } from 'vue';
import http from '../../utils/http';
import utils from '../../utils/utils';
import config from '@/config.ts';
const selected = ref([]);
const sign_list = ref([]);
const data = ref([]);
const message = ref("");
const username = ref("");
const type = ref("");
const msg = ref("");
const day=ref(0);
const alertDialog = ref(null) as any;
const popupMessage = ref(null) as any;
const videoadd = ref(false) as any;
const downCallback = (mescroll: any) => {
	initi();
	mescroll.endErr();
	//init(mescroll);
}

const upCallback = (mescroll: any) => {
	mescroll.endErr();
}
const dialogConfirm = () => {

    utils.wxads('/api/applets/Integral',{},videoadd.value,http);
	videoadd.value=true;
}
const dialogClose = () => {
	console.log('点击关闭')
}
const initi = () => {
	http.post("/api/applets/getSinList", {}).then((res: any) => {
		if (res.success) {
			day.value=res.data.length;
			selected.value = res.data;
		} else {

		}

	}).catch((res: any) => {

	})

}
const cksigin = () => {
	http.post("/api/applets/Signin", {}).then((res: any) => {
		if (res.success) {
			console.log(popupMessage.value);
			message.value = res.msg;
			msg.value = res.msg + "观看视频可获得10到100积分，积分可解锁文章";
			alertDialog.value.open();
		} else {
			message.value = res.msg;
			type.value = config.popupmessage.error
			popupMessage.value.open();
		}

	}).catch((res: any) => {
		message.value = "网络错误";
		type.value = config.popupmessage.error
		popupMessage.value.open();
	})
}



const adsinti = () => {
	

	}


</script>

<style lang="scss">
.sign_conent_box {
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 10upx;
    text-align: center;
	.sign_conent {
		width: 99%;
		background: white;
		border-radius: 20upx;
		padding: 20upx 12upx;
		box-sizing: border-box;

		.sign_conent_title {
			width: 100%;
			font-size: 36upx;
			font-weight: bold;
			color: #333333;

			.sign_conent_title_span {
				color: #ff6526 !important;
			}
		}

		.sign_list_aligns {
			width: 100%;
			padding: 20upx;
			box-sizing: border-box;

			.scroll-view_H {
				width: 100%;
				display: flex;
				white-space: nowrap;

				.scroll_view_items {
					display: inline-block;
				}

				.scroll_view_itemsv {
					display: flex;
				}

				.scroll_view_item {
					.scroll_view_item_img_box {
						width: 108upx;
						height: 108upx;
						position: relative;

						.scroll_view_item_top {
							font-size: 20upx;
							color: #bf8d46;
							font-weight: bold;
							position: absolute;
							top: 32upx;
							width: 100%;
							text-align: center;
							z-index: 1;
						}

						.scroll_view_item_bottom {
							font-size: 12upx;
							color: #ffe29d;
							position: absolute;
							bottom: 18upx;
							left: 42upx;
							z-index: 2;
						}
					}

					.scroll_view_item_tips {
						width: 108upx;
						text-align: center;
						font-size: 26upx;
						padding-top: 16upx;
						color: #333333;
					}

					.scroll_view_item_img {
						width: 108upx;
						height: 108upx;
						position: absolute;
						top: 0;
						left: 0;
						z-index: 0;
					}
				}

				.scroll_xian {
					width: 64upx;
					height: 2upx;
					background: #ffe4d9;
					margin-top: 52upx;
				}
			}
		}

		.sign_conent_btn {
			width: 100%;
			border-radius: 45upx;
			background: linear-gradient(270deg, #fcae3a 0%, #f15d25 100%);
			color: #ffffff;
			text-align: center;
			padding: 22upx 0;
			font-size: 32upx;
		}
	}
}
</style>

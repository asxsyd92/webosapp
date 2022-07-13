<template>
	<view>
		<view class="sign_conent_box">
			<view class="sign_conent">
				<view class="sign_conent_title">
					你已连续签到
					<span class="sign_conent_title_span">8</span>
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
										<view class="scroll_view_item_top">{{ item.discount }}</view>
										<view class="scroll_view_item_bottom">一张</view>
									</view>
									<view class="scroll_view_item_tips">签到{{ item.day }}天</view>
								</view>
								<view class="scroll_xian" v-show="index !== sign_list.length - 1"></view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="sign_conent_btn" @click="cksigin">今日签到</view>
			</view>
		</view>
		<uni-calendar class="uni-calendar--hook" :selected="selected" :range="true"  />
	</view>
</template>

<script lang="ts" setup >
	function getDate(date, AddDayCount = 0) {
			if (!date) {
				date = new Date()
			}
			if (typeof date !== 'object') {
				date = date.replace(/-/g, '/')
			}
			const dd = new Date(date)
	
			dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
	
			const y = dd.getFullYear()
			const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
			const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
			return {
				fullDate: y + '-' + m + '-' + d,
				year: y,
				month: m,
				date: d,
				day: dd.getDay()
			}
		}
	const sign_list="";
	const data="";
			const 	cksigin=()=> {
						uni.showToast({
							title:"签到成功"
						})
					}
				const	selected = [{
											date: getDate(new Date(),-3).fullDate,
											info: '打卡'
										},
										{
											date: getDate(new Date(),-2).fullDate,
											info: '签到',
											data: {
												custom: '自定义信息',
												name: '自定义消息头'
											}
										},
										{
											date: getDate(new Date(),-1).fullDate,
											info: '已打卡'
										}
									];



</script>

<style lang="scss">
.sign_conent_box {
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 10upx;
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
			padding: 48upx 0 64upx 0;
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

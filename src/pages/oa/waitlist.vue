<template>
	<view class="container">
	<view>
		<view>
			<view class="article shadow clearfix sr-listshow" v-for="(value, index) in waitlist" :key="index">
				<view class="article-left">
					<view style="width:100%;height:100%; margin: 0 auto;text-align:center; font-size: 70px;">
						<!-- <i :class="'fa '+value.pic" :style="{color:value.titlecolor}"></i> -->
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
						<span class="layui-hide-xs"><i class="fa fa-tag" aria-hidden="true"></i></span>
						<!-- <span><i class="fa fa-clock-o" aria-hidden="true"></i>发送人：{{value.sendername}}</span> -->
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

	</view>
</template>

<script  lang="ts">
import { ref} from 'vue';
import { onLoad } from "@dcloudio/uni-app";
import http from '../../utils/http';
	//var dateUtils = require('@/common/utils.js').dateUtils;

	export default {
	   setup(){
    const waitlist=ref([]);
    const reload=ref(false);
	const viewIndex=ref(1);
	const totalSize=ref(0);
	const limit=ref(10);
	const status=ref('more');
	const contentText=ref({
					contentdown: '加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				});
	const titletype=ref('');
	const adpid=ref('');
	const id=ref('');
	const ads=ref([]);
	const current=ref(0);
	const _feedsad=ref("");
	   
	  onLoad((event :any) => {
	uni.setStorageSync('token',"eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiMSIsIm9yZ25hbWUiOiLotKLliqHpg6giLCJpcCI6IjM5LjEyOC4xNS4xOTMiLCJuYW1lIjoi5b6u5L-h55So5oi3IiwiaWQiOiJFQjAzMjYyQy1BQjYwLTRCQzYtQTRDMC05NkU2NkE0MjI5RkUiLCJhdmF0YXIiOiJodHRwczovL3RoaXJkd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL1BPZ0V3aDRtSUhPNG5pYkgwS2xNRUNOampHeFFVcTI0WkVhR1Q0cG9DNmljUmljY1ZHS1N5WHdpYmNQcTRCV21pYUlHdUcxaWN3eGFRWDZnckM5VmVtWm9KOHJnLzEzMiIsImV4cCI6MTY1NDIwMTkzNiwib3JuYW1lIjoi6LSi5Yqh6YOoIiwiaWF0IjoxNjU0MTk4MzM2LCJhY2NvdW50IjoiYXN4c3lkOTIiLCJvcmdpZCI6IjM5NzU2MjRDLTE0OEYtNDgzOC04OEM5LTEyQUY4NUQyRTA1RSIsImp0aSI6IjU3MWI3NmZlOGFkMjRlMjdhZDM1ZWI5NDE0MzEwYjFlIn0.retzxpiuUuKsBDuRuaQ4Ys5xwH6YXlpg4KcEPSO12gw");
             init();
	 })
	
		const onPullDownRefresh=()=> {
			reload.value = true;
		
			if (totalSize.value <= (viewIndex.value) * limit.value) {

				status.value = "noMore";
				return;
			}
			viewIndex.value++;
			init();
		}
	const	onReachBottom=()=> {
			if (totalSize.value <= (viewIndex.value) * limit.value) {
				status.value = "noMore";

				return;
			}


			status.value = 'more';
			viewIndex.value++;
			init();
		}
	
		const	onClickItem=(e:any)=> {
				if (current.value !== e.currentIndex) {
					current.value = e.currentIndex
				}
			}
		const	init=()=> {
				uni.showLoading({
					title: '加载中'
				});
		
           	http.post("https://asxsyd92.com" + "/api/workflowtasks/WaitList",{page:viewIndex.value,limit:limit.value},"请稍等").then((res:any) => {
          
				if (res.success) {
						let list = res.data;
               
							console.log(list);
							totalSize.value = parseInt(res.count);
							viewIndex.value = viewIndex.value;
							waitlist.value = reload.value ? list : waitlist.value.concat(list);
			
							reload.value = false;
                            if(list.length>0){
	                          status.value= 'more';
							}else{
							  status.value = "noMore";
							}
						
				}else{
            			uni.hideLoading();
				
        }

			}).catch((resp:any) => {


			});
			
			}
			const dealwith= (e:any)=> {
		      var query = "";
            query = query + "&taskid=" + e.id + "&groupid=" + e.groupid;
				uni.navigateTo({
					url: '/pages/workrun/index?instanceid=' + e.instanceid + "&flowid=" + e.flowid + "&stepid=" + e.stepid + query
				});
			}


		
		
		
			return{
waitlist,status,contentText,dealwith

	}}
	};
</script>
<style lang="scss">

</style>
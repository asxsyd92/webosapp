<template>

    <view>


        <view class="layui-row layui-col-space15 clearfix">
            <view class="layui-col-md8 left">
                <view data-fontsize="14" class="article-detail shadow">
                 <view class="notice-title">
                        {{ notice.title }}
                    </view>
               <view class="notice-br"></view>
                    <view class="article-detail-content w-e-text">
                      
                        <!-- #ifdef MP-QQ -->
                        <view class="adContainer">
                            <ad unit-id='c2b6e06149d349798bf59a7c14e3e4f7' type="card"></ad>
                        </view>
                        <!-- #endif  -->

                        <!-- #ifdef MP-WEIXIN  -->
                        <ad unit-id="adunit-d0afedca1cfb4087" ad-type="video" ad-theme="white"></ad>
                        <!-- #endif  -->

                        <view show-height="600">
                            <rich-text :nodes="notice.contents"></rich-text>
                        </view>
                    </view>
              
                </view>
            </view>


        </view>
    </view>

</template>
<script lang="ts"  setup>
import {
    ref
} from 'vue';
import {
    onLoad
} from "@dcloudio/uni-app";

import http from '../../utils/http';

const query = ref(new Object()) as any;
const notice = ref(new Object()) as any;

onLoad((event: any) => {

    query.value.id = event.id == undefined ? "" : event.id;
    init();

});
const init = () => {

    http.post("/api/notice/GetNoticeDetails", { id: query.value.id }).then((res: any) => {

        if (res.success) {
            notice.value = res.data;
            notice.value.contents = notice.value.contents.replace(/\\/g, "").replace(/src="\/upload/g, 'src="https://asxsyd92.com/upload')
                .replace(/src="\/asxsyd92upload/g, 'src="https://asxsyd92.com/asxsyd92upload').replace(/<img/gi, '<img width="90%!important" ');//
            notice.value = res.data;
            // _this.nextarticle =res.data.nextarticle;
            // _this.lastarticle = res.data.lastarticle;
            // this.htmlNodes = htmlParser(htmlString);
            //_this.thumbsup =res.data.thumbsup;
        }
        uni.setNavigationBarTitle({
            title: res.data.title
        });




    }).catch(resp => {


    });
}
</script>
<style>
	.notice-title{
	text-align: center;
	    
	    color: red;
	   
	    font-weight: bold;
	    line-height: 30px;
	}
	.notice-br {
	    border-top: 2px #ff0500 solid;
	    margin-top: 20px;
	    text-align: center;
	
	}
</style>

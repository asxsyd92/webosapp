<template>

    <view>


        <view class="layui-row layui-col-space15 clearfix">
            <view class="layui-col-md8 left">
                <view data-fontsize="14" class="article-detail shadow">
                    <view class="article-tool">
                        <view style="float:left;">
                            <button class="layui-btn layui-btn-primary layui-btn-xs" title="发布日期">
                                {{ news.adddate }}
                            </button>
                            <view class="layui-btn-group">
                                <button class="layui-btn layui-btn-primary layui-btn-xs" title="浏览">
                                    <i class="fa fa-eye fa-fw"></i><span style="margin-left:3px;">{{ news.views }}</span>
                                </button>
                                <button class="layui-btn layui-btn-primary layui-btn-xs" title="评论">
                                    <i class="fa fa-thumbs-up fa-fw"></i><span
                                        style="margin-left:3px;">{{ news.thumbsup }}</span>
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
                        {{ news.title }}
                    </view>
                    <view class="article-detail-abstract">
                        <span class="layui-badge">摘要</span>
                        <span id="abstract">
                            {{ news.description }}
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
                            <rich-text :nodes="news.contents"></rich-text>
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
                    <!-- <view class="reword" @tap="dialogConfirm" blog-event="reword">赞</view> -->
                    <!-- <view class="share" blog-event="share"><i class="fa fa-share-alt fa-fw"></i>分享（<span id="shareCnt">0</span>）</view>
                    </view> -->
                </view>

                <!-- #ifdef MP-QQ -->
                <view class="adContainer">
                    <ad unit-id="49fbbff61639d5c62ace1745f1f019b0" type="feeds"></ad>
                </view>
                <!-- #endif  -->

                <view class="layui-col-md4 right">

                    <!-- <view class="layui-row layui-col-space10">
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
							</view> -->


                </view>
                <!--右边悬浮 平板或手机设备显示-->
                <!-- <view class="category-toggle"><i class="fa fa-chevron-left"></i></view> -->
            </view>

            <!-- 消息提示 -->
            <!-- <uni-popup id="popupMessage" ref="popupMessage" type="message">
						<uni-popup-message :type="msgType" :message="message" :duration="2000"></uni-popup-message>
					</uni-popup> -->
            <!-- 对话框 -->
            <!-- <uni-popup id="popupDialog" ref="popupDialog" type="dialog">
						<uni-popup-dialog :type="msgType" :title="title" :content="message" :before-close="true"
							@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
					</uni-popup> -->

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
const news = ref(new Object()) as any;

onLoad((event: any) => {

    query.value.id = event.id == undefined ? "" : event.id;
    init();

});
const init = () => {

    http.post("/api/portalsite/GetNewDetails", { id: query.value.id }).then((res: any) => {

        if (res.success) {
            news.value = res.data;
            news.value.contents = news.value.contents.replace(/\\/g, "").replace(/src="\/upload/g, 'src="https://asxsyd92.com/upload')
                .replace(/src="\/asxsyd92upload/g, 'src="https://asxsyd92.com/asxsyd92upload').replace(/<img/gi, '<img width="90%!important" ');//
            news.value = res.data;
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

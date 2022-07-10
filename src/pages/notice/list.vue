<template>
<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback"
				:down="downOption" :up="upOption">
    <view>
        <view>
            <view class="article shadow clearfix sr-listshow" v-for="(value, index) in listData" :key="index">
                <view class="article-left">
                    <view>
                        <i class="layui-icon layui-icon-speaker" style="width:100%;height:100%; margin: 0 auto;text-align:center; font-size: 70px;color: red;"></i>
                    </view>
                </view>
                <view class="article-right">
                    <view class="article-title" @click="dealwith(value)">
                        <span>{{ value.title }}</span>
                    </view>
                    <view class="article-abstract">
                        {{ value.description }}
                    </view>
                    <view class="article-footer">
                        <span class="layui-hide-xs"><i class="fa fa-tag" aria-hidden="true"></i></span>
                        <span><i class="fa fa-clock-o" aria-hidden="true"></i>{{ value.adddate }}</span>
                        <span class="article-viewinfo">{{ value.views }}阅读</span>

                        <span class="read layui-btn layui-btn-xs layui-btn-normal layui-hide-xs"
                            @click="dealwith(value)">阅读全文</span>
                    </view>
                </view>
                <view class="flag flag-left">推荐</view>

                <view class="ad-view" v-if="(index > 0 && (index + 1) % 9 == 0)">
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

        </view>

    </view>
    </mescroll-uni>
</template>

<script lang="ts" setup>
import {
    ref
} from 'vue';
import {
    onLoad
} from "@dcloudio/uni-app";

import http from '../../utils/http';

const query = ref(new Object()) as any;
onLoad((event: any) => {

    query.value.id = event.id==undefined?"": event.id;

});
const listData = ref([]) as any;
const mescrollInit = (mescroll: any) => {
    console.log(mescroll)
 
}
const downCallback = (mescroll: any) => {
    console.log(mescroll)
    init(mescroll, false);
}
const upCallback = (mescroll: any) => {
    init(mescroll, true);

}
const downOption = (mescroll: any) => {
    console.log(mescroll)

}
const upOption = (mescroll: any) => {
    console.log(mescroll)

}

const init = (mescroll: any, up: boolean) => {
    console.log(mescroll)
    let page = 1,
        limit = 10;
    if (up) {
        page = mescroll.options.up.page.num;
        limit = mescroll.options.up.page.size;
    } else {
        page = 1;
        limit = 10;
    }
    http.post("/api/notice/GetNotecePage", {
        // type: query.value.id,
        page: page,
        limit: limit
    }).then((res: any) => {

        if (res.success) {
            let list = res.data;

            if (!up) {
                listData.value = list;
            } else {
                listData.value = listData.value.concat(list);
            }
            mescroll.endBySize(listData.value.length, res.count, null)


        } else {
            mescroll.endErr();
            uni.hideLoading();

        }

    }).catch((resp: any) => {

        mescroll.endErr();
    });

}
const dealwith = (e: any) => {
    
    uni.navigateTo({
        url: './details?id=' + e.id
    });
}
</script>

<style lang="scss">
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

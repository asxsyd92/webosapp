
import config from "@/config.ts"
class Utils {


    /* 获取随机数 方法 */
    random(min: number, max: number) {

        return Math.floor(Math.random() * (max - min)) + min;

    }
    /* 加载广告 */
    wxads(url: any, data: object, video: boolean, http: any) {

        let videoAd;

        if (wx.createRewardedVideoAd) {

            videoAd = wx.createRewardedVideoAd({
                adUnitId: "adunit-c87b893841314c19"
            })

            if (!video) {
                videoAd.onLoad(() => {

                })
                videoAd.onError((err) => {
                    console.log("加载失败")
    
                })
                videoAd.onClose((res: any) => {
                    if (res.isEnded) {
                        http.post(url, data).then((resp: any) => {
                            if (resp.success) {
                                uni.showToast({
                                    title: resp.msg
                                })
                            } else {

                            }
                        })

                    } else {

                    }
                })
            }


        }
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




    }

}

export default new Utils()
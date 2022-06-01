
class Http {

  /* GET 方法 */
  get<T>(url: string, params?: object, _object = {}) {
    return new Promise((resolve, reject) => {

      var token = uni.getStorageSync('token');
      console.log(token);
      uni.request({
        url: url, //仅为示例，并非真实接口地址。
        data: params,
        method: 'GET',
        success: (res) => {
          if (res.statusCode == 401) {
            uni.clearStorageSync();
            uni.reLaunch({ url: '/pages/login/login' });
          }
          resolve(res.data);
        },
        fail: (err) => {
          uni.showToast({title: "请求错误"});
          reject(err)
        }
      });


    })
  }
  /* POST 方法 */
  post<T>(url: string, params?: object, _object = {}, msg?: string, _msg = "", headers?: object) {
    return new Promise((resolve, reject) => {
      uni.showLoading({
        title: msg == undefined ? '加载中' : msg
      });
      var token = uni.getStorageSync('token');
      console.log(token);
      uni.request({
        url: url, //仅为示例，并非真实接口地址。
        data: params,
        method: 'POST',
        header: headers == undefined ? {
          'content-type': 'application/x-www-form-urlencoded',
          "Authorization": "bearer " + token
        } : headers,
        success: (res) => {

          uni.hideLoading();
          if (res.statusCode == 401) {
            uni.clearStorageSync();
            uni.reLaunch({ url: '/pages/login/login' });
          }
          resolve(res.data);
        },
        fail: (err) => {
          console.log(err);
          uni.hideLoading();
          uni.showToast({title: "请求错误"});
 
          reject(err)
        }
      });


    })
  }

}

export default new Http()
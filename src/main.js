import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


import store from './store'
import { post, get,patch, put} from '@/common/request'
import 'animate.css/animate.min.css';
Vue.config.productionTip = false


//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$store = store
Vue.prototype.host ="http://127.0.0.1:89"

App.mpType = 'app' 
const app = new Vue({
  ...App
})
app.$mount()

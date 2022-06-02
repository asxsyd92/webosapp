<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
   @import './assets/css/layui.css';  
  @import './assets/css/site.css'; 
  @import './assets/css/articledetail.css'; 
  @import './assets/css/wangEditor.css';  
</style>

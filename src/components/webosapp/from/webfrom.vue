<template>
<view>
  
  <iteminput  v-if="data.type=='input'" :data="data"></iteminput>

</view>

</template>
<script>
import webfrom from './webfrom.js';

export default {
   name:"webfrom",
    components:{  ...webfrom},
   // inject: ['formjson'],   
   props: {
    data: {
      type: Object,
      required: true
    },
    model: Object
  },
    // watch: {
    // 'formjson': {
    //   handler(v) {
    //     this.$emit('change', v);
    //   },
    //   deep: true
    // }},
    mounted(){
     
     
      
    }

}
</script>

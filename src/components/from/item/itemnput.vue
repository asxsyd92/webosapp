	<template>
  <view>
  <view v-if="data.type=='input'" :style="'display:'+data.data.display">
  <!-- 输入框 -->
    <view v-if="data.data.type=='text'" >
	    <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
				<uni-easyinput type="text" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
			</uni-forms-item>
      </view>
    <!-- 数字输入框 -->
      <view v-if="data.data.type=='number'" >
	    <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
      <uni-number-box v-model="value[data.data.name]" ></uni-number-box>
			</uni-forms-item>
      </view>
     <!-- 密码输入框 -->
      <view v-if="data.data.type=='password'" >
	    <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
     	<uni-easyinput type="password" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
			</uni-forms-item>
       </view>
          <!-- 时间输入框 -->
      <view v-if="data.data.type=='date'" >
	    <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
     <uni-datetime-picker v-model="value[data.data.name]" type="daterange" />
		
			</uni-forms-item>
       </view>
        <!-- 身份证输入框 -->
      <view v-if="data.data.type=='idcard'" >
	    <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
     <uni-datetime-picker v-model="value[data.data.name]" type="daterange" />
		  	<uni-easyinput type="idcard" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
			</uni-forms-item>
       </view>
      
  </view>
    <view v-if="data.type=='textarea'">
       <view v-if="data.data.type=='textarea'" >
	    <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
				<uni-easyinput type="textarea" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
			</uni-forms-item>
      </view>
    </view>
  
  </view>
     
    </template>


    
<script lang="ts" setup>
import { ref   } from "vue";
interface ItemnputProps {
  data: any;
  value:any;
}
const props = withDefaults(defineProps<ItemnputProps>(), {
  data:Object, value:Object
});

const data = ref(props.data);
const value = ref(props.value);
console.log(data);
console.log(value);

</script>

	<template>
  <view>
  	<uni-forms-item :label="data.data.label" :prop="data.data.name">
				<uni-easyinput type="text" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
			</uni-forms-item>
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

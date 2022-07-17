<template>
  <view>
        <sign-canvas @save="save" @cancel="cancel" :show="showCanvas"></sign-canvas>
		<image :src="src"></image>>
    </view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	const showCanvas=ref(false);
	const src=ref("");
  const toSign=()=> {
	        showCanvas.value = true;
	    }
		const cancel=()=> {
		    showCanvas.value = false;
		}
		const save=(file)=> {
			console.log(file)
			src.value=file;
		    //设置保存的图片
		    //<!-- 这里上传图片,看你自己情况 -->
		}

</script>

<style>

</style>>
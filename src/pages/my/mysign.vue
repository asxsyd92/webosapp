<template>
	<view>
	<gzImageRotate ref="gzimage" @success="success"></gzImageRotate>
		<button @click="submit">选择图片</button>
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import http from '../../utils/http';
import utils from '../../utils/utils';
const signurl=ref("");
const gzimage=ref(null);
 import gzImageRotate from '@/components/gz-image-rotate/gz-image-rotate.vue'
const submit=()=>{
	 uni.chooseImage({
	                    success: (res) => {
	                        res.tempFilePaths[0],
	                        gzimage.start(res.tempFilePaths[0], 3)
	                    }
	                })
}
</script>

<style>

</style>

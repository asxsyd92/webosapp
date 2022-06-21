<template>
	<view v-if="data.type == 'radio'">
		<view v-if="data.data.required == 'true'">
			<uni-forms-item :label="data.data.label" :prop="data.data.name" required>
				<uni-data-checkbox v-model="value[data.data.name]" :localdata="radio" />
			</uni-forms-item>
		</view>
		<view v-else>
			<uni-forms-item :label="data.data.label" :prop="data.data.name">
				<uni-data-checkbox v-model="value[data.data.name]" :localdata="radio" />
			</uni-forms-item>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import http from '../../../utils/http';
import { onLoad } from "@dcloudio/uni-app";
interface ItemradioProps {
	data: any;
	value: any;
}
const props = withDefaults(defineProps<ItemradioProps>(), {
	data: Object,
	value: Object
});

const data = ref(props.data);
const value = ref(props.value);
console.log(data);
const radio = ref([]) as any;

//渲染数据
const render = function () {

	//本地数据
	if (data.value.data.type = 'local') {
		if (data.value.data.data != null && data.value.data.data != undefined && data.value.data.data != "") {
			try {

				let s = data.value.data.data.split(';');
				s.forEach((item: string) => {
					var d = new Object() as any;
					let ss = item.split(",");
					console.log(ss);
					if (ss[0] == "") {
						return;
					}
					d.text = ss[0];
					d.value = ss[1];
					if (!Number.isNaN(d.value)) {
						d.value = Number.parseFloat(d.value);
					}


					radio.value.push(d);
				})
				console.log(value.value);
			} catch (e) {

				console.log(data.value.data.name + "radio配置不正确");
			}


		}
	}
	//字典数据
	else {

		http.post("/api/form/GetDictionaryByCode", {
			id: data.value.data.input
		}, "请稍等").then((resp: any) => {
			if (resp.success) {
				radio.value = resp.data;

			}
		}).catch(resp => {


		})

	}
}
render();
// onLoad(() => {
// 	render();
// })

</script>

<style>
</style>

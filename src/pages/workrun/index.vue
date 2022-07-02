<template>
	<view class="container">
		<!-- #ifndef H5 -->
		<statusBar></statusBar>
		<!-- #endif -->
		<scroll-view>
			<uni-section :title="fromdata.form==undefined?'':fromdata.form.name" type="line">
				<view class="example">

					<uni-forms ref="form" :modelValue="fromdata.field" :rules="rules" label-position="top">
						<view v-for="(item, index) in fromdata.data" :key="index">
							<subform :data="item" :value="fromdata.field"></subform>
						</view>
					</uni-forms>
					<!--     <uni-title
          type="h2"
          v-if="fromdata.length > 0"
          :title="fromdata.from.data.name"
          align="center"
        ></uni-title>
        <view style="text-align: center; width: 100%; margin: 5px">
          <text class="uni-h6" v-if="fromdata != null"
            >当前步骤： {{ currentdata.name }}</text
          >
        </view> -->
					<uni-steps :options="[{ title: currentdata.name }]" active="0" />
					<view class="setheight"></view>
				</view>
			</uni-section>
		</scroll-view>
		<!-- 消息提示 -->
		<uni-popup id="popupMessage" ref="popupMessage" type="message">
			<uni-popup-message :type="msgType" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
		<view class="goods-carts">
			<uni-goods-nav :options="sendoptions" :fill="true" :button-group="buttonGroup" @click="submit"
				@buttonClick="submit" />
		</view>
	</view>
</template>

<script lang="ts">
import subform from "@/components/from/subform.vue";
import http from "../../utils/http";
import {
	ref,
	getCurrentInstance
} from "vue";
import {
	onLoad
} from "@dcloudio/uni-app";
export default {
	components: {
		subform
	},
	setup() {
		const msgType = ref("");
		const message = ref("message");
		const currentInstance = getCurrentInstance();
		const query = ref(new Object()) as any;
		const isflow = ref(false);
		const step = ref([]);
		const currentdata = ref(new Object()) as any;
		const signature = ref(false);
		const fromdata = ref([]) as any;
		const nextstep = ref([]);
		const commentlist = ref([]);
		const field = ref([]) as any;
		const rules = ref({});
		const sendoptions = [{
			icon: "loop",
			text: "刷新",
		},
		{
			icon: "undo",
			text: "撤回",

			infoBackgroundColor: "#007aff",
			infoColor: "#f5f5f5",
		},
		{
			icon: "closeempty",
			text: "终止",
		},
		{
			icon: "plus-filled",
			text: "保存",
		},
		];
		const buttonGroup = ref([
			// {
			// 					text: '退回',
			// 					backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
			// 					color: '#fff'
			// 				},
			{
				text: "发送",
				backgroundColor: "linear-gradient(90deg, #1E83FF, #0053B8)",
				color: "#fff",
			},
		]);
		onLoad((event: any) => {
			console.log(event);
			query.value.flowid = event.flowid;
			query.value.instanceid = event.instanceid;
			query.value.taskid = event.taskid;
			query.value.stepid = event.stepid; //$("#stepid").val();
			query.value.groupid = event.groupid;
			if (query.value.flowid != null && query.value.flowid != undefined && query.value.flowid != "") {
				isflow.value = true;
			} else {
				query.value.formid = event.formid;
			}
			init();
		});
		const init = () => {
			if (isflow) {
				//初始化流程在初始化表单
				http
					.post(
						"/api/workflowtasks/FlowInit", {
						flowid: query.value.flowid,
						stepid: query.value.stepid,
						instanceid: query.value.instanceid
					},
						"正在初始化流程"
					)
					.then((res: any) => {
						if (res.success) {
							console.log(res);
							currentdata.value = res.currentdata;
							if (
								currentdata.value.signatureType == 0 ||
								currentdata.value.signatureType == "0"
							) {
								signature.value = true;
							}
							var k = JSON.parse(res.formdata.designhtml);
							fromdata.value = k;
							nextstep.value = res.data;
							field.value = k.field;
							debugger
							if (k.field == null) {
								var obj = new Object() as any;
								fromdata.value.data.forEach((key: any) => {
									for (let keys in key.data) {
										if (keys == "name") {
											//field.value = { [key.data[keys]]: "" };
											obj[key.data[keys]] = key.data['value'];
										}
									}
								});
								console.log(obj);
								fromdata.value.field = obj;
								console.log(fromdata.value.field);
							}
					
							rules.value = k.rules;
							console.log(rules.value);
							console.log(fromdata.value);
							if (res.data.length > 0) {
								res.data.forEach((item: any) => {
									let o = new Object() as any;
									o.text = item.name;
									o.value = item.id;
									step.value.push(o);
								});
							}

							console.log(step.value);

							if (
								isflow &&
								query.instanceid != null &&
								query.instanceid != undefined &&
								query.instanceid != ""
							) {
								getcomment();
							}

							msgType.value = "top";
							message.value = res.msg;
							currentInstance.refs.popupMessage.open();

							console.log("初始化成功");
						} else {
							msgType.value = "top";
							message.value = res.msg;
							currentInstance.refs.popupMessage.open();
						}
					})
					.catch((resp: any) => { });
			} else {
				getform();
			}
		};

		///获取表单
		const getform = () => {
			http
				.post("/api/form/getFormJson", {
					key: query.value.formid
				}, "请稍等")
				.then((res: any) => {
					// m.$post(m.host + "/api/form/getFormJson", { key: m.query.formid }, "请稍等").then(res => {
					if (res.success) {
						var k = JSON.parse(res.data.designhtml);

						fromdata.value = k;
						field.value = k.field;
						rules.value = k.rules;
						if (
							query.value.instanceid != null &&
							query.value.instanceid != undefined &&
							query.value.instanceid != ""
						) {
							getTabelDate();
						}
					} else {
						msgType.value = "top";
						message.value = res.msg;
						currentInstance.refs.popupMessage.open();
					}
				})
				.catch((resp) => { });
		};



		const getcomment = () => {
			http
				.post(
					"/api/workflowtasks/getcomment", {
					query: JSON.stringify(query.value)
				},
					"请稍等"
				)
				.then((res: any) => {
					// m.$post(m.host + "/api/workflowtasks/getcomment", { query: JSON.stringify(m.query) }, "请稍等...").then(res => {
					if (res.success) {
						commentlist.value = res.data;
					}
				});
		};

		const submit = () => {
			debugger;
			var form = currentInstance.refs.form;

			msgType.value = "top";
			message.value = form.formData.id;
			currentInstance.refs.popupMessage.open();
			console.log("表单错误信息：");
			form
				.validate()
				.then((res: any) => {
					console.log("表单数据信息：", res);
				})
				.catch((err: any) => {
					console.log("表单错误信息：", err);
				});
		};
		const getTabelDate = () => { };
		return {
			submit,
			msgType,
			message,
			subform,
			fromdata,
			currentdata,
			sendoptions,
			buttonGroup,
		};
	},
};
</script>

<style lang="scss">
.example {
	padding: 15px;
	background-color: #fff;
}

.segmented-control {
	margin-bottom: 15px;
}

.button-group {
	margin-top: 15px;
	display: flex;
	justify-content: space-around;
}

.form-item {
	display: flex;
	align-items: center;
}

.button {
	display: flex;
	align-items: center;
	height: 35px;
	margin-left: 10px;
}

.status-btn {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 92rpx;
	margin: 30rpx;
	background-color: #007aff;
}

.goods-carts {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	position: fixed;
	left: 0;
	right: 0;
	/* #ifdef H5 */
	left: var(--window-left);
	right: var(--window-right);
	/* #endif */
	bottom: 0;
	background: #fff;
}
</style>

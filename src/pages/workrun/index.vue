<template>
<view class="work">
<uni-forms  ref="form" :modelValue="formData"  label-position="top">

        <view v-for="(item, index) in data" :key="index">
             <subform :data="item" :value="formData"></subform>
          
        </view>
</uni-forms>
	<button @click="submit">提交</button>
      <!-- 消息提示 -->
  <uni-popup id="popupMessage" ref="popupMessage" type="message">
    <uni-popup-message :type="msgType" :message="message" :duration="2000"></uni-popup-message>
  </uni-popup>
    </view>


</template>

<script lang="ts">
  import subform from '@/components/from/subform.vue';

  import { ref ,getCurrentInstance } from "vue";
  import { onLoad } from "@dcloudio/uni-app";
export default{
        components: {subform },
        setup(){
            const msgType=ref("");
            const message=ref("message");
         const   currentInstance=getCurrentInstance();
		  const query= ref(new Object()) as any;
		   const isflow= ref(false);






                   onLoad((event :any) => {
					console.log(event);
        query.flowid = event.flowid;
      query.instanceid = event.instanceid;
      query.taskid = event.taskid;
      query.stepid = event.stepid; //$("#stepid").val();
      query.groupid = event.groupid;
      if (query.flowid != null && query.flowid != undefined && query.flowid != "") {
        isflow.value = true;

      } else {
        query.formid = event.formid;
      }
      init();
                    });
		const  init=()=>{

		};

  const formData=ref({id: 'LiMing'});   
const data=ref( [{
		"icon": "fa fa-edit",
		"name": "id",
		"id": "id",
		"type": "input",
		"data": {
			"label": "id",
			"name": "id",
			"placeholder": "请输入",
			"value": "",
			"type": "text",
			"inputclass": "layui-input",
			"col": "layui-col-md3",
			"disabled": "false",
			"required": "true",
			"showtext": "false",
			"display": "none"
		}
	}]);


	const	submit=()=> {
        debugger
       var  form=currentInstance.refs.form;
     
          msgType.value = "top";
              message.value = form.formData.id;
            currentInstance.refs.popupMessage.open();
       console.log('表单错误信息：');
		form.validate().then((res:any)=>{
				console.log('表单数据信息：', res);
                	
			}).catch((err:any) =>{
				console.log('表单错误信息：', err);
			})
		  }
             return {
            formData,data,submit,msgType,message,subform
        }
         }
     
        }

</script>

<style lang="scss">
 .work{
  padding: 5px;
 }
</style>
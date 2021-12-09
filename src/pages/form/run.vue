<template>
  <view class="run">
    <view class="layui-card">
      <view class="layui-container">
        <uni-forms class="layui-from" :modelValue="field" ref="form">
          <view class="layui-input-block layui-footer">
            <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" @click="submit">立即提交</button>
            <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm" layui-btn-sm>重置</button>
            <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" @click="close()"
              layui-btn-sm>关闭</button>
          </view>
          <view class="layui-form-item">
            <!-- 微信端小程序不支持组件获取表单中取值 -->
            <view v-for="li in fromdata.data" :key="li.id">
              <!-- 输入框开始 -->
              <view :style="{display:li.data.display}">
                <view v-if="li.type=='input'">
                  <uni-forms-item :label="li.data.label" :name="li.data.name">
                    <uni-easyinput :type="li.data.type" v-model="li.data.value" :placeholder="li.data.placeholder" />
                    <span v-if="li.data.showtext=='true'" style="line-height: 2.5;">{{li.data.value}}</span>
                  </uni-forms-item>
                </view>
              </view>
              <!-- 输入框结束 -->
              <!-- radio开始 -->
              <view :style="{display:li.data.display}">
                <view v-if="li.type=='radio'">
                  <uni-forms-item required :name="li.data.name" :label="li.data.label">
                    <uni-data-checkbox v-model="li.data.value"
                      :localdata="[{text:'是',value:'1'},{text:'否',value:'0'}]" />
                  </uni-forms-item>
                </view>
              </view>
              <!-- radio结束 -->
              <!-- radio开始 -->
              <view :style="{display:li.data.display}">
                <view v-if="li.type=='xmselect'">
                  <uni-forms-item required :name="li.data.name" :label="li.data.label">
                    <uni-data-checkbox v-model="li.data.value"
                      :localdata="[{text:'是',value:'1'},{text:'否',value:'0'}]" />
                  </uni-forms-item>

                </view>
              </view>
              <!-- radio结束 -->
            </view>


          </view>
        </uni-forms>
      </view>
    </view>

    <!-- 消息提示 -->
    <uni-popup id="popupMessage" ref="popupMessage" type="message">
      <uni-popup-message :type="msgType" :message="message" :duration="2000"></uni-popup-message>
    </uni-popup>
    <!-- 对话框 -->
    <uni-popup id="popupDialog" ref="popupDialog" type="dialog">
      <uni-popup-dialog :type="msgType" :title="title" :content="message" :before-close="true" @confirm="dialogConfirm"
        @close="dialogClose"></uni-popup-dialog>
    </uni-popup>

  </view>

</template>

<script>
  import run from './run';
  import Enumerable from 'linq';
  export default {
    name: "run",
    data() {
      return {
        field: {},
        query: new Object(),
        nextstepid: "",
        senduser: [],
        currentStep: {},
        currentdata: {},
        neextdata: {},
        fromdata: [],
        msgType: "",
        message: "",
        title: '',
        isflow: false,
          from: [],
          fromdata:[]
      }
    },
    onLoad(event) {
      //流程必要参数
      var m = this;
  console.log("run");
      m.query.flowid = event.flowid;
      m.query.instanceid = event.key;
      m.query.taskid = event.taskid;
      m.query.stepid = event.stepid; //$("#stepid").val();
      m.query.groupid = event.groupid;
       if(m.query.flowid!=null&&m.query.flowid!=undefined&&m.query.flowid!=""){
         m.isflow=true;
         
       }else{
          m.query.formid = event.formid;
       }
      m.init();

      //m.query.form_titlefield = $("#_asxsfromname").text();
      //m.query.titlefield = $("#_asxsfromname").text();

    },
    methods: {

      close() {

      },
      /**
               * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
               * @param {String} name 字段名称
               * @param {String} value 表单域的值
               */
      // binddata(name,value){
      // 通过 input 事件设置表单指定 name 的值
      //   this.$refs.form.setValue(name, value)
      // },
      // 触发提交表单
      submit(e) {
        var m = this;
        this.$refs.form.validate().then(res => {
          console.log(res);
          console.log(JSON.stringify(res));
          m.msgType = "top";
          m.message = JSON.stringify(res);
          m.$refs.popupMessage.open();

        }).catch(err => {

        })
      }, init() {
  
        var m = this;
        if(m.isflow){
        //初始化流程在初始化表单
        m.$post(m.host + "/api/workflowtasks/FlowInit", { flowid: m.query.flowid, stepid: m.query.stepid,instanceid:m.query.instanceid  }, "正在初始化流程").then(res => {
          if (res.success) {
            console.log(res);  
            m. currentdata=res.currentdata;
           var k = JSON.parse(res.formdata.designhtml);
            m.fromdata = k;
            console.log(m.fromdata);
            m.bindfield();
            m.msgType = "top";
            m.message = res.msg;
            m.$refs.popupMessage.open();
           
          } else {
            m.msgType = "top";
            m.message = res.msg;
            m.$refs.popupMessage.open();
          }

        }).catch(resp => {


        });
        }
        else{
            m.getform();
        }



      },
      ///获取表单
      getform() {
        var m = this;
        m.$post(m.host + "/api/form/getFormJson", { key: m.query.formid },"请稍等").then(res => {
          if (res.success) {
            var k = JSON.parse(res.data.designhtml);
            m.fromdata = k;
            console.log(m.fromdata);
            m.bindfield();
            if(m.query.instanceid!=null&&m.query.instanceid!=undefined&&m.query.instanceid!=""){
              getTabelDate();
            }
          } else {
            m.msgType = "top";
            m.message = res.msg;
            m.$refs.popupMessage.open();
          }

        }).catch(resp => {


        });
      },  
      //获取表单数据
      getTabelDate() {
        var m = this;
        m.$post(m.host + "/api/tasks/GetFormData", { key: m.query.instanceid, tab: k.from.data.table }).then(res => {

        }).catch(data => {
          if (data.success) {
            //对所有表单赋值
            Enumerable.from(m.fromdata).toArray().filter(item => {
              try {
                //Enumerable.from(m.list2.data).firstOrDefault(i => i.id == id);
               let temp = Enumerable.from(m.currentdata.fieldStatus).firstOrDefault(i => i.field == item.data.name);
                if(temp!=null){
                   item.data.showtext = temp.status;
                }
                item.data.value = data.data[item.data.name];
              } catch {
                item.data.value = "";
              }
            });


          }

          m.fromdata = k.data;
          m.from = k.from.data;
       
        });
      }
      //绑定字段属性
      , bindfield() {
        var m = this;
        m.fromdata.forEach(key => {
          for (let keys in key.data) {
            if (keys == "name") {
              m.field = { [key.data[keys]]: "" };

            }
          }
        });
      }

    }
  }
</script>
<style>
  page {

    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.342);
    min-height: 100%;
    height: auto;
  }

  .run {
    top: 5px;
  }

  .layui-container {
    position: relative;
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
    top: 5px;
  }
</style>
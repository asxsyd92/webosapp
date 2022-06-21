	<template>
  <view>
    <view v-if="data.type == 'input'">
      <!-- 输入框 -->
      <view v-if="data.data.type == 'text'" :style="'display:' + data.data.display">
        <view v-if="data.data.required == 'true'">
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name" required>
            <uni-easyinput type="text" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
          </uni-forms-item>
        </view>
        <view v-else>
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
            <uni-easyinput type="text" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
          </uni-forms-item>
        </view>
      </view>
      <!-- 数字输入框 -->
      <view v-if="data.data.type == 'number'" :style="'display:' + data.data.display">
        <view v-if="data.data.required == 'true'">
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name" required>
            <uni-number-box v-model="value[data.data.name]"></uni-number-box>
          </uni-forms-item>
        </view>
        <view v-else>
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
            <uni-number-box v-model="value[data.data.name]"></uni-number-box>
          </uni-forms-item>
        </view>
      </view>
      <!-- 密码输入框 -->
      <view v-if="data.data.type == 'password'" :style="'display:' + data.data.display">
        <view v-if="data.data.required == 'true'">
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name" required>
            <uni-easyinput type="password" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
          </uni-forms-item>
        </view>
        <view v-else>
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
            <uni-easyinput type="password" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
          </uni-forms-item>
        </view>
      </view>
      <!-- 时间输入框 -->
      <view v-if="data.data.type == 'date' || data.data.type == 'datetime'" :style="'display:' + data.data.display">
        <view v-if="data.data.required == 'true'">
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name" required>
            <uni-datetime-picker v-model="value[data.data.name]" type="datetime" />

          </uni-forms-item>
        </view>
        <view v-else>
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
            <uni-datetime-picker v-model="value[data.data.name]" type="datetime" />

          </uni-forms-item>
        </view>
      </view>
      <!-- 身份证输入框 -->
      <view v-if="data.data.type == 'idcard'" :style="'display:' + data.data.display">
        <view v-if="data.data.required == 'true'">
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name" required>
            <uni-datetime-picker v-model="value[data.data.name]" type="daterange" />
            <uni-easyinput type="idcard" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
          </uni-forms-item>
        </view>
        <view v-else>
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
            <uni-datetime-picker v-model="value[data.data.name]" type="daterange" />
            <uni-easyinput type="idcard" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
          </uni-forms-item>
        </view>
      </view>

    </view>
    <view v-if="data.type == 'textarea'">
      <view v-if="data.data.type == 'textarea'" :style="'display:' + data.data.display">
        <view v-if="data.data.required=='true'">
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name" required>
            <uni-easyinput type="textarea" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
          </uni-forms-item>
        </view>
        <view v-else>
          <uni-forms-item :label="data.data.label" :prop="data.data.name" :name="data.data.name">
            <uni-easyinput type="textarea" v-model="value[data.data.name]" :placeholder="data.data.placeholder" />
          </uni-forms-item>
        </view>
      </view>
    </view>

  </view>

</template>


    
<script lang="ts" setup>
import { ref } from "vue";
const required = ref("");
interface ItemnputProps {
  data: any;
  value: any;
}
const props = withDefaults(defineProps<ItemnputProps>(), {
  data: Object, value: Object
});

const data = ref(props.data);
const value = ref(props.value);
console.log(data);
console.log(value);
if (data.value.data.required == true || data.value.data.required == "true") {
  required.value = "required"
}
</script>

<template>
<view ref="iteminput"> 
          <uni-forms-item  :label="data.data.label" :name="data.data.name" >
                  <uni-easyinput  :type="data.data.type" v-model="data.data.value" :placeholder="data.data.placeholder" />
                  <span v-if="data.data.showtext=='true'" style="datane-height: 2.5;">{{data.data.value}}</span>
                </uni-forms-item>
 </view>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false,
        required: false
      }
    },
    props: {
      data: {
        type: Object
      },
      model: Object
    }, mounted() {
      		// #ifdef VUE3
			let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata
			if (!getbinddata) {
				getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
					if (formName) {
						this.$refs[formName].setValue(name, value);
					} else {
						let formVm;
						for (let i in this.$refs) {
							const vm = this.$refs[i];
							if (vm && vm.$options && vm.$options.name === 'uniForms') {
								formVm = vm;
								break;
							}
						}
						if (!formVm) return console.error('当前 uni-froms 组件缺少 ref 属性');
						formVm.setValue(name, value);
					}
				}
			}
			// #endif
      this.init();

     
    }, methods: {
      init() {
        var m = this;
        m.disabled = m.data.data.disabled == 'true' ? true : false;
        m.required = m.data.data.required == 'true' ? true : false;

      }
    }
  }
</script>
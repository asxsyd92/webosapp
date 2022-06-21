<template>
  <view ref="subform">

    <itemnput v-if="data.type == 'input'||data.type=='textarea'" :data="data" :value="value"></itemnput>
    <itemradio v-if="data.type == 'radio'" :data="data" :value="value"></itemradio>

  </view>

</template>

<script lang="ts" >
import { ref } from "vue";
import itemradio from './item/itemradio.vue';
import itemnput from './item/itemnput.vue';
export default {

  components: { itemnput,itemradio },
  name: "subform",
  props: {
    data: {
      type: Object,
      required: true
    },
    value: {
      type: Object
    }
  },


}
</script> 
<style lang="sass">

</style>


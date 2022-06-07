<template>
  <view ref="subform">

    <itemnput v-if="data.type == 'input'||data.type=='textarea'" :data="data" :value="value"></itemnput>

  </view>

</template>

<script lang="ts" >
import { ref } from "vue";
import itemnput from './item/itemnput.vue';
export default {

  components: { itemnput },
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


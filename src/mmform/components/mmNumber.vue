<template>
  <div class="space">
    <van-stepper 
      :disabled="disabled || readonly"
      v-show="!hidden"
      v-model="modelVal"
      :min="mergeConfig.min"
      :max="mergeConfig.max"
      :step="mergeConfig.step"
     />
  </div>
</template>

<style scoped lang="stylus">
.space
  padding 15px 0 10px;
</style>

<script>

import ncformCommon from '@ncform/ncform-common'

export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],

  data () {
    return {
      defaultConfig: { 
        step: 1
      }
    }
  },

  methods: {
    // you can handle the modelVal before $emit it (before this.$emit('input'))
    _processModelVal (modelVal) {
      return modelVal
    }
  }
}

</script>

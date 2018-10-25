<template>
  <div class="space">
    <van-radio-group v-model="modelVal" :disabled="disabled">
      <van-radio
        v-for="(opt,index) in mergeConfig.enumSource" 
        :key="index" 
        :name="opt.value">{{opt.label}}</van-radio>
    </van-radio-group>
  </div>
</template>

<style scoped lang="stylus">
.space
  padding 15px 0 10px;
.van-radio
  margin 10px 0;
</style>

<script>

import ncformCommon from '@ncform/ncform-common'

export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],

  data () {
    return {
      // defaultConfig: { // your config's default value（Note: use mergeConfig when use config value）
      //   msg: 'mm input'
      // }
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

<template>
  <div class="space">
    <van-switch 
      v-model="modelVal"
      :disabled="disabled"
      v-show="!hidden && !readonly"
      size="30px"
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

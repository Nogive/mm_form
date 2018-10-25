<template>
  <div class="space">
    <van-switch 
      v-model="modelVal"
      v-show="!hidden"
      :disabled="readonly"
      :size="mergeConfig.size"
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
      defaultConfig: { // your config's default value（Note: use mergeConfig when use config value）
        size: '30px'
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

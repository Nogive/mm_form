<template>
  <div class="space" v-show="!hidden">
    <!-- <label>{{mergeConfig.msg}}</label> -->
    <van-cell-group>
      <van-field 
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder||defaultConfig.placeholder"
        :left-icon="leftIcon"
        :type="mergeConfig.type"
        v-show="!hidden"
        v-model="modelVal"
       />
    </van-cell-group>
    
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
        type: 'text',
        placeholder:'请输入内容'
      },
    }
  },
  computed:{
    leftIcon:function(){
      let res="";
      if(this.mergeConfig.type&&this.mergeConfig.type=="tel"){
        res="phone";
      }
      return res;
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

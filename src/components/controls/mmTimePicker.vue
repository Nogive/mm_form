<template>
  <div class="space">
    <input v-model="showVal" class="date-box" :disabled="disabled" type="text" placeholder="点击选择时间" readonly @click="show=!show">
    <van-datetime-picker
      :readonly="readonly"
      v-show="show"
      v-model="modelVal"
      type="time"
      @confirm="onConfirm"
      @cancel="onCancle"
      @change="onChange"
    />
  </div>
</template>

<style scoped lang="stylus">
.space
  padding 15px 0 10px;
  .van-radio
    margin 10px 0;
  .date-box
    width 100%
    height 35px
    padding-left 10px
    border 1px solid rgba(0,0,0,.4);
    border-radius 3px
</style>

<script>

import ncformCommon from '@ncform/ncform-common'
var dateFormat=function(d){
  let date=new Date(d);
  let yyyy=date.getFullYear();
  let mm=date.getMonth()+1;
  let dd=date.getDate();
  let result=yyyy+'-'+(mm>9?mm:'0'+mm)+'-'+(dd>9?dd:'0'+dd);
  return result;
}
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],

  data () {
    return {
      show:false,
      showVal:''
    }
  },
  methods: {
    // you can handle the modelVal before $emit it (before this.$emit('input'))
    _processModelVal (modelVal) {
      return modelVal;
    },
    onConfirm(){
      this.show=false;
      this.showVal=this.modelVal;
    },
    onCancle(){
      this.show=false;
      this.showVal="";
    },
    onChange(){
      this.showVal=this.modelVal;
    }
  }
}

</script>

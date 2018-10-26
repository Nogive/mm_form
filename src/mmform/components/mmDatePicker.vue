<template>
  <div class="space">
    <input 
      v-show="!hidden"
      v-model="inputVal" 
      :disabled="readonly" 
      class="date-box" 
      type="text" 
      readonly
      placeholder="点击选择日期" 
      @click="ToggleDatwPicker">

    <van-datetime-picker
      v-show="show"
      v-model="dateVal"
      :type="mergeConfig.type"
      :readonly="readonly"
      @cancel="onCancle"
      @change="onChange"
      @confirm="onConfirm"
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
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],

  data () {
    let _this=this;
    return {
      defaultConfig: { 
        type:"datetime",
        //formmat:'yyyy-MM-dd'
      },
      show:false,
      formmat:'yyyy-MM-dd',
      inputVal:'',//显示框里内容
      dateVal:new Date()//时间选择器里的时间
    }
  },
  created(){
    if(this.mergeConfig.type){
      this.formmat=setFormat(this.mergeConfig.type);
    }else{
      this.formmat=setFormat(this.defaultConfig.type);
    }
    this._setInitVal();
  },
  watch:{
    dateVal(){
      if(this.inputVal!=""){
        this.modelVal=Date.parse(new Date(this.dateVal));
      }
    }
  },
  methods: {
    _processModelVal (modelVal) {
      return modelVal.toString();
    },
    _setInitVal(){
      if(this.value){
        let d=new Date(this.value);
        let v=formatDate(d,this.formmat);
        this.dateVal=d;
        this.inputVal=v;
      }else{
        this.inputVal="";
        this.dateVal=new Date();
      }
    },
    onChange(picker){
      this.inputVal=formatDate(this.dateVal,this.formmat);
    },
    onConfirm(val){
      this.show=false;
      this.dateVal=val;
      this.inputVal=formatDate(val,this.formmat);
    },
    onCancle(){
      this.show=false;
      this.inputVal="";
    },
    ToggleDatwPicker(){
      if(this.readonly){
        this.show=false;
      }else{
        this.show=!this.show;
      }
    }
  }
}
function setFormat(type){
  let def="yyyy-MM-dd hh:mm";
  if(type=="year-month"){
    def="yyyy-MM";
  }else if(type=="date"){
    def="yyyy-MM-dd";
  }
  return def;
}
function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substring(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
//前面补‘0’
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

</script>

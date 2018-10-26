<template>
  <div class="area">
    <div class="input-wrapper" @click="openArea">
      <input 
        v-model="inputText" 
        type="text" 
        class="title" 
        :placeholder="placeholder || '选择省市区'"
        :readonly="readonly">
      <i class="icon clear" v-show="inputText!=''&&mergeConfig.clearable&&!readonly" @click.stop="clearArea"></i>
    </div>
    <div class="area-wrapper" v-show="areaOn">
      <van-area 
        v-model="endVal" 
        :area-list="mergeConfig.areaList" 
        :columns-num="mergeConfig.columns"
        ref="area"
        @confirm="confirmArea"
        @change="changeArea"
        @cancel="cancelArea" />
    </div>
  </div>
</template>

<style scoped lang="stylus">
.area
  padding 15px 0 10px;
  .input-wrapper
    width 100%
    height 36px
    border 1px solid rgba(0,0,0,.4)
    border-radius 4px
    position relative
    .title
      width 100%
      height 100%
      border none
      padding  0 8px
      border-radius 4px
      background transparent
    .icon
      width 16px
      height 16px
      display inline-block
      position absolute
      top 10px
      right 8px
      &.clear 
        background url('./imgs/clear.png') center center no-repeat
  .area-wrapper
    position fixed
    width 100%
    left 0
    bottom 0
</style>

<script>

import ncformCommon from '@ncform/ncform-common'

export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],

  data () {
    return {
      endVal:'',//最终结果
      areaOn:false,
      inputText:'',//显示数据
      defaultConfig: { 
        columns:3,
        clearable:true
      }
    }
  },
  mounted(){
    if(this.value){
      this.endVal=this.value;
      let areas=this.$refs['area'].getValues();
      this.setInputText(areas);
    }
  },
  watch:{
    endVal:function(){
      this.modelVal=this.endVal;
    }
  },
  methods: {
    // you can handle the modelVal before $emit it (before this.$emit('input'))
    _processModelVal (modelVal) {
      return modelVal
    },
    openArea(){//展开
      if(this.readonly){
        return;
      }
      this.areaOn=!this.areaOn;
    },
    clearArea(){//clear按钮
      this.$refs['area'].reset();
      this.endVal="";
      this.inputText="";
    },
    confirmArea(areas){//点击确认
      this.endVal=areas[areas.length-1].code;
      this.setInputText(areas);
      this.areaOn=false;
    },
    changeArea(area){
      // let areas=area.getValues();
      // this.endVal=areas[areas.length-1].code;
      // this.setInputText(areas);
    },
    cancelArea(){
      this.$refs['area'].reset();
      this.endVal="";
      this.areaOn=false;
    },
    setInputText(areas){
      let text="";
      areas.forEach(e=>{
        text+=e.name+' ';
      })
      this.inputText=text;
    }
  }
}

</script>

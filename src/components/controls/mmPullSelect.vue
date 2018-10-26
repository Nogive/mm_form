<template>
  <div class="select space" v-show="!hidden" >
    <div class="single-wrapper">
      <div class="select-header" @click="expandOptions">
        <div class="input-wrapper">
          <input 
            v-model="inputText" 
            type="text" 
            class="title" 
            :placeholder="placeholder || '请选择'"  
            :readonly="!mergeConfig.filterable || readonly"
            @keyup="filterSearch">
          <i class="icon pullup" v-if="expand"></i>
          <i class="icon pulldown" v-else></i>
          <i class="icon clear" v-show="inputText&&mergeConfig.clearable" @click="clearOptions"></i>
        </div>
      </div>
      <transition name="slide">
        <ul class="select-items" v-show="expand" key="has-item">
          <li 
            class="select-item" :class="{active:item.value==selectedOption.value}"
            v-for="(item,index) in optionSource" :key="index"
            @click.stop="selectOption(item)">
            {{item.label}}
          </li>
          <li v-show="optionSource.length==0" class="no-item">无数据</li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<style scoped lang="stylus">
.select
  &.space
    padding 15px 0 10px
  .single-wrapper
    width 100%
    .select-header
      width 100%
      border 1px solid rgba(0,0,0,.4);
      border-radius 4px
      height 36px
      position relative
      .input-wrapper
        width 100%
        height 100%
        .title
          width calc(100% - 48px)
          height 100%
          border none
          padding  0 8px
          border-radius 4px
        .icon
          width 16px
          height 16px
          display inline-block
          position absolute
          top 10px
          right 8px
          &.pulldown
            background url('./imgs/pulldown.png') center center no-repeat
          &.pullup
            background url('./imgs/pullup.png') center center no-repeat
          &.clear
            right 32px 
            background url('./imgs/clear.png') center center no-repeat
    .select-items
      width 100%
      border 1px solid rgba(0,0,0,.4);
      padding 8px 0
      border-radius 4px
      margin-top 10px
      max-height 200px
      overflow-y auto
      .select-item
        padding 5px 8px
        &.active
          background-color #f5f7fa
          color #409eff
          font-weight 600
      &.slide-enter-active,&.slide-leave-active
        transition all .5s
        transform-origin top center
      &.slide-enter,&.slide-leave-to
        transform:scaleY(0)
      &.slide-enter-to,&.slide-leave
        transform:scaleY(1)
      .no-item
        text-align center
</style>

<script>
import axios from "axios";
import _get from "lodash-es/get";
import ncformCommon from '@ncform/ncform-common'

export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],

  data () {
    return {
      inputText:'',//显示的选中的值
      expand:false,//展开选项
      selectedOption:{},//当前选中的项
      localSource:[],//本地数据源
      optionSource:[],//显示选项源
      //endVal:'',//最终返回的结果

      defaultConfig: { //默认值
        multiple:false,
        filterable:false,
        filterLocal:true,
        clearable:true,
      }
    }
  },
  created(){
    if(this.mergeConfig.enumSourceRemote){
      this.remoteMethod()
    }else{
      this.localSource=this.mergeConfig.enumSource;
      this.optionSource=this.mergeConfig.enumSource;
    }
    this._setModelVal();
  },
  watch:{
    selectedOption:function(){
      if(this.selectedOption.value){
        this.modelVal=this.selectedOption.value;
        this.inputText=this.selectedOption.label;
      }else{
        this.modelVal="";
        this.inputText="";
      }
    }
  },
  methods: {
    //返回value
    _processModelVal (modelVal) {
      return modelVal
    },
    _setModelVal(){
      if(this.modelVal&&this.modelVal!=""){
        let key=this.modelVal;
        this.optionSource.forEach(e=>{
          if(e.value==key){
            this.selectedOption=e;
          }
        })
      }
    },
    remoteMethod(query) {//远程请求选项
      if(!_get(this.mergeConfig, 'enumSourceRemote.remoteUrl')){ return; };
      const options = {
        url: this.mergeConfig.enumSourceRemote.remoteUrl,
        params: JSON.parse(JSON.stringify(this.mergeConfig.enumSourceRemote.otherParams)) 
      };
      options.params[
        this.mergeConfig.enumSourceRemote.paramName
      ] = query;
      axios(options).then(res => {
        let tempArr = this.mergeConfig.enumSourceRemote.resField ? _get(res.data, this.mergeConfig.enumSourceRemote.resField) : res.data;
        this.localSource=this.setResource(tempArr);
        this.optionSource=this.setResource(tempArr);
        this.selectFirstOption();
      });
    },
    setResource(remote){//解析远程数据
      let res=[];
      if(remote&&remote.length>0){
        remote.forEach(e=>{
          res.push({
            label:e[this.mergeConfig.itemLabelField],
            value:e[this.mergeConfig.itemValueField]
          })
        })
      }
      return res;
    },
    selectFirstOption(){//选中第一项
      if (this.mergeConfig.enumSourceRemote.selectFirstitem && this.optionSource.length > 0) {
        this.selectedOption=this.optionSource[0];
      }
    },
    filterSearch(){//过滤搜索
      let v=this.inputText;
      if(this.mergeConfig.filterLocal){
        this.localMethod(v);
      }else{
        this.remoteMethod(v);
      }
    },
    localMethod(key){//在本地搜索
      let res=[];
      if(this.localSource.length>0){
        this.localSource.forEach(e=>{
          if(e.label.includes(key)){
            res.push(e);
          }
        })
        this.optionSource=res;
      }
    },
    expandOptions(){//展开下拉选项
      if(this.readonly){
        return;
      }
      this.expand=!this.expand;
    },
    selectOption(item){//选中某一项
      this.expand=false;
      this.selectedOption=item;
    },
    clearOptions(){//清除选中项
      this.selectedOption={};
    }
  }
}

</script>


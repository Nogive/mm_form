<template>
  <div class="select-wrapper space">
    <div class="select-header" :class="{disabled:disabled}" @click="expandOptions">
      <div class="mul-body" v-if="selectedOptions.length>0">
        <span class="selected-item" v-for="(item,index) in selectedOptions" :key="index">{{item.label}}
          <i class="clear" @click.stop="clearThisOption(item)"></i>
        </span>
      </div>
      <div class="input-wrapper" v-show="showSearch">
        <input 
          type="text" 
          class="title" 
          v-model="inputText"
          :placeholder="placeholder||holder" 
          :readonly="!mergeConfig.filterable || readonly"
          @keyup="filterSearch">
        <i class="icon pullup" v-if="expand"></i>
        <i class="icon pulldown" v-else></i>
      </div>
    </div>
    <transition name="slide">
      <ul class="select-items" v-show="expand" >
        <li 
          class="select-item" :class="{active:selectedOptions.includes(item)}"
          v-for="(item,index) in optionSource" :key="index"
          @click.stop="selectOption(item)">
          {{item.label}}
          <i class="icon selected" v-show="selectedOptions.includes(item)"></i>
        </li>
        <li v-show="optionSource.length==0" class="no-item">无数据</li>
      </ul>
    </transition>
  </div>
</template>
<style scoped lang="stylus">
.select-wrapper
  width 100%
  &.space
    padding 15px 0 10px
  .select-header
    width 100%
    border 1px solid rgba(0,0,0,.4);
    border-radius 4px
    min-height 36px
    &.disabled{
      background #f5f7fa;
    }
    .input-wrapper
      width 100%
      height 36px
      position relative
      .title
        width calc(100% - 32px)
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
        &.pulldown
          background url('./imgs/pulldown.png') center center no-repeat
        &.pullup
          background url('./imgs/pullup.png') center center no-repeat
        &.clear
          right 32px 
          background url('./imgs/clear.png') center center no-repeat
    .mul-body
      width 100%
      padding  0 8px
      border-radius 4px
      .selected-item
        display inline-block
        height 24px
        background #f0f2f5
        background-size 12px 12px
        border-radius 3px
        font-size 12px
        line-height 24px
        padding-left 8px
        padding-right 24px
        margin-top 4px
        margin-right 5px
        margin-bottom 5px
        position relative
        .clear
          display inline-block
          width 16px
          height 16px
          background url('./imgs/clear.png') center center no-repeat
          position absolute
          top 4px
          right 4px
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
      position relative
      &.active
        background-color #f5f7fa
        color #409eff
        font-weight 600
      .selected
        width 16px
        height 16px
        display inline-block
        position absolute
        top 8px
        right 8px
        background url('./imgs/checked.png') center center no-repeat
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
      inputText:'',//输入框的内容
      holder:'请选择',
      endVal:[],//最终结果
      expand:false,//是否展开
      selectedOptions:[],//当前选中的选项
      localSource:[],//本地数据源
      optionSource:[],//显示选项源
      
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
  computed:{
    showSearch:function(){
      if(this.selectedOptions.length>0){
        if(this.mergeConfig.filterable){
          this.holder="输入关键字过滤";
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    }
  },
  watch:{
    selectedOptions:function(){
      this.endVal=[];
      if(this.selectedOptions.length==0){
        this.inputText="";
      }else{
        this.selectedOptions.forEach(e=>{
          this.endVal.push(e.value);
        })
      }
      this.modelVal=this.endVal;
    }
  },
  methods: {
    // you can handle the modelVal before $emit it (before this.$emit('input'))
    _processModelVal (modelVal) {
      return modelVal
    },
    _setModelVal(){
      if(this.modelVal){
        this.optionSource.forEach(element => {
          if(this.modelVal.includes(element.value)){
            this.selectedOptions.push(element);
          }
        });
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
        this.selectedOptions=[this.optionSource[0]];
      }
    },
    filterSearch(){//过滤搜索
      this.expand=true;
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
    expandOptions(){//展开选项
      if(this.readonly){
        return;
      }
      this.expand=!this.expand;
    },
    selectOption(item){
      if(this.selectedOptions.includes(item)){
        let idx=this.selectedOptions.indexOf(item);
        this.selectedOptions.splice(idx,1);
      }else{
        this.selectedOptions.push(item);
      }
    },
    clearThisOption(item){
      let idx=this.selectedOptions.indexOf(item);
      this.selectedOptions.splice(idx,1);
    }
  }
}

</script>


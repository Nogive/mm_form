<template>
  <div class="select" v-show="!hidden" >
    <h1>{{modelVal}}</h1>
    <!-- 多选  -->
    <div class="select-wrapper" v-if="multiple">
      <div class="select-header" @click="toSelect" :class="{disabled:disabled}">
        <div class="mul-body" v-if="selectItem.length>0">
          <span class="selected-item" v-for="(item,index) in selectItem" :key="index">{{item.label}}
            <i class="clear" @click.stop="onClear(item)"></i>
          </span>
        </div>
        <div class="input-wrapper">
          <input type="text" class="title" :placeholder="placeholder || '请选择'" :readonly="!filterable">
          <i class="icon pullup" v-if="showItems"></i>
          <i class="icon pulldown" v-else></i>
        </div>
      </div>
      <transition name="slide">
        <ul class="select-items" v-show="showItems">
          <li 
            class="select-item" :class="{active:selectItem.includes(item)}"
            v-for="(item,index) in enumSource" :key="index"
            @click.stop="onSelect(item)">
            {{item.label}}
            <i class="icon selected" v-show="selectItem.includes(item)"></i>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import _get from "lodash-es/get";

export default {
  data () {
    return {
      readonly:false,
      hidden:false,
      multiple:true,//是否支持多选
      clearable:true,//单选是否支持清空
      placeholder:'',
      filterable:true,//是否支持搜索

      singleVal:'',//单选 选中的值

      showItems:false,
      selectItem:[],
      disabled:false,
      localSource:[],//本地数据源
      itemSource:[],//显示选项源
      enumSource:[//本地选项
        {
          value:1,
          label:'多选1'
        },
        {
          value:2,
          label:'多选2'
        },
        {
          value:3,
          label:'多选3'
        },
        {
          value:4,
          label:'多选4'
        },
        {
          value:5,
          label:'多选5'
        },
      ],
      showSingle:false,
      selectSingle:{},

      filterLocal: true,
      mergeConfig:{
        itemValueField: "key",//返回数据里的 value的值对应本地的value
        itemLabelField: "value",////返回数据里的 key的值对应本地的label
        enumSourceRemote: {
          remoteUrl: "http://rap2api.taobao.org/app/mock/105585/options",//远程请求的地址
          paramName: "keyword",//过滤参数 key
          resField: "options",//返回的数据里的字段
          otherParams:{a:2},
          selectFirstitem: true//是否选中第一项
        }
      },
      modelVal:''
    }
  },
  created(){
    if(this.mergeConfig.enumSourceRemote){
      this.remoteMethod()
    }else{
      this.localSource=this.enumSource;
      this.itemSource=this.enumSource;
    }
  },
  computed:{
  },
  methods: {
    //远程请求
    remoteMethod(query) {
      if(!_get(this.mergeConfig, 'enumSourceRemote.remoteUrl')){ return; };
      const options = {
        url: this.mergeConfig.enumSourceRemote.remoteUrl,
        params: JSON.parse(JSON.stringify(this.mergeConfig.enumSourceRemote.otherParams)) 
      };
      options.params[
        this.mergeConfig.enumSourceRemote.paramName
      ] = query;
      console.log(options);
      axios(options).then(res => {
        let tempArr = this.mergeConfig.enumSourceRemote.resField ? _get(res.data, this.mergeConfig.enumSourceRemote.resField) : res.data;
        this.localSource=this.setResource(tempArr);
        this.itemSource=this.setResource(tempArr);
        //console.log(this.localSource);
        //选中第一个
        if (this.mergeConfig.enumSourceRemote.selectFirstitem && this.itemSource.length > 0) {
          this.modelVal = this.modelVal || this.itemSource[0].label;
        }
      });
    },
    setResource(remote){
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
    //过滤
    onFilter(){
      let v=this.singleVal;
      //判断在在本地过滤还是线上过滤
      if(this.filterLocal){//local
        this.localMethod(v);
      }else{
        this.remoteMethod(v);
      }
    },
    localMethod(key){
      let res=[];
      console.log(key);
      if(this.localSource.length>0){
        this.localSource.forEach(e=>{
          if(e.label.includes(key)){
            res.push(e);
          }
        })
        console.log(res);
        this.itemSource=res;
      }else{
        this.showSingle=true;
      }
    },
    /******************************************************* */
    toSelect(){//点击展开下拉框
      if(this.readonly){
        return;
      }
      this.showItems=!this.showItems;
    },
    onSelect(item){
      if(this.selectItem.includes(item)){
        let idx=this.selectItem.indexOf(item);
        this.selectItem.splice(idx,1);
      }else{
        this.selectItem.push(item);
      }
    },
    onClear(item){
      let idx=this.selectItem.indexOf(item);
      this.selectItem.splice(idx,1);
    },

    toSelectSingle(){
      if(this.readonly){
        return;
      }
      this.showSingle=!this.showSingle;
    },
    onSelectSingle(item){
      this.showSingle=false;
      console.log(item);
      this.singleVal=item.label;
    },
    onCancleSingle(){
      this.selectSingle={};
    }
  }
}
</script>
<style scoped lang="stylus">
.select
  padding 10px
  .select-wrapper
    width 100%
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
            background url('./controls/imgs/pulldown.png') center center no-repeat
          &.pullup
            background url('./controls/imgs/pullup.png') center center no-repeat
          &.clear
            right 32px 
            background url('./controls/imgs/clear.png') center center no-repeat
      .mul-body
        max-width 100%
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
          margin-bottom 4px
          margin-right 5px
          position relative
          .clear
            display inline-block
            width 16px
            height 16px
            background url('./controls/imgs/clear.png') center center no-repeat
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
          background url('./controls/imgs/checked.png') center center no-repeat
      &.slide-enter-active,&.slide-leave-active
        transition all .5s
        transform-origin top center
      &.slide-enter,&.slide-leave-to
        transform:scaleY(0)
      &.slide-enter-to,&.slide-leave
        transform:scaleY(1)
      .no-item
        text-align center
  .single-wrapper
    width 100%
    .select-header
      width 100%
      border 1px solid rgba(0,0,0,.4);
      border-radius 4px
      height 36px
      position relative
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
          background url('./controls/imgs/pulldown.png') center center no-repeat
        &.pullup
          background url('./controls/imgs/pullup.png') center center no-repeat
        &.clear
          right 32px 
          background url('./controls/imgs/clear.png') center center no-repeat
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


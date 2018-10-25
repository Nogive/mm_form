<template>
  <div class="select space">
    <div class="select-wrapper">
      <div class="select-header">
        <input v-model="selectVal" type="text" class="title" placeholder="请选择" @click="toSelect" readonly :disabled="disabled">
        <i class="icon pullup" v-if="showItems"></i>
        <i class="icon pulldown" v-else></i>
        <i class="icon clear" v-show="selectVal" @click="onCancle"></i>
      </div>
      <transition name="slide">
        <ul class="select-items" v-show="showItems">
          <li 
            class="select-item" :class="{active:item.label==selectItem.label}"
            v-for="(item,index) in mergeConfig.enumSource" :key="index"
            @click.stop="onSelect(item)">
            {{item.label}}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<style scoped lang="stylus">
.select
  padding 10px
  &.space
    padding 15px 0 10px
  .select-wrapper
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
</style>

<script>

import ncformCommon from '@ncform/ncform-common'

export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],

  data () {
    return {
      showItems:false,
      selectItem:{},
    }
  },
  computed:{
    selectVal:function(){
      if(this.selectItem){
        return this.selectItem.label;
      }else{
        return "";
      }
    }
  },
  created(){
    if(this.modelVal){
      this.mergeConfig.enumSource.forEach(element => {
        if(element.value==this.modelVal){
          this.selectItem=element;
        }
      });
    }
  },
  methods: {
    // you can handle the modelVal before $emit it (before this.$emit('input'))
    _processModelVal (modelVal) {
      return modelVal
    },
    toSelect(){
      this.showItems=!this.showItems;
    },
    onSelect(item){
      this.selectItem=item;
      this.showItems=false;
      this.modelVal=item.value;
    },
    onCancle(){
      this.selectItem={};
      this.modelVal="";
    }
  }
}

</script>


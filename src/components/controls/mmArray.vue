<template>

  <div class="__array-form-item space">

    <legend v-if="schema.ui.legend && schema.ui.showLegend" @click="collapse()">
      {{schema.ui.legend}}
      <i class="arrow" :class="{'pull-up': !mergeConfig.collapsed, 'pull-down': mergeConfig.collapsed}"></i>
    </legend>

    <div v-show="!mergeConfig.collapsed" v-for="(dataItem, idx) in schema.value" :key="dataItem.__dataSchema.__id" class="list-item">
      <div class="list-item-label">
        <label class="title">{{dataItem.__dataSchema.ui.label}} {{idx + 1}}</label>
        <van-icon v-if="!mergeConfig.disableDel" name="delete" @click="delItem(idx)" class="icon"></van-icon> 
      </div>

      <!-- array item 是 正常的 object 类型 -->
      <template v-if="isNormalObjSchema(dataItem.__dataSchema)">
        <ncform-object :schema="dataItem.__dataSchema" :form-data="formData" :idx-chain="(idxChain ? idxChain + ',' : '') + idx" :config="dataItem.__dataSchema.ui.widgetConfig" :show-legend="false">

          <template v-for="(fieldSchema, fieldName) in (dataItem.__dataSchema.properties || {__notObjItem: dataItem.__dataSchema})" :slot="fieldName"><!-- 注意：__notObjItem 这个Key为与form-item约定好的值，其它名字不生效 -->
            <slot :name="fieldName" :schema="fieldSchema" :idx="idx"></slot>
          </template>

        </ncform-object>
      </template>

      <!-- array item 是 非正常的 object 类型 以及 其它类型 -->
      <div v-else class="normal-item">
        <slot name="__notObjItem" :schema="dataItem.__dataSchema" :idx="idx"></slot> <!-- 注意：__notObjItem 和 __dataSchema 都是约定好的值，其它名字不生效 -->
      </div>

    </div>

    <div v-show="!mergeConfig.collapsed" class="btn-group" v-if="!mergeConfig.disableAdd || !mergeConfig.disableDel">
      <van-button @click="addItem()" plain type="primary" class="btn">
        <van-icon name="add-o"></van-icon>增加
      </van-button>
      <van-button @click="delAllItems()" v-if="schema.value.length>0" type="default" class="btn">
        <van-icon name=delete></van-icon>删除全部 
      </van-button>
    </div>

  </div>

</template>

<style lang="stylus">
  .__array-form-item 
    &.space
      padding 15px 0 10px
    & > legend 
      border-left: 6px solid #878D99
      padding: 6px
      background-color: #d8dce5
      color: #5a5e66
      font-size: 14px
      margin-bottom: 0px
      border-radius: 4px 4px 0 0
      position relative
      .arrow
        display inline-block
        width 20px
        height 20px
        position absolute
        right 6px
        bottom 5px
        &.pull-up
          background url('./imgs/pullup.png')  center center no-repeat
        &.pull-down
          background url('./imgs/pulldown.png')  center center no-repeat  
    .list-item 
      border: 1px solid #d8dce5
      margin: 0px 0px 8px
      padding 8px
      .list-item-label 
        border-bottom 1px solid rgb(147,153,159)
        padding-bottom 8px
        margin 8px 0
        .title 
          display inline-block
          margin-top 2px
          font-weight 600
        .icon
          float right
          font-size 20px
    .normal-item 
      padding: 4px 8px 8px 8px
    .btn-group
      text-align right
      margin-top 15px
      .btn
        height 35px
        line-height 35px
        &:first-child
          margin-right 10px
        .van-icon
          margin-right 5px
          vertical-align middle
</style>

<script>

  import ncformCommon from '@ncform/ncform-common';
  const layoutArrayMixin = ncformCommon.mixins.vue.layoutArrayMixin;
  //console.log(ncformCommon.mixins.vue.controlMixin);
  export default {
    mixins: [layoutArrayMixin],
    data(){
      return {
      }
    }
  }
</script>

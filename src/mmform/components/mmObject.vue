<template>
  <div class="__object-form-item">
    <legend v-if="schema.ui.legend && showLegend && schema.ui.showLegend" @click="collapse()">
      {{schema.ui.legend}}
      <i class="arrow" :class="{'pull-up': !mergeConfig.collapsed, 'pull-down': mergeConfig.collapsed}"></i>
    </legend>

    <div v-show="!mergeConfig.collapsed" class="obj-wrapper" style="width: 100%">

      <div v-for="(fieldSchema, field) in schema.properties"
          :key="field"
          :style="{display: _analyzeVal(fieldSchema.ui.hidden) ? 'none' : ''}">

        <template>
            <label v-if="!isNormalObjSchema(fieldSchema) && !fieldSchema.ui.noLabelSpace" :style="{'visibility': fieldSchema.ui.showLabel ? 'visible' : 'hidden'}">
              <!-- 必填标识 -->
              <i v-if="_analyzeVal(fieldSchema.rules.required) === true || (typeof fieldSchema.rules.required === 'object' && _analyzeVal(fieldSchema.rules.required.value) === true)" class="text-danger">*</i>

              {{fieldSchema.ui.label}}
            </label>

            <slot :name="field"></slot>

            <!-- 说明信息 -->
            <small v-if="fieldSchema.ui.description">
                {{fieldSchema.ui.description}}
            </small>

        </template>

      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.__object-form-item 
  width 100%
  &.space
    padding 15px 0 10px
  & > legend
    width inherit 
    border-left: 6px solid #878D99
    padding: 6px
    background-color: #d8dce5
    color: #5a5e66
    font-size: 14px
    margin-bottom: 0
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
  .obj-wrapper
    border 1px solid #d8dce5
    border-top none
    padding 8px
</style>
<script>
import ncformCommon from '@ncform/ncform-common';

const ncformUtils = ncformCommon.ncformUtils;
const layoutObjectMixin = ncformCommon.mixins.vue.layoutObjectMixin;

export default {
  props: {
    showLegend: {
      type: Boolean,
      default: true
    }
  },
  mixins: [layoutObjectMixin]
};
</script>

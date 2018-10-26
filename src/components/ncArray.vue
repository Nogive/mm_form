<template>
  <div class="input-box">
    <ncform :form-schema="formSchema" form-name="mm-form" v-model="formSchema.value"></ncform>
    <van-button size="small" @click="submit()">Submit</van-button>
  </div>
</template>
<script>
import Vue from "vue";
import vueNcform from "@ncform/ncform";
import mmInput from "@/components/controls/mmInput";
import mmNumber from "@/components/controls/mmNumber";
import mmTextarea from "@/components/controls/mmTextarea";
import mmDatePicker from "@/components/controls/mmDatePicker";
import mmSelect from "@/components/controls/mmSelect";
import mmArea from "@/components/controls/mmArea";
import mmPhoto from "@/components/controls/mmPhoto";
import mmLocation from "@/components/controls/mmLocation";
import mmObject from "@/components/controls/mmObject";
import mmArray from "@/components/controls/mmArray";
Vue.use(vueNcform, { 
  extComponents: {  
    mmInput,
    mmNumber,
    mmTextarea,
    mmDatePicker,
    mmSelect,
    mmArea,
    mmPhoto,
    mmObject,
    mmLocation,
    mmArray
  } 
});

import {radioRule} from "@/components/rules"
Vue.use(vueNcform, { extRules: [{myCustom:radioRule}] });
import areaList from "./data/area"

const userSchema={
  type: "array",
  items: {
    type: "object",
    properties:{
      name: {
        type: 'string',
        ui: {
          label:'Input 输入框',
          widget: 'mm-input',
          placeholder:'请输入姓名'
        }
      },
      count:{
        type:'number',
        ui:{
          label:'input-number 计数',
          widget:'mm-number'
        }
      },
      ok:{
        type:'boolean',
        ui:{
          label:'radio 是否',
          widget:'mm-radio'
        }
      },
      pullselect:{
        type:'string',
        value:'2',
        ui:{
          label:'select 下拉框选择器',
          widget:'mm-pull-select',
          widgetConfig:{
            enumSource:[
              {
                value:1,
                label:'选项1'
              },
              {
                value:2,
                label:'选项2'
              },
              {
                value:3,
                label:'选项3'
              },
            ]
          }
        }
      }
    },
    ui:{
      label:'南区标准'
    }
  },
  ui: {
    showLegend:true,
    label:'array 子表',
    legend:'SKU配置表',
    widget: 'mm-array',
    widgetConfig: {
      collapsed: false
    }
  }
};
const objectSchema={
  type: "object",
  properties:{
    name: {
      type: 'string',
      ui: {
        label:'Input 输入框',
        widget: 'mm-input',
        placeholder:'请输入姓名'
      }
    },
    count:{
      type:'number',
      ui:{
        label:'input-number 计数',
        widget:'mm-number'
      }
    },
    ok:{
      type:'boolean',
      ui:{
        label:'radio 是否',
        widget:'mm-radio'
      }
    },
    pullselect:{
      type:'string',
      value:'2',
      ui:{
        label:'select 下拉框选择器',
        widget:'mm-select',
        widgetConfig:{
          enumSource:[
            {
              value:1,
              label:'选项1'
            },
            {
              value:2,
              label:'选项2'
            },
            {
              value:3,
              label:'选项3'
            },
          ]
        }
      }
    }
  },
  ui: {
    showLegend:true,
    label:'object 对象',
    legend:'这是object 标题',
    widget: 'mm-object',
    widgetConfig: {
      collapsed: false,
    }
  }
};

export default {
  data () {
    return {
      formSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            ui: {
              label:'Input 姓名',
              readonly:false,
              placeholder:'请输入姓名',
              widget: 'mm-input',
              widgetConfig:{
                type:'tel'
              }
            },
            rules:{
              required:{
                value:true,
                errMsg:'必填'
              }
            }
          },
          count:{
            type:'number',
            ui:{
              label:'input-number 计数',
              readonly:false,
              widget:'mm-number',
              widgetConfig:{
                step:0.2,
                min:0
              }
            },
            rules:{
              required:true,
              minimum:{
                value:1,
                errMsg:'值必须大于0'
              },
            }
          },
          note:{
            type:'string',
            ui:{
              label:'textarea 多行文本',
              readonly:false,
              placeholder:'在这里输入备注或留言',
              widget:'mm-textarea',
              widgetConfig:{
                rows:1,
                autosize:true
              }
            },
            rules:{
              required:{
                value:true,
                errMsg:'必填'
              }
            }
          },
          ok:{
            type:'boolean',
            value:true,
            ui:{
              label:'radio 是否',
              readonly:false,
              widget:'mm-radio',
              widgetConfig:{
                size:'30px'
              }
            },
            rules:{
              required:true,
            }
          },
          date:{
            type:'string',
            ui:{
              label:'dataPicker 日期选择器',
              readonly:false,
              widget:'mm-date-picker',
              widgetConfig:{
                type:'date',
              }
            },
            rules:{
              required:{
                value:true,
                errMsg:'必填'
              }
            }
          },
          select:{
            type:'array',
            value:3,
            ui:{
              label:'select 单选 多选下拉框选择器',
              readonly:false,
              widget:'mm-select',
              widgetConfig:{
                multiple:true,
                filterable:true,
                filterLocal:true,
                enumSource:[
                  {
                    value:1,
                    label:'项目1'
                  },
                  {
                    value:2,
                    label:'项目2'
                  },
                  {
                    value:3,
                    label:'项目3'
                  },
                  {
                    value:4,
                    label:'项目4'
                  },
                  {
                    value:5,
                    label:'项目5'
                  }
                ],
                itemValueField: "key",//返回数据里的 value的值对应本地的value
                itemLabelField: "value",////返回数据里的 key的值对应本地的label
                enumSourceRemote: {
                  remoteUrl: "http://rap2api.taobao.org/app/mock/105585/options",//远程请求的地址
                  paramName: "keyword",//过滤参数 key
                  resField: "options",//返回的数据里的字段
                  otherParams:{a:2},
                  selectFirstitem: false//是否选中第一项
                }
              }
            }
          },
          area: {
            type: 'string',
            value:'120000',
            ui: {
              label:'area 选择省市区',
              readonly:true,
              widget: 'mm-area',
              widgetConfig:{
                areaList:areaList,
                columns:2,
                clearable:true
              }
            }
          },
          array:userSchema,
          object:objectSchema
        }
      }
    }
  },
  methods: {
    submit () {
      this.$ncformValidate('mm-form').then(data => {
        if (data.result) {
          console.log(this.$data.formSchema.value)
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.input-box
  width 100%
  padding 10px
  .van-button
    margin-top 20px
</style>


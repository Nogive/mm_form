<template>
  <div class="input-box">
    <ncform :form-schema="formSchema" form-name="your-form-name" v-model="formSchema.value"></ncform>
    <van-button size="small" @click="submit()">Submit</van-button>
  </div>
</template>
<script>
import Vue from "vue";
import vueNcform from "@ncform/ncform";
import mmInput from "@/components/controls/mmInput";
import mmNumber from "@/components/controls/mmNumber";
import mmTextarea from "@/components/controls/mmTextarea";
import mmRadio from "@/components/controls/mmRadio";
import mmCheckbox from "@/components/controls/mmCheckbox";
import mmSelect from "@/components/controls/mmSelect";
import mmDatePicker from "@/components/controls/mmDatePicker";
import mmTimePicker from "@/components/controls/mmTimePicker";
import mmPullSelect from "@/components/controls/mmPullSelect";
import mmMulSelect from "@/components/controls/mmMulSelect";
import mmPhoto from "@/components/controls/mmPhoto";
import mmLocation from "@/components/controls/mmLocation";
import mmObject from "@/components/controls/mmObject";

Vue.use(vueNcform, { 
  extComponents: {  
    mmInput,
    mmNumber,
    mmTextarea,
    mmRadio,
    mmCheckbox,
    mmSelect,
    mmDatePicker,
    mmTimePicker,
    mmPullSelect,
    mmMulSelect,
    mmPhoto,
    mmObject,
    mmLocation
  } 
});

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
    label:'object',
    legend:'SKU配置表',
    widget: 'mm-object',
    widgetConfig: {
      collapsed: false
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
              label:'Input 输入框',
              widget: 'mm-input',
              placeholder:'请输入姓名'
            }
          },
          count:{
            type:'number',
            ui:{
              label:'input-number 计数',
              widget:'mm-number',
              widgetConfig:{
                step:0.2,
                min:0
              }
            }
          },
          note:{
            type:'string',
            ui:{
              label:'textarea 多行文本',
              widget:'mm-textarea',
              placeholder:'在这里输入备注或留言'
            }
          },
          ok:{
            type:'boolean',
            ui:{
              label:'radio 是否',
              widget:'mm-radio'
            }
          },
          date:{
            type:'number',
            ui:{
              label:'dataPicker 日期选择器',
              widget:'mm-date-picker',
              widgetConfig:{
                type:'year-month',
              }
            }
          },
          time:{
            type:'string',
            ui:{
              label:'timePicker 时间选择器',
              widget:'mm-time-picker',
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
          },
          mulselect:{
            type:'array',
            value:[1,3],
            ui:{
              label:'select 多选下拉框选择器',
              widget:'mm-mul-select',
              widgetConfig:{
                enumSource:[
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
                  }
                ]
              }
            }
          },
          photo:{
            type:'object',
            value:[
              {
                src:'http://xfield.oss-cn-hangzhou.aliyuncs.com/100001@1533283255000@E26CA3E0-F4F5-42DE-9E6C-9F4D564E0D65.jpg'
              },
              {
                src:'https://avatars3.githubusercontent.com/u/24405319?s=40&v=4'
              },
              {
                src:'http://xfield.oss-cn-hangzhou.aliyuncs.com/100001@1533283255000@E26CA3E0-F4F5-42DE-9E6C-9F4D564E0D65.jpg'
              }
            ],
            ui:{
              label:'photo 拍照',
              widget:'mm-photo',
            }
          },
          location:{
            type:'Object',
            ui:{
              label:'定位',
              widget:'mm-location'
            }
          },
          sku:userSchema
        }
      }
    }
  },
  methods: {
    submit () {
      this.$ncformValidate('your-form-name').then(data => {
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
</style>


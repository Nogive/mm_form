<template>
  <div class="input-box">
    <ncform :form-schema="formSchema" form-name="your-form-name" v-model="formSchema.value"></ncform>
    <van-button size="small" @click="submit()">Submit</van-button>
  </div>
</template>
<script>
import "@/mmform/index";
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
              widget:'mm-number'
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
          check:{
            type:'array',
            ui:{
              label:'checkbox 多选',
              hidden:'dx:{{$root.ok}}',
              widget:'mm-checkbox',
              widgetConfig:{
                enumSource:[
                  {
                    value:1,
                    label:'red'
                  },
                  {
                    value:2,
                    label:'green'
                  },
                  {
                    value:3,
                    label:'blue'
                  },
                ]
              }
            }
          },
          select:{
            type:'array',
            ui:{
              label:'select 单选',
              widget:'mm-select',
              widgetConfig:{
                enumSource:[
                  {
                    value:1,
                    label:'单选1'
                  },
                  {
                    value:2,
                    label:'单选2'
                  },
                  {
                    value:3,
                    label:'单选3'
                  },
                ]
              }
            }
          },
          date:{
            type:'number',
            ui:{
              label:'dataPicker 日期选择器',
              widget:'mm-date-picker',
              widgetConfig:{
                type:'date',
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
            value:[1,3,4],
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


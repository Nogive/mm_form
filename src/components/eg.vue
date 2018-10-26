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
          }
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


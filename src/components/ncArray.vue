<template>
  <div class="input-box">
    <ncform v-if="!isSchemaChanging" :form-schema="formSchema" form-name="mm-form" v-model="formSchema.value"></ncform>
    <van-button size="small" @click="submit()">Submit</van-button>
    <van-button size="small" @click="setValue()">set value to schema</van-button>
  </div>
</template>
<script>
import "@/mmform/index";

var data={
  name:'cd',
  note:'啦啦啦',
  ok:false,
  count:3,
  date:1540778921000,
  area:'120000',
  select:3,
  array:[
    {
      count:2,
      name:'ccd',
      ok:true,
      pullselect:2
    }
  ],
  object:{
    count:4,
    name:'cccd',
    ok:false,
    pullselect:2
  }
}

const userSchema={
  type: 'array',
  layoutType:'array',
  items: {
    type: 'object',
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
  type: 'object',
  layoutType:'object',
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
    },
    array:userSchema
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
          array:userSchema,
          object:objectSchema
        }
      },
      isSchemaChanging:false
    }
  },
  methods: {
    submit () {
      this.$ncformValidate('mm-form').then(data => {
        if (data.result) {
          console.log(this.$data.formSchema.value)
        }
      })
    },
    setValue(){//设置值
      this.formSchema.value=data;
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


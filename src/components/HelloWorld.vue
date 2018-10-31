<template>
  <div class="input-box">
    <ncform v-if="!isSchemaChanging" :form-schema="formSchema" form-name="formSchema" v-model="formSchema.value"></ncform>
    <van-button size="small" @click="submit()">Submit</van-button>
    <van-button size="small" @click="setValue()">setValue</van-button>
    <van-button size="small" @click="setReadonly()">setReadonly</van-button>
  </div>
</template>
<script>
import "@/mmform/index";

const formSchema={
  type: 'object',
  properties: {
    photo:{
      type:'array',
      // value:[
      //   {
      //     src:'http://xfield.oss-cn-hangzhou.aliyuncs.com/100001@1533283255000@E26CA3E0-F4F5-42DE-9E6C-9F4D564E0D65.jpg'
      //   },
      //   {
      //     src:'https://avatars3.githubusercontent.com/u/24405319?s=40&v=4'
      //   },
      //   {
      //     src:'http://xfield.oss-cn-hangzhou.aliyuncs.com/100001@1533283255000@E26CA3E0-F4F5-42DE-9E6C-9F4D564E0D65.jpg'
      //   }
      // ],
      ui:{
        label:'photo 拍照',
        readonly:false,
        widget:'mm-photo',
      },
      rules:{
        required:{
          value:true,
          errMsg:'必填'
        }
      }
    },
    location:{
      type:'Object',
      ui:{
        label:'定位',
        readonly:false,
        widget:'mm-location',
        widgetConfig:{
          drag:true
        }
      },
      rules:{
        required:{
          value:true,
          errMsg:'必填'
        }
      }
    }
  }
};

var data={
  
};
export default {
  data () {
    return {
      isSchemaChanging:false,
      formSchema: formSchema
    }
  },
  methods: {
    submit () {
      this.$ncformValidate('formSchema').then(data => {
        if (data.result) {
          console.log(this.$data.formSchema.value);
          /*
          let params={
            systemSchemaId:1,
            systemSchemaVersion:1,
            systemCreatorUserId:1,
            formData:this.$data.formSchema.value
          };
          console.log(params)
          */
        }
      })
    },
    setReadonly(){
      this.isSchemaChanging=true;
      let schema=this.formSchema.properties;
      this.$nextTick(() => {
        this.recursiveReadOnly(schema,true);
        this.isSchemaChanging=false;
      });
    },
    setValue(){
      this.formSchema.value=data;
    }
  }
}
</script>
<style scoped lang="stylus">
.input-box
  width 100%
  padding 10px
</style>


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
    },
    name:{ 
      type:'Object',
      value:{
        id:1,
        name:'ceshi'
      },
      ui:{
        label:'售点名称',
        readonly:true,
        widget:'mm-foreign-object',
        widgetConfig:{
          itemLabelField:'value',
          remoteUrl: 'http://rap2api.taobao.org/app/mock/105585/options',//远程请求的地址
          paramName: 'keyword',
          resField: 'options',
          otherParams:{id:'dx:{{$root.name.id}}'},
          withAuthorization:true,
        }
      }
    }
  }
};

var data={
  name:{
    id:2,
    name:'ceshi2'
  }
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


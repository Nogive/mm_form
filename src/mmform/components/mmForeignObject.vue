<template>
  <div class="foreign">
    <van-cell-group v-show="!hidden">
      <van-field 
        v-model="name" 
        type="text"
        :readonly="readonly"/>
    </van-cell-group>
  </div>
</template>
<script>
import axios from "axios";
import ncformCommon from '@ncform/ncform-common'
import _get from "lodash-es/get";
import _cloneDeep from 'lodash-es/cloneDeep';
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],
  data () {
    return {
      name:'',
      tempVal:{}
    }
  },
  watch:{
    otherParams(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.remoteMethod();
      }
    },
    tempVal:{
        handler(){
            this.name=this.tempVal.name;
            this.modelVal=this.tempVal;
        },
        deep:true
    },
  },
  computed:{
    otherParams() {
      let otherParams = _cloneDeep(_get(this.mergeConfig, 'otherParams'), {});
      for (let key in otherParams) {
        otherParams[key] = this._analyzeVal(otherParams[key]);
      }
      return otherParams;
    }
  },
  methods: {
     _processModelVal (modelVal) {
      return modelVal;
    },
    remoteMethod(query){
        let _this=this;
        if(!_get(this.mergeConfig, 'remoteUrl')){ return; };
      const options = {
        url: this.mergeConfig.remoteUrl,
        params: JSON.parse(JSON.stringify(this.otherParams)) 
      };
      //设置请求头
      if(this.mergeConfig.withAuthorization){
        options.headers={
          'Authorization': JSON.parse(window.localStorage.getItem('token')),
        }
      }
      options.params[
        this.mergeConfig.paramName
      ] = query;
      axios(options).then(res => {
        let tempArr = this.mergeConfig.resField ? _get(res.data, this.mergeConfig.resField) : res.data;
        console.log('data:',tempArr);
        let temp=tempArr[0];
        _this.tempVal={
            id:_this.value.id,
            name:temp[_this.mergeConfig.itemLabelField]
        };
      },err=>{
          console.log('error:',err);
      });
    }
  }
}
</script>
<style scoped lang="stylus">
.foreign
  padding 10px 0
</style>

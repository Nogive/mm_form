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
    }
  },
  created(){
    if(this.value){
      this.name=this.value.name;
    }
  },
  watch:{
    otherParams(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.remoteMethod();
      }
    }
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
        _this.name=_get(tempArr,_this.mergeConfig.itemLabelField);
        _this.modelVal=tempArr;
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
  .van-field
    background-color #d8dce5
</style>

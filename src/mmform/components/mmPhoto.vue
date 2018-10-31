<template>
  <div class="photo space">
    <van-row gutter="5">
      <van-col class="img-box" span="8" v-for="(item,index) in photoLists" :key="index">
        <img class="img" :src="item.src" alt="" @click="enlargePhoto(item,index)">
      </van-col>
      <van-col class="img-box" span="8" v-show="!readonly&&photoLists.length<maxLen">
        <div class="photo-img">
          <img class="img" src="./imgs/photo.png" alt="" @click="takePhoto">
        </div>
      </van-col>
    </van-row>
    <van-popup v-model="showBig" class="b-box">
      <van-swipe :initialSwipe="currentIndex" @change="onChange" id="photoHeight">
        <van-swipe-item v-for="(item,index) in photoLists" :key="index" :class="{'currentEl':index==currentIndex}">
          <img class="img" :src="item.src" alt="" @click="showBig=false">
          <van-icon class="icon" name="delete" @click="onDetele(item,index)" />
        </van-swipe-item>
      </van-swipe>
    </van-popup>
  </div>
</template>
<script>
import ncformCommon from '@ncform/ncform-common'
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],
  data () {
    return {
      maxLen:9,
      showBig:false,
      currentItem:{},
      currentIndex:0,
      photoLists:[]
    }
  },
  mounted(){
    this.photoLists=this.value||[];
  },
  watch:{
    photoLists(){
      this.modelVal=this.photoLists;
    }
  },
  methods: {
    // you can handle the modelVal before $emit it (before this.$emit('input'))
    _processModelVal (modelVal) {
      return modelVal 
    },
    enlargePhoto(item,index){
      this.currentIndex=index;
      this.currentItem=item;
      this.showBig=true;
      this.$nextTick(function () {
        let MaxH=document.getElementById('photoHeight').offsetHeight;
        if(this. _getImgHeight()<MaxH){
          this._getCurrentObj().style.marginTop=(MaxH-this. _getImgHeight())/2+'px';
        }
      })
    },
    _getImgHeight(){
      let h=document.getElementsByClassName('currentEl')[0].offsetHeight;
      return h;
    },
    _getCurrentObj(){
      let obj=document.getElementsByClassName('currentEl')[0];
      return obj;
    },
    onDetele(item,index){
      if(index==this.photoLists.length-1){
        this.currentItem=this.photoLists[0];
      }else{
        this.currentItem=this.photoLists[index+1];
      }
      this.photoLists.splice(index,1);
      this.$nextTick(function () {
        let MaxH=document.getElementById('photoHeight').offsetHeight;
        if(this. _getImgHeight()<MaxH){
          this._getCurrentObj().style.marginTop=(MaxH-this. _getImgHeight())/2+'px';
        }else{
          this._getCurrentObj().style.marginTop='0px';
        }
      })
    },
    onChange(index){
      this.currentIndex=index;
      this.currentItem=this.photoLists[index];
      this.$nextTick(function () {
        let MaxH=document.getElementById('photoHeight').offsetHeight;
        if(this. _getImgHeight()<MaxH){
          this._getCurrentObj().style.marginTop=(MaxH-this. _getImgHeight())/2+'px';
        }
      })
    },
    takePhoto(){
      this.photoLists.push({
        uuid:'222',
        src:'@/assets/images/10.jpg'
      });
    }
  }
}
</script>
<style scoped lang="stylus">
.photo
  padding 15px 0 10px
  .img-box
    height 100px
    margin-bottom 5px
    .img
      width 100%
      height 100%
    .photo-img
      width 100%
      height 100%
      text-align center
      padding 0 2.5px
      background-color #e6e6e6
      .img
        width 32px
        height 32px
        margin-top 34px
  .b-box
    width 100%
    background-color transparent
    .van-swipe
      min-height 100%
      overflow hidden
      .van-swipe-item
        position relative
        .icon
          position absolute
          right 10px
          top 10px
          font-size 20px
          color #ffffff
        .img
          width 100%

</style>


<template>
  <div class="location">
    <van-cell-group v-show="!hidden">
      <van-field 
        v-model="address" 
        placeholder="点击右侧定位图标进行定位" 
        type="textarea"
        rows="1"
        autosize
        readonly
        :icon="locationIcon"
        @click-icon="onLocation"
        @click="showMapContent"/>
    </van-cell-group>

    <van-popup v-model="showMap" class="addr-box">
      <div class="addr-text">
        <van-row gutter=5>
          <van-col :span="21" class="search-box">
            <input class="text" type="text" v-model="address" id="address" :readonly="!drag">
            <ul class="tip" v-show="startSearch">
              <li class="tip-item" v-for="(item,index) in tipRes" :key="index" @click.stop.prevent="selectRes(item)">{{item.name}}</li>
            </ul>
          </van-col>
          <van-col :span="3">
            <div class="icon-btns">
              <van-icon v-if="drag" class="icon" name="search" @click="onSearch"></van-icon>
              <van-icon v-else class="icon" name="location" @click="onLocation"></van-icon>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="map-content">
        <div class="drag-map">
          <div id="mapContainer" class="mapmap"></div>
          <van-icon v-if="drag" name="location" class="location-btn" @click.stop="onLocation"></van-icon>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import ncformCommon from '@ncform/ncform-common'
import {onLocationByDing,onLocationByCordova} from "./utils"
import AMap from 'AMap'
import AMapUI from 'AMapUI'
var map;
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],
  data () {
    let _this=this;
    return {
      showMap:false,
      startSearch:false,
      address:'',
      center:[],
      tipRes:[],
      defaultConfig:{
        drag:false,
      }
    }
  },
  mounted(){
    this.address=this.value.address;
    this.center=[this.value.lng,this.value.lat];
    this._initMap();
  },
  watch:{
    center(){
      if(this.center){
        this.modelVal={
          lng:this.center[0],
          lat:this.center[1],
          address:this.address
        };
      }
    }
  },
  computed:{
    locationIcon:function(){
      if(this.readonly){
        return "";
      }else{
        return "location"
      }
    },
    drag(){
      return this._analyzeVal(this.config.drag);
    }
  },
  methods: {
     _processModelVal (modelVal) {
      return modelVal;
    },
    _initMap(){
      let _this=this;
      map = new AMap.Map('mapContainer', {
        center: this.center,
        zoom: 15,
        dragEnable:this.drag
      });
      //定位插件
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          showButton:false,//是否显示定位按钮
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
          zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        _this.geolocation=geolocation;
      });
    },
    onLocation(){
      let _this=this;
      if(window.dd &&(window.dd.android||window.dd.ios)){
        onLocationByDing().then(res=>{
          _this.address=res.address;
          _this.center=[res.longitude,res.latitude];
        },err=>{
          console.log(err);
        })
      } else if(window.device){
        onLocationByCordova().then(res=>{
          _this.address=res.address;
          _this.center=[res.longitude,res.latitude];
        },err=>{
          console.log(err);
        })
      }else{
        this.onLocationByGaode();
      }
    },
    onLocationByGaode(){
      var _this=this;
      this.geolocation.getCurrentPosition(function(status,result){
        if(status=='complete'){
          _this.address=result.formattedAddress;
          _this.center=[result.position.lng,result.position.lat];
        }else{
          _this.$toast('定位失败，请稍后再试~')
        }
      });
    },
    onDrag(){
      let _this=this;
      AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
        var positionPicker = new PositionPicker({
          mode: 'dragMap',//拖拽地图模式
          map: map
        });
        positionPicker.on('success', function(positionResult) {
          _this.address=positionResult.address;
          _this.center=[positionResult.position.lng,positionResult.position.lat];
        });
        positionPicker.on('fail', function(positionResult) {
          console.log('拖拽出现问题，请保证网络环境，稍后重试~');
        });
        positionPicker.start();
      });
    },
    showMapContent(){
      if(this.address&&this.address!=""){
        this.showMap=true;
        this.$nextTick(()=>{
          this._initMap();
          this.onDrag();
        })
      }
    },
    onSearch(){
      let _this=this;
      let key=this.address;
       AMap.plugin('AMap.PlaceSearch', function(){
        var autoOptions = {
          city: '全国'
        }
        var placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(key, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if(result.info=="OK"){
            _this.tipRes=result.poiList.pois;
            _this.startSearch=true;
          }else{
            Toast('查询无结果');
          }
        })
      })
    },
    selectRes(item){
      this.address=item.name;
      this.center=[item.location.lng,item.location.lat];
      this.startSearch=false;
      this._initMap();
      this.onDrag();
    }
  }
}
</script>
<style scoped lang="stylus">
.location
  padding 10px 0
  .addr-box
    width 100%
    padding 10px 0
    .addr-text
      padding-left 8px
      .search-box
        position relative
        .text
          width 100%
          height 35px
          border 1px solid rgba(7,17,27,.3)
          border-radius 3px
          padding 0 8px
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          font-size 12px
        .tip
          width calc(100% - 5px)
          min-height 310px
          overflow-y auto
          position absolute
          z-index 2
          border 1px solid rgba(7,17,27,.3)
          background #ffffff
          .tip-item
            border-bottom 1px solid rgba(7,17,27,.3)
            padding 6px 8px
            font-size 12px
            &.tip-item:last-child
              border-bottom none
      .icon-btns
        width 100%
        height 35px
        position relative
        .icon
          font-size 24px
          position absolute
          right 8px
          top 5px
    .map-content
      margin-top 10px
      height 300px
      .map-box,.drag-map
        width 100%
        height 100%
      .map-box
        .m-img
          width 100%
          height 100%
      .drag-map
        position relative
        .mapmap
          width 100%
          height 100%
        .location-btn
          position absolute
          font-size 30px
          color rgb(0,160,220)
          right 10px
          bottom 10px  
</style>

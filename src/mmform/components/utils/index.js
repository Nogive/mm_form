/**
 * func for Dingding
 */

/**
 * 拍照上传
 * @param watermark 水印信息
 * @example watermark:{
 *      time: "08:35",
        dateWeather: "2016.05.06 周六·晴转多云 16℃",
        username: "王晓",
        address: "西湖·杭州"
 * }
 * @return getFullUrl() //x.waiqin.co/ding/index.html?corpId=ding7bc2e52b22faf4b2
 */
export function takePhotoByDing(watermark) {
  return new Promise((resolve, reject) => {
    dd.biz.util.uploadImageFromCamera({
      compression: true, //(是否压缩，默认为true压缩)
      quality: 50, // 图片压缩质量,
      resize: 50, // 图片缩放率
      stickers: watermark,
      onSuccess: function(result) {
        resolve(result);
      },
      onFail: function(err) {
        reject(err);
      }
    });
  });
}
/**
 * 连续获取一组位置，返回精度最低的
 * @return result {}
 * @example result:{
      longitude : Number,  经度
      latitude : Number,  纬度
      accuracy : Number, 实际定位经度半径
      address : String, 格式化地址
      province : String, 省
      city : String, 市
      district : String, 区
      road : String, 街道
      netType : String, 当前设备类型
      operatorType : String, 当前设备使用的移动运营商
      errorMessage : String, 对错误码的描述
      errorCode : Number, 错误码  
      isWifiEnabled : Boolean, android wifi是否开启
      isGpsEnabled : Boolean, android gps是否开启
      isFromMock : Boolean, 
      provider : wifi|lbs|gps,
      accuracy : Number,
      isMobileEnabled : Boolean,
      sceneId:string 定位场景ID
    }
 */
export function onLocationByDing() {
  var sceneId = "ding";
  var results = [];
  return new Promise((resolve, reject) => {
    dd.device.geolocation.start({
      targetAccuracy: 100, // 期望精确度
      iOSDistanceFilter: 100, // 变更感知精度(iOS端参数)
      useCache: true, // 是否使用缓存(Android端参数)
      withReGeocode: true, // 是否返回逆地理信息,默认否
      callBackInterval: 200, //回传时间间隔，ms
      sceneId: sceneId, // 定位场景id,
      onSuccess: function(result) {
        if (results.length < 5) {
          results.push(result);
        } else {
          stopDingLocate(result.sceneId);
          results.sort((a, b) => {
            return a - b;
          });
          resolve(results[0]);
        }
      },
      onFail: function(err) {
        reject(err);
      }
    });
  });
}
function stopDingLocate(sceneId) {
  dd.device.geolocation.stop({
    sceneId: sceneId, // 需要停止定位场景id
    onSuccess: function(result) {
      //console.log("stop locate:", result); // 停止的定位场景id，当该场景没有开始定位时，返回null
    },
    onFail: function(err) {}
  });
}
/**---------------------------------------------Ding end-------------------------------------------- */

/**
 * func for cordova
 */

/**
 * 拍照上传
 * @param watermark 水印信息
 * @example watermark:["2016.05.06 周六·晴转多云 16℃"]
 * @return getFullUrl() //x.waiqin.co/ding/index.html?corpId=ding7bc2e52b22faf4b2
 */
export function takePhotoByCordova(watermark) {
  var options = {
    quality: 50,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    encodingType: navigator.camera.EncodingType.JPEG,
    mediaType: navigator.camera.MediaType.PICTURE,
    allowEdit: false, //不允许编辑
    saveToPhotoAlbum: false, //不允许保存到相册
    correctOrientation: true // Corrects Android orientation quirks
  };
  if (watermark) {
    options.waterMarker = watermark;
  }
  return new Promise((resolve, reject) => {
    navigator.camera.getPicture(
      imgUri => {
        resolve(imgUri);
      },
      errMsg => {
        reject(errMsg);
      },
      options
    );
  });
}
/**
 * 连续获取一组位置，返回精度最低的
 * @param interval 间隔多少时间返回一组数据 ms 默认200
 * @return result {}
 * @example result:{
      longitude : Number,  经度
      latitude : Number,  纬度
      accuracy : Number, 实际定位经度半径
      address : String, 格式化地址
      province : String, 省
      city : String, 市
      district : String, 区
      road : String, 街道
      netType : String, 当前设备类型
      operatorType : String, 当前设备使用的移动运营商
      errorMessage : String, 对错误码的描述
      errorCode : Number, 错误码  
      isWifiEnabled : Boolean, android wifi是否开启
      isGpsEnabled : Boolean, android gps是否开启
      isFromMock : Boolean, 
      provider : wifi|lbs|gps,
      accuracy : Number,
      isMobileEnabled : Boolean,
      sceneId:string 定位场景ID
    }
 */
export function onLocationByCordova(interval) {
  var results = [];
  var time = interval ? interval : 200;
  return new Promise((resolve, reject) => {
    cordova.exec(
      data => {
        if (results.length < 5) {
          results.push(data);
        } else {
          stopCordovaLocate();
          results.sort((a, b) => {
            return a - b;
          });
          resolve(results[0]);
        }
      },
      err => {
        reject(err);
      },
      "Location",
      "start",
      [interval]
    );
  });
}
function stopCordovaLocate(sceneId) {
  cordova.exec(function() {}, function() {}, "Location", "stop", []);
}
/**---------------------------------------------cordova end-------------------------------------------- */

//其他
//生成UUId
export function generateUuid(len, radix) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}

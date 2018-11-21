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
 * 返回期望精度的地理位置信息，若超时 则返回接近期望精度的位置信息
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
//自定义 定位失败错误码
const errCode = {
  default: 0,
  noGps: 1,
  timeout: 2
};
export function onLocationByDing(accuracy) {
  console.log("prepare to location");
  var sceneId = "ding";
  var location;
  return Promise.race([
    new Promise((resolve, reject) => {
      dd.device.geolocation.start({
        targetAccuracy: 100, // 期望精确度
        iOSDistanceFilter: 10, // 变更感知精度(iOS端参数)
        useCache: true, // 是否使用缓存(Android端参数)
        withReGeocode: true, // 是否返回逆地理信息,默认否
        callBackInterval: 200, //回传时间间隔，ms
        sceneId: sceneId, // 定位场景id,
        onSuccess: function(result) {
          console.log("location gotten,", result);
          if (result.resultCode == 4) {
            let e = new Error();
            e.code = errCode.noGps;
            e.message = "定位失败，请检查GPS是否打开，或到空旷的地方重新定位";
            reject(e);
          } else {
            if (result.accuracy <= accuracy) {
              stopDingLocate(result.sceneId);
              resolve(result);
            } else {
              if (!location) {
                location = result;
              }
              if (result.accuracy < location.accuracy) {
                location = result;
              }
            }
          }
        },
        onFail: function(err) {
          let e = new Error();
          e.code = errCode.default;
          e.message = "定位失败，请检查GPS是否打开，或到空旷的地方重新定位";
          e.err = err;
          reject(e);
        }
      });
    }),
    new Promise((resolve, reject) => {
      var timer = null;
      timer = setTimeout(function() {
        if (location) {
          stopDingLocate(sceneId);
          resolve(location);
        } else {
          reject("timeout");
        }
      }, 15000);
    })
  ]);
}
//关闭连续定位
function stopDingLocate(sceneId) {
  dd.device.geolocation.stop({
    sceneId: sceneId, // 需要停止定位场景id
    onSuccess: function(result) {
      //console.log("stop locate:", result); // 停止的定位场景id，当该场景没有开始定位时，返回null
    },
    onFail: function(err) {}
  });
}
//钉钉定位获取地址
export var dLocation = {
  sceneId: "ding",
  location: null,
  onLocation: accuracy => {
    let that = dLocation;
    return Promise.race([that.startLocate(accuracy), that.locateTimeout()]);
  },
  startLocate: accuracy => {
    let that = dLocation;
    return new Promise((resolve, reject) => {
      dd.device.geolocation.start({
        targetAccuracy: 100, // 期望精确度
        iOSDistanceFilter: 10, // 变更感知精度(iOS端参数)
        useCache: true, // 是否使用缓存(Android端参数)
        withReGeocode: true, // 是否返回逆地理信息,默认否
        callBackInterval: 200, //回传时间间隔，ms
        sceneId: that.sceneId, // 定位场景id,
        onSuccess: function(result) {
          console.log("location gotten,", result);
          if (result.resultCode == 4) {
            reject(
              that.error(
                errCode.noGps,
                "定位失败，请检查GPS是否打开，或到空旷的地方重新定位"
              )
            );
          } else {
            if (result.accuracy <= accuracy) {
              stopDingLocate(result.sceneId);
              resolve(result);
            } else {
              if (!that.location) {
                that.location = result;
              }
              if (result.accuracy < that.location.accuracy) {
                that.location = result;
              }
            }
          }
        },
        onFail: function(err) {
          reject(
            that.error(
              errCode.default,
              "定位失败，请检查GPS是否打开，或到空旷的地方重新定位",
              err
            )
          );
        }
      });
    });
  },
  locateTimeout: () => {
    let that = dLocation;
    return new Promise((resolve, reject) => {
      var timer = null;
      timer = setTimeout(function() {
        if (that.location) {
          stopDingLocate(that.sceneId);
          resolve(that.location);
        } else {
          reject(
            that.error(
              errCode.timeout,
              "定位超时,请检查网络或到空旷的位置重试。"
            )
          );
        }
      }, 15000);
    });
  },
  stopLocate: () => {
    let that = dLocation;
    dd.device.geolocation.stop({
      sceneId: that.sceneId,
      onSuccess: function(result) {
        //console.log("stop locate:", result); // 停止的定位场景id，当该场景没有开始定位时，返回null
      },
      onFail: function(err) {}
    });
  },
  error: (code, msg, err) => {
    let e = new Error();
    e.code = code;
    e.message = msg;
    if (err) {
      e.err = err;
    }
    return e;
  }
};
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
function stopCordovaLocate() {
  cordova.exec(function() {}, function() {}, "Location", "stop", []);
}

export var cLocation = {
  location: null,
  onLocation: accuracy => {
    let that = dLocation;
    return Promise.race([that.startLocate(accuracy), that.locateTimeout()]);
  },
  startLocate: accuracy => {
    let that = dLocation;
    return new Promise((resolve, reject) => {
      return new Promise((resolve, reject) => {
        cordova.exec(
          result => {
            if (result.accuracy <= accuracy) {
              stopDingLocate();
              resolve(result);
            } else {
              if (!that.location) {
                that.location = result;
              }
              if (result.accuracy < that.location.accuracy) {
                that.location = result;
              }
            }
          },
          err => {
            reject(
              that.error(
                errCode.default,
                "定位失败，请检查GPS是否打开，或到空旷的地方重新定位",
                err
              )
            );
          },
          "Location",
          "start",
          [200]
        ); //间隔200ms返回一组数据
      });
    });
  },
  locateTimeout: () => {
    let that = dLocation;
    return new Promise((resolve, reject) => {
      var timer = null;
      timer = setTimeout(function() {
        if (that.location) {
          stopDingLocate();
          resolve(that.location);
        } else {
          reject(
            that.error(
              errCode.timeout,
              "定位超时,请检查网络或到空旷的位置重试。"
            )
          );
        }
      }, 15000);
    });
  },
  stopLocate: () => {
    cordova.exec(function() {}, function() {}, "Location", "stop", []);
  },
  error: (code, msg, err) => {
    let e = new Error();
    e.code = code;
    e.message = msg;
    if (err) {
      e.err = err;
    }
    return e;
  }
};
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
